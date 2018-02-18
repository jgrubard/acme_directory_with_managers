const Sequelize = require('sequelize');
const _conn = new Sequelize(process.env.DATABASE_URL, { logging: false });

module.exports = {
  _conn,
  Sequelize
}
