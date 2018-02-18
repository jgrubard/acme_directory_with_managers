const { _conn } = require('./conn.js');
const Employee = require('./Employee.js');

Employee.belongsTo(Employee, { as: 'manager' });
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

// Employee.employeeCount = () => {
//   console.log(Employee.all())
// }

// Employee.findManagers = function() {
//   return Employee.findAll({
//     where: { id: this.managerId }
//   })
//   .then( (managers) => {
//     return managers;
//   })
//   .catch((err) => {
//     console.error(err);
//   })
  // console.log(this);
  // this.findAll()
  // .then((user) => {
    // console.log(user)
  // })
// }

module.exports = {
  sync,
  seed,
  Employee
}
