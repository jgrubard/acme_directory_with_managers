const express = require('express');
const app = express();
const db = require('./db');
const { Employee } = db;
const path = require('path');
const nunjucks = require('nunjucks');
nunjucks.configure({ noCache: true });


app.set('view engine', 'html');
app.engine('html', nunjucks.render);

app.use(require('body-parser').urlencoded());
app.use(require('method-override')('_method'));

app.use('/public', express.static(path.join(__dirname, 'node_modules')));

app.use( (req, res, next) => {
  Employee.findAll({
    include: [{
      model: Employee,
      as: 'manager'
    }, {
      model: Employee,
      as: 'manages'
    }]
  })
  .then( (employees) => {

    // console.log(employees[0].manages)


    let managerArr = [];
    employees.forEach(function(employee) {
      // console.log(employee.manages)
      if (employee.manager) {
        if (managerArr.indexOf(employee.manager.email) === -1) {
          managerArr.push(employee.manager.email)
        }
      }
      // console.log(employee.manages)
      var underlings = employee.manages.map(function(e) {
        console.log(e.email)
        return e.email;
      })
      // console.log(underlings)

      res.locals.underlings = underlings;

      // console.log(res.locals.underlings);

    })
          // console.log(res.locals.underlings);
    res.locals.employeeCount = employees.length;
    res.locals.managerCount = managerArr.length;
    res.locals.path = req.url;
    next();
  })
  .catch(next);
});

app.get('/', (req, res, next) => {
  // employees[0].manages
  res.render('index', { title: 'Home' })
})

app.use('/employees', require('./routes'))

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`** Listening on Port ${port} **`);
});

db.sync()
  .then( () => {
    db.seed();
  });
