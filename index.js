const inquirer = require('inquirer');
const mysql = require('mysql2/promise');
const { Department, Role, Employee} = require('./linkdb.js');

let db;

console.log('Welcome to the Employee Tracker Database!');
function init(){

inquirer.prompt(
 [
    {
        type: 'list',
        name: 'menu',
        message: 'What would you like to do?',
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Quit'],
        filter(val) {
          return val.toLowerCase();
        },
    }
]
)

.then(res => {
  const choice = res.mainmenu;
  switch(choice){
    case 'view all departments':
      depTable(res)
      break;
    case 'view all roles':
      roleTable(res)
      break;
    case 'view all employees':
      empTable()
      break;
    case 'add a department':
      addDepartment(res)
      break;
    case 'add a role':
      addRole(res)
      break;
    case 'add an employee':
      addEmployee(res)
      break;
    case 'update an employee role':
      updateEmployee(res)
      break;
    case 'quit':
      quit(res);
      break;
  }})}