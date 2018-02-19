const app = require('express').Router();
const { Employee } = require('../db');

module.exports = app;

app.get('/', (req, res, next) => {
  Employee.findAll({
    include: {
      model: Employee,
      as: 'manages'
    }
  })
    .then( (employees) => {
      res.render('employees', { title: 'Employees', employees })
    })
    .catch(next);
});

app.post('/', (req, res, next) => {
  Employee.createFromForm(req.body)
    .then( () => {
      res.redirect('/employees')
    })
    .catch(next);
})

app.put('/:id', (req, res, next) => {
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
});
