// const sequelize = require("../db/conn");

//1º importar DataTypes Sequelize
const {DataType, DataTypes} = require('sequelize')
//2º Importar arquivo de connect database
const db = require('../db/conn')

//3º Estruturar essa tabela
const User = db.define('User',{
    name:{
        type:DataTypes.STRING,
        allowNull: false,
        require:true
    },
    email:{
        type:DataTypes.STRING,
        allowNull: false,
        require:true
    },
    password:{
        type:DataTypes.STRING,
        allowNull: false,
        require:true
    }
});

module.exports = User