const Sequelize = require('sequelize');

const sequelize = new Sequelize('restaurant-site', 'root', 'server@Shashank', {
    dialect: 'mysql', host: 'localhost'
});

module.exports = sequelize;