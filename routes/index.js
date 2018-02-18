const app = require('express').Router();
const { Employee } = require('../db');

module.exports = app;


/*Employee.findManagers = function() {
  return Employee.findAll({ where: { id: employee.managerId }})
    .then( (managers) => {
      res.send(managers)
    })
}*/


// app.get('/', (req, res, next) => {
//   Employee.findAll()
//     .then( (employees) => {
//       res.render('employees', { title: 'Employees', employees })
//     })
//     .catch(next);
// });




  var employees;
  var managers;
app.get('/', (req, res, next) => {

  Employee.findAll()
    .then( (_employees) => {
      employees = _employees;
      console.log(employees);
      return employees.forEach(function(employee) {
        // console.log(employee)

      })
    })
    .then()
    return Employee.findAll({ where: { id: this.managerId }})


    .then( (_managers) => {
      managers = _managers;
      res.render('employees', { title: 'Employees', employees, managers })
    })
    .catch(next);
});




/*  var employees;
  var managers;
app.get('/', (req, res, next) => {

  Employee.findAll()
    .then( (_employees) => {
      employees = _employees;
      // console.log(employees[0].get());
      return employees.forEach(function(employee) {
        console.log(employee.managerId)

        if (employee.managerId) {

        }
      })
    })
    .then()
    return Employee.findAll({ where: { id: this.managerId }})


    .then( (_managers) => {
      managers = _managers;
      res.render('employees', { title: 'Employees', employees, managers })
    })
    .catch(next);
});
*/





/*app.get('/', (req, res, next) => {
  Employee.findAll({
    include: [
      { model: Employee, as: 'manages'}
    ]})
    .then( (employees) => {

      res.render('employees', { title: 'Employees', employees })
    })
    .catch(next);
});*/

app.post('/', (req, res, next) => {
  // console.log(req)


  Employee.create(req.body)
    .then( () => {
      res.redirect('/employees')
    })
    .catch(next);
})

app.put('/:id', (req, res, next) => {
  // console.log(req)
  Employee.findById(req.params.id)
    .then( (employee) => {
      Object.assign(employee, req.body);
      return employee.save();
    })
    .then( () => {
      res.redirect('/employees')
    })
    .catch(next)
})

app.delete('/:id', (req, res, next) => {
  Employee.findById(req.params.id)
    .then( (employee) => {
      employee.destroy()
    })
    .then( () => {
      res.redirect('/employees')
    })
    .catch(next)
})

// app.use( (req, res, next) => {
//   Employee.findAll({ where: })
// })
