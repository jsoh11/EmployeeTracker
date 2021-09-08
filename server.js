const express = require('express');
const mysql = require('mysql2');
const inquirer = require("inquirer");

const PORT = process.env.PORT || 3001;
const app = express();


app.use(express.urlencoded({ extended: false }));
app.use(express.json());


const db = mysql.createConnection(
  {
    host: 'localhost',

    user: 'root',

    password: '',

    database: 'tracker_db'
  },
  console.log(`Connected to the tracker_db database.`)
);

const promptUser = () => {

  return inquirer.prompt([
    {
      type: 'list',
      message: 'What would you like to do?',
      choices: ['View all employees',
                'Add employee',
                'View all roles',
                'Add role',
                'View all Departments',
                'Add departments',
      ],
      name: 'license',
    },

  ])
}



app.get('/api/department', ({ body }, res) => {
  const sql = `INSERT INTO DEPARTMENT (DEPARTMENT_NAME)
    VALUES (?)`;
  const params = [body.movie_name];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: body
    });
  });
});


app.get('/api/role', (req, res) => {
  const sql = `SELECT id, movie_name AS title FROM movies`;

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: rows
    });
  });
});

app.get('/api/employee', (req, res) => {
  const sql = `SELECT id, movie_name AS title FROM movies`;

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: rows
    });
  });
});



app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
