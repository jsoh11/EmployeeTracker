const mysql = require('mysql2/promise');
const inquirer = require('inquirer');
let db;

(async function(){


    db = await mysql.createConnection(
            {
              host: 'localhost',
              user: 'root',
              password: '',
              database: 'tracker_db'
            },
            console.log(`You are connected to the Employee tracker database..`)
          );
})()
    
class Department{
    constructor(id, dep_name){
        this.id = id;
        this.dep_name = dep_name;
    }
  async showDep(data){
        const [departmentResult] = await db.query(`SELECT dep_name as Department FROM department`);
        console.table(departmentResult);
    };
    async addDep(data){
       await db.query(`INSERT INTO department VALUES (id, ?)`, data);
    }
    }



class Role extends Department{
    constructor(title, salary, dep_name){
        super(dep_name)
        this.title = title;
        this.salary = salary;
    };
    async showRole(data){
        const [roleResult] = await db.query(`SELECT title as Title, salary as Salary, dep_name as Department FROM emp_role INNER JOIN department ON emp_role.department_id = department.id`);
        console.table(roleResult);
    }
    async addRole(title, salary, department_id){
        const datavalues = [title, salary, department_id]
        await db.query(`INSERT INTO emp_role (title, salary, department_id) VALUES (?)`, [datavalues])
    }
};
class Employee extends Department{
    constructor(id, first_name, last_name, role_id, manager_id){
        super(id)
        this.first_name = first_name;
        this.last_name = last_name;
        this.role_id = role_id;
        this.manager_id = manager_id;
    }
    async showEmp(data){
        const [empResult] = await db.query(`SELECT first_name as First_Name, last_name as Last_Name, title as Job_Title, dep_name as Department, salary as Salary, manager_id as Manager FROM employee INNER JOIN emp_role ON emp_role.id = employee.role_id INNER JOIN department ON emp_role.department_id = department.id`)
        console.table(empResult);
    }
    async addEmp(first_name, last_name, role_id, manager_id){
        const values = [first_name, last_name, role_id, manager_id]
        await db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?)`, [values])
    };
    async updateEmp(newData){
        await db.query(`UPDATE employee SET role_id =?`, newData)
    }
}


module.exports = { Department, Role, Employee, db };