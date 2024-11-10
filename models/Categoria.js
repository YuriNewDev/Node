// models/Categoria.js
const mongoose = require('mongoose');

const CategoriaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  subtipo: {
    type: String,
    required: true,
  },
  genero: {
    type: String,
    required: true,
  },
  date:{
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('Categoria', CategoriaSchema);
