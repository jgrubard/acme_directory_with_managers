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

// Employee.prototype.getManaged = function(arr) {
//   var nameArr = []
//   arr.forEach(function(person){
//     console.log(person.email)
//     nameArr.push(person.email)
//   })
//   return nameArr;
// }



module.exports = {
  sync,
  seed,
  Employee
}
