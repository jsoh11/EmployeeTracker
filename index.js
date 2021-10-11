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

  async function depTable(data){
    const showDbQuery =  new Department()
    showDbQuery.showDep(data)
    console.log('\n')
    init();
}


async function roleTable(data){
    const showDbQuery = new Role()
    showDbQuery.showRole(data)
    console.log('\n')
    init();
}


async function empTable(data){
    const showDbQuery = new Employee()
    showDbQuery.showEmp(data)
    console.log('\n')
    init();
}


function addDepartment(data){
    inquirer.prompt([
      {
        type: 'input',
        name: 'dep_name',
        message: "What's the name of the department?",
      },
    ])
    .then((data) => {
      const addTo = new Department()
      addTo.addDep(data.dep_name)
      console.log(`Added ${data.dep_name} to the database!`);
      init();
    })
  }



  async function addRole(data){ 
    let db = await mysql.createConnection(
        {
          host: 'localhost',
          user: 'root',
          password: '',
          database: 'tracker_db'
        },
        console.log(`You are connected to the Employee tracker database.`)
      );
  
      const [depQuery] = await db.query(`SELECT dep_name as Department, id  FROM department`)
      
        inquirer.prompt([
          {
            type: 'input',
            name: 'title',
            message: "What is the role?",
          },
          {
            type: 'input',
            name: 'salary',
            message: "What is the salary?",
          },
          {
            type: 'list',
            name: 'department',
            message: "What is the department?",
            choices: depQuery.map(department => ({name:department.Department, value: department}))
          },
        ])
        .then((res) => {
          const addTo = new Role()


          addTo.addRole(res.title, res.salary, res.department.id)
          console.log(`Added ${res.title} to the database!`)
          init();
        })
      }

      async function addEmployee(data){
        let db = await mysql.createConnection(
          {
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'tracker_db'
          },
          console.log(`You are connected to the Employee tracker database.`)
        );
        const [roleQuery] = await db.query(`SELECT title, id from emp_role`)
        const [userQuery] = await db.query(`SELECT first_name, last_name, id from employee`)
          inquirer.prompt([
            {
              type: 'input',
              name: 'first_name',
              message: "What's the first name of the employee",
            },
            {
              type: 'input',
              name: 'last_name',
              message: "What's the last name of the employee",
            },
            {
              type: 'list',
              name: 'role_id',
              message: "What's this employee's role",
              choices: roleQuery.map(role => ({name:role.title, value: role.id}))
            },
            {
              type: 'list',
              name: 'manager_id',
              message: "What's the name of this employee's manager",
              choices: userQuery.map(employee => ({name:`${employee.first_name} ${employee.last_name}`, value: employee.id}))
            },
          ])
          .then((res) => {
            const addTo = new Employee()
            addTo.addEmp(res.first_name, res.last_name, res.role_id, res.manager_id)
            console.log(`Added ${res.first_name} to the database!`)
            init();
          })
        }