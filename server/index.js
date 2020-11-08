/* ------------ Express Server Initialization ----------- */

const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

const bodyParser = require('body-parser');
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Set PORT, listen for requests
app.listen(process.env.REACT_APP_SERVER_PORT, () => {
  console.log(`Server is running on port ${process.env.REACT_APP_SERVER_PORT}...`);
});

/* ---------------- MySql Initialization ---------------- */

const mysql = require('mysql');
const db = mysql.createConnection({
  host: process.env.MYSQL_HOST_IP,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});
db.connect((err) => {
  if(err) {
    console.log(err);
  } else {
    console.log('Database is connected.');
  }
});

const fs = require('fs');

const settingsJSON = fs.readFileSync('./settings.json');
const settings = JSON.parse(settingsJSON);
console.log(settings);

const keywordsJSON = fs.readFileSync('./keywords.json');
const keywords = JSON.parse(keywordsJSON);
console.log(keywords);

/* ----------------------- Routes ----------------------- */

// Testing route
app.get('/', (req, res) => {
  res.json({message: 'Welcome to Google AdWords Configurator!'});
});

// Read Settings
app.get('/settings', (req, res) => {
  res.json(settings);
});

// Update Settings
app.post('/settings/edit', (req, res) => {
  var sql = "UPDATE Setting SET address = 'Canyon 123' WHERE setting_id = ";
  db.query(sql, (err, result) => {
    if (err) {
      return console.log(err);
    }
    res.json(result);
  });
});

// Read Keywords
app.get('/keywords', (req, res) => {
  // res.json(keywords);
  db.query('SELECT * FROM Keyword', (err, result, fields) => {
    if (err) {
      return console.log(err);
    }
    res.json(result);
  });
});

// Create Keywords
app.post('/keywords/create', (req, res) => {
  console.log(req.body);
  const sql = `INSERT INTO Keyword (data) VALUES ('${req.body.data}')`;
  db.query(sql, (err, result) => {
    if (err) {
      return console.log(err);
    }  
    db.query('SELECT * FROM Keyword', (err, result, fields) => {
      if (err) {
        return console.log(err);
      }
      res.json(result);
    });
  });
});

// Delete Keywords
app.post('/keywords/delete', (req, res) => {
  console.log(req.body);
  const sql = `DELETE FROM Keyword WHERE keyword_id = ${req.body.keyword_id}`;
  db.query(sql, (err, result) => {
    if (err) {
      return console.log(err);
    }  
    db.query('SELECT * FROM Keyword', (err, result, fields) => {
      if (err) {
        return console.log(err);
      }
      res.json(result);
    });
  });  
});


