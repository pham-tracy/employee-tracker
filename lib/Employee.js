class Employee {
  constructor(
    employeeFirstName,
    employeeLastName,
    employeeRole,
    employeeManager
  ) {
    this.employeeFirstName = employeeFirstName;
    this.employeeLastName = employeeLastName;
    this.employeeRole = employeeRole;
    this.employeeManager = employeeManager;
  }
}

module.exports = Employee;
