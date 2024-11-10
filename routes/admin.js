const express = require('express');
const Categoria = require('../models/Categoria');
const router = express.Router();

// Rota para o painel administrativo (GET)
router.get('/', (req, res) => {
  res.render('admin/index'); // Renderiza a view 'admin/index'
});

// Rota POST para deletar uma categoria (ou game)
router.post('/addcategorias/delete', (req, res) => {
  Categoria.deleteOne({ _id: req.body.id }) // Corrigido para usar req.body.id
    .then(() => {
      req.flash('success_msg', 'Game deletado com sucesso!');
      res.redirect('/admin/addcategorias'); // Redireciona para a lista de categorias após deletar
    })
    .catch((err) => {
      req.flash('error_msg', 'Erro ao deletar a categoria');
      res.redirect('/admin/addcategorias'); // Em caso de erro, redireciona para a mesma página
    });
});

// Rota para a página principal do painel admin
router.get('/', (req, res) => {
  res.render('admin/main'); // Renderiza a view 'admin/main' (verifique o nome correto da view)
});
router.get('/cadastro', (req, res) => {
  res.send('oi'); // Renderiza a view 'admin/index'
});



module.exports = router;
