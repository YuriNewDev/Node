
const sequelize = require('sequelize')
const db = require('./db')

const Post = db.sequelize.define('user', {
    

    email:{
        type:db.Sequelize.STRING,
        allowNull: true,
    },
    Password:{
        type:db.Sequelize.STRING,
        allowNull: true,

    }

})

module.exports = Post