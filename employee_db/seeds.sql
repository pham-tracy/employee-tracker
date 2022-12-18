INSERT INTO department (department_name)
VALUES ("Sales"),
("Accounting"),
("Engineering"),
("Payroll"),
("Human Resources");


INSERT INTO role (title, salary, department_id)
-- VALUES (response.roleName, response.roleSalary, response.roleDept)
-- JOIN on department ID & dept table
VALUES ("Director",
100000, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
-- VALUES (response.employeeFirstName, response.employeeLastName, response.employeeRole, response.employeeManager)
-- JOIN on roleID
-- JOIN on managerID to employeeID
VALUES ("Jane", "Doe", 1, 1);