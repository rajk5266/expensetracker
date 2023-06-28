const Sequelize = require('sequelize')

const sequelize = new Sequelize('expenses', 'root', 'Hannah903@ophio', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;