const { _conn, Sequelize } = require('./conn.js');

const Employee = _conn.define('employee', {
  email: {
    type: Sequelize.STRING,
    validate : {
      isEmail: true
    }
  }

}, {
  timestamps: false,
  getterMethods: {
    name: function() {
      return this.email.slice(0, this.email.indexOf('@'));
    },
    emailProvider: function() {
      return this.email.slice(this.email.indexOf('@') + 1);
    }
  },
});

Employee.createFromForm = function(body) {
  if (body.managerId === '-1') {
    delete body.managerId;
  }
  return this.create(body);
}

// Employee.prototype.createInstanceFromForm()

module.exports = Employee;
