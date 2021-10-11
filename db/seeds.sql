INSERT INTO department (dep_name)
VALUES ('Accounting'),
       ('R&D'),
       ('Human Resources');


INSERT INTO emp_role (title, salary, department_id)
VALUES ('Accountant', 90000, 1),
       ('Manager', 40000, 2),
       ('HR', 60000, 3);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Thor', 'Odinson', 3, 4),
        ('Carl', 'Weezer', 2, 1),
        ('Bruce', 'Wanye', 1, 6);
      