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
  Employee.findAll()
    .then( (employees) => {
      const managers = {};
      employees.forEach( (employee) => {
        // console.log(employee.managerId);
        if (employee.managerId !== null) {
          if (!managers[employee.managerId]) {
            managers[employee.managerId] = 1;
          } else {
            managers[employee.managerId]++;
          }
        }
        // if(managers[employee.managerId])
        // if (employee.managerId) {

        // }
        // return !employee.managerId;
          // return employee;
        // }
      });

      // console.log(managers);

      // console.log(managersDupe)
      // const managers = []
      // const managers = managersDupe.filter( (manager) => {
      //   if (manager !in managers) {
      //     managers.push(manager)
      //   }
      // })

      // const managers = managersDupe.filter( (manager, index, arr) => {
      //   return index === arr.indexOf(manager);
      // });

      // let managers = Array.from(new Set(managersDupe));

      // console.log(managers)



      res.locals.employeeCount = employees.length;
      res.locals.employees = employees;
      res.locals.managerCount = Object.keys(managers).length;
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
  })


