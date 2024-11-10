const Sequelize = require('sequelize');
const sequelize = new Sequelize('Post', 'ROOT', '1234', {
    host: 'localhost',
    dialect: 'mysql',
  });
  

  module.exports={
Sequelize:Sequelize,
sequelize:sequelize
  }