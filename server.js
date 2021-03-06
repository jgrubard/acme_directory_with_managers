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

app.use('/style', express.static(path.join(__dirname, '/style')));

app.use('/public', express.static(path.join(__dirname, 'node_modules')));

app.use( (req, res, next) => {
  Employee.findAll({
    include: [{
      model: Employee,
      as: 'manages'
    }]
  })
  .then( (employees) => {
    var managerCount = 0;
    employees.forEach(function(employee) {
      if (employee.manages.length > 0) {
        managerCount++;
      }
    });
    res.locals.employeeCount = employees.length;
    res.locals.managerCount = managerCount;
    res.locals.path = req.url;
    next();
  })
  .catch(next);
});

app.get('/', (req, res, next) => {
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
