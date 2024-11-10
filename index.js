const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const session = require('express-session');
const flash = require('connect-flash');
const mongoose = require("mongoose");
const routes = require('./routes/admin');
const Categoria = require('./models/Categoria'); // Certifique-se de que o caminho está correto
const { Console } = require('console');
const Post = require('./models/Post')
const app = express();
const port = 3000;

// Configuração da sessão
app.use(session({
  secret: 'cursodenode',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Defina como true em produção
}));

app.use(flash());

// Middleware global para passar mensagens de flash para as views
app.use((req, res, next) => {
  res.locals.err_msg = req.flash('error_msg');
  res.locals.suc_msg = req.flash('success_msg');
  next();
});

// Configurar o middleware para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public/bootstrap')));

// Middleware para processar dados de formulários e JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Configurar o Handlebars como template engine
app.engine('handlebars', exphbs.engine({ defaultLayout: 'home' }));
app.set('view engine', 'handlebars');
app.set('views', './views');

// Conexão com o MongoDB
mongoose.connect("mongodb://localhost:27017/SISTEMANODE")
  .then(() => {
    console.log("conectado ao mongo");
  })
  .catch((err) => {
    console.log("deu erro", err);
  });




// Rota POST para /index
app.get('/index', (req, res) => {
  Categoria.find()
    .then((categorias) => {
      // Passa as categorias convertidas em JSON para a view
      res.render("admin/addcategorias", { categorias: categorias.map(c => c.toJSON()) });
    })
    .catch((err) => {
      req.flash("error_msg", "Erro ao listar categorias");
      res.redirect('/admin');
    });
});



  
  
app.get('/admin/addcategorias', (req, res) => {
  Categoria.find().lean().sort({date:'desc'})  // Busca todas as categorias no banco
    .then((Categoria) => {
      // Renderiza a página com as categorias e exibe mensagens flash se existirem
      res.render('admin/addcategorias', { Categoria });
      
    })
    .catch((err) => {
      console.error('Erro ao listar categorias:', err);
      req.flash('error_msg', 'Erro ao listar categorias');
      res.redirect('/admin/erro');
    });
});



// Rota para adicionar novas categorias
app.post('/admin/addcategorias', (req, res) => {
  const novaCategoria = {
    name: req.body.name,
    subtipo: req.body.subtipo,
    genero: req.body.genero,
  };

  // Cria uma nova instância do modelo Categoria
  const categoria = new Categoria(novaCategoria);

  // Salva no banco de dados
  categoria.save()
    .then(() => {
      // Se a categoria for salva com sucesso, exibe uma mensagem de sucesso e redireciona
      req.flash('success_msg', 'Usuário criado com sucesso');
      console.log('game adicionado aqui tbm')
      res.redirect('/admin/addcategorias'); // Redireciona após salvar
    })
    .catch((err) => {
      req.flash('error_msg', 'Erro ao editar');
      res.redirect('/admin'); // Redireciona em caso de erro
    });
});




app.get('/admin/editcategorias/:id', (req, res) => {
  Categoria.findOne({ _id: req.body.id }).lean()
    .then((categoria) => {
      res.render('admin/editcategorias', { categoria });
      req.flash('success_msg','Usuário adicionado com sucesso')
    })
    
    .catch((err) => {
      req.flash('error_msg', 'Erro ao buscar a categoria');
      res.redirect('/admin');
    });
});

app.get('/admin/addcategorias', (req,res)=>{

  Categoria.findOne({ _id: req.params.id }).lean()
    .then((categoria) => {
      res.render('admin/editcategorias', { categoria });
      req.flash('success_msg','categoria editada com sucesso')
    })
    
    .catch((err) => {
      req.flash('error_msg', 'Erro ao buscar a categoria');
      res.redirect('admin/editcategorias');
    });
});

// Middleware para rotas admin
app.use('/admin', routes);

// Iniciar o servidor na porta especificada
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
