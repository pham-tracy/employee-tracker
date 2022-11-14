const fs = require("fs");
const inquirer = require("inquirer");
const cTable = require("console.table");
const mysql = require("mysql2");
const { connect } = require("http2");
const Employee = require("./lib/Employee");
const Department = require("./lib/Department");
// const Employee = require("Employee");

const allDepartments = [];
const allRoles = [];
const allEmployees = [];

// create the connection to database
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "",
    database: "employee_db",
  },
  console.log("Connected to the employee_db database")
);

// Questions for adding department
const menu = [
  {
    type: "list",
    message: "What action would you like to take?",
    name: "menu",
    choices: [
      "View all departments",
      "View all roles",
      "View all employees",
      "Add a department",
      "Add a role",
      "Add an employee",
      "Update an employee role",
    ],
  },
];

const addDepartmentQs = [
  {
    type: "input",
    message: "What is the name of the department?",
    name: "deptName",
  },
];

const addRoleQs = [
  {
    type: "input",
    message: "What is the name of the role?",
    name: "roleName",
  },
  {
    type: "input",
    message: "What is the salary of the role?",
    name: "roleSalary",
  },
  {
    type: "input",
    message: "Which department does the role belong to?",
    name: "roleDept",
  },
];

const addEmployeeQs = [
  {
    type: "input",
    message: "What is the employee's first name?",
    name: "employeeFirstName",
  },
  {
    type: "input",
    message: "What is the employee's last name?",
    name: "employeeLastName",
  },
  {
    type: "input",
    message: "What is the employee's role?",
    name: "employeeRole",
  },
  {
    type: "input",
    message: "Who is the employee's mananger?",
    name: "employeeManager",
  },
];

const updateEmployee = [
  {
    type: "input",
    message: "Which employee's role would you like to update?",
    name: "employeeFirstName",
    //   choices: [pull employees from database]
  },
];

// Initializes the app by presenting menu options
init();

// Menu options
function init() {
  inquirer.prompt(menu).then((response) => {
    if (response.menu === "View all departments") {
      viewDepts();
    } else if (response.menu === "View all roles") {
      viewRoles();
    } else if (response.menu === "View all employees") {
      viewEmployees();
    } else if (response.menu === "Add a department") {
      addDepartment();
    } else if (response.menu === "Add a role") {
      addRole();
    } else if (response.menu === "Add an employee") {
      addEmployee();
    } else if (response.menu === "Update an employee role") {
      console.log("update an employee role with SQL");
    }
    // console.log(response);
  });
}

// View all departments
function viewDepts() {
  db.query("SELECT * FROM department", function (err, response) {
    console.table(response);
    init();
  });
}

// View all roles
function viewRoles() {
  db.query("SELECT * FROM role", function (err, response) {
    console.table(response);
    console.log("VIEW ALL Roles");
    init();
  });
}

// View all employees
function viewEmployees() {
  db.query("SELECT * FROM employee", function (err, response) {
    console.table(response);
    init();
  });
}

// Adds new department
function addDepartment() {
  inquirer.prompt(addDepartmentQs).then((response) => {
    // const department = new Department(response.deptName);
    db.query(
      "INSERT INTO department (department_name) VALUES (?)",
      response.deptName,
      function (err, response) {
        if (err) return err;
        console.log("Department added");
        init();
      }
    );
    // allDepartments.push(department);

    // console.table(allDepartments);å
    // INSERT INTO department (department_name)
    // VALUES (response)
  });
}

// Adds new role
function addRole() {
  inquirer.prompt(addRoleQs).then((response) => {
    console.log(response);
    init();
    // INSERT INTO role (title, salary, department_id)
    // VALUES (response.roleName, response.roleSalary, response.roleDept)
    // JOIN on department ID
  });
}

// Adds a new employee
function addEmployee() {
  inquirer.prompt(addEmployeeQs).then((response) => {
    const employee = new Employee(
      response.employeeFirstName,
      response.employeeLastName,
      response.employeeRole,
      response.employeeManager
    );
    allEmployees.push(employee);
    console.log(allEmployees);
    init();
    // INSERT INTO employee (first_name, last_name, role_id, manager_id)
    // VALUES (response.employeeFirstName, response.employeeLastName, response.employeeRole, response.employeeManager)
    // JOIN on roleID
    // JOIN on managerID to employeeID
  });
}
