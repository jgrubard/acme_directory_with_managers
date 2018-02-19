const { _conn } = require('./conn.js');
const Employee = require('./Employee.js');

Employee.belongsTo(Employee, { as: 'manager', allowNull: true });
Employee.hasMany(Employee, { as: 'manages', foreignKey: 'managerId' });

const sync = () => {
  return _conn.sync({ force: true })
}

const seed = () => {
  return Promise.all([
    Employee.create({
      email: 'mario@nintendo.com'
    }),
    Employee.create({
      email: 'luigi@nintendo.com'
    }),
    Employee.create({
      email: 'bowser@nintendo.com'
    })
  ])
}

module.exports = {
  sync,
  seed,
  Employee
}
