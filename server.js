const inquirer = require("inquirer");
const cTable = require("console.table");
const mysql = require("mysql2");

const allDepartments = [];
const allRoles = [];
const allEmployees = [];

// Create the connection to database
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
      "Exit",
    ],
  },
];

// Questions to add a department
const addDepartmentQs = [
  {
    type: "input",
    message: "What is the name of the department?",
    name: "deptName",
  },
];

// Questions to add a role
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
    type: "list",
    message: "Which department does the role belong to?",
    name: "roleDept",
    // this shows up as undefined
    choices: allDepartments,
  },
];

// Questions to add an employee
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
    type: "list",
    message: "What is the employee's role?",
    name: "employeeRole",
    choices: allRoles,
  },
  {
    type: "list",
    message: "Who is the employee's mananger?",
    name: "employeeManager",
    choices: allEmployees,
  },
];

// Questions to update an employee
const updateEmployee = [
  {
    type: "list",
    message: "Which employee's role would you like to update?",
    name: "roleUpdate",
    choices: allEmployees,
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
      updateEmployeeRole();
    } else if (response.menu === "Exit") {
      db.end();
    }
  });
}

// View all departments
function viewDepts() {
  db.query(
    "SELECT department.id AS ID, department.department_name AS Department FROM department",
    function (err, response) {
      if (err) throw err;
      for (i = 0; i < response.length; i++) {
        allDepartments.push(response[i].id + "" + response[i].name);
      }
      console.table(response);
      init();
    }
  );
}

// View all roles
function viewRoles() {
  db.query(
    "SELECT role.id, role.title, department.department_name AS department, role.salary FROM role JOIN department ON role.department_id=department.id",
    function (err, response) {
      if (err) throw err;
      for (i = 0; i < response.length; i++) {
        allRoles.push(response[i].id + "" + response[i].title);
      }
      console.table(response);
      init();
    }
  );
}

// View all employees
function viewEmployees() {
  db.query(
    "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.department_name AS department, role.salary, employee.manager_id AS manager FROM employee JOIN role ON employee.role_id=role.id JOIN department on role.department_id=department.id",
    function (err, response) {
      if (err) throw err;
      console.table(response);
      init();
    }
  );
}

function currentRoles() {
  db.query("SELECT * FROM role", (err, input) => {
    if (err) throw err;
    for (i = 0; i < input.length; i++) {
      allRoles.push(input[i].id + " " + input[i].title);
    }
  });
  return allRoles;
}

// function to get choices of employees
function currentEmployees() {
  db.query("SELECT * FROM employee", (err, input) => {
    if (err) throw err;
    for (i = 0; i < input.length; i++) {
      allEmployees.push(
        input[i].id + " " + input[i].first_name + " " + input[i].last_name
      );
    }
  });
  return allEmployees;
}

// function to get choices of departments
function currentDepartments() {
  db.query("SELECT * FROM department", (err, input) => {
    if (err) throw err;
    for (i = 0; i < input.length; i++) {
      allDepartments.push(input[i].id + " " + input[i].department_name);
    }
  });
  return allDepartments;
}

// Adds new department
function addDepartment() {
  inquirer.prompt(addDepartmentQs).then((response) => {
    db.query(
      "INSERT INTO department (department_name) VALUES (?)",
      [response.deptName],
      function (err, response) {
        if (err) throw err;
        console.log("Department added successfully");
        init();
      }
    );
  });
}

// Adds new role
function addRole() {
  currentDepartments();
  inquirer.prompt(addRoleQs).then((response) => {
    var departmentIdResponse = response.roleDept.split(" ");
    db.query(
      "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)",
      [response.roleName, response.roleSalary, departmentIdResponse[0]],
      function (err, response) {
        if (err) throw err;
        console.log("Role added successfully");

        init();
      }
    );
  });
}

// Adds a new employee
function addEmployee() {
  inquirer.prompt(addEmployeeQs).then((response) => {
    db.query(
      "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
      [
        response.employeeFirstName,
        response.employeeLastName,
        response.employeeRole,
        response.employeeManager,
      ],
      function (err, response) {
        if (err) throw err;
        console.log("Employee added successfully");
        init();
      }
    );
  });
}

// Updates employee roles
function updateEmployeeRole() {
  inquirer.prompt(updateEmployee).then((response) => {
    db.query(""),
      function (err, response) {
        if (err) throw err;
        console.log("Employee's role updated successfully");
        init();
      };
  });
}

console.log(allDepartments);
