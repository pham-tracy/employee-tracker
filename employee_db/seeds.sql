INSERT INTO department (department_name)
VALUES ("Sales"),
("Accounting"),
("Engineering"),
("Payroll"),
("Human Resources");


-- INSERT INTO role (id, title, salary, department_id)
-- -- VALUES (response.roleName, response.roleSalary, response.roleDept)
-- -- JOIN on department ID & dept table
-- VALUES ("1"), ("Director"),
-- ("100000"),
-- ("Human Resources pulled from dept table join");

-- INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
-- -- VALUES (response.employeeFirstName, response.employeeLastName, response.employeeRole, response.employeeManager)
-- -- JOIN on roleID
-- -- JOIN on managerID to employeeID
-- VALUES ("1"), ("Jane"), ("Doe"), ("Director pulled from role table join"), ("Jonh Johnson pulled from employee table ID?");