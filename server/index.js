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

const mysql = require('mysql');
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST_IP,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});

// Set PORT, listen for requests
app.listen(process.env.REACT_APP_SERVER_PORT, () => {
  console.log(`Server is running on port ${process.env.REACT_APP_SERVER_PORT}...`);
});

/* ---------------- MySql Initialization ---------------- */

// db.connect((err) => {
//   if(err) {
//     console.log(err);
//   } else {
//     console.log('Database is connected.');
//   }
// });

const fs = require('fs');

const settingsJSON = fs.readFileSync('./settings.json');
const settings = JSON.parse(settingsJSON);
console.log(settings);

// Testing route
app.get('/', (req, res) => {
  res.json({message: 'Welcome to Google AdWords Configurator!'});
});

/* ------------------- Keyword Routes ------------------- */

// Read Keyword
app.get('/keywords', (req, res) => {
  pool.query('SELECT * FROM Keyword', (err, result, fields) => {
    if (err) {
      return console.log(err);
    }
    res.json(result);
  });
});

// Create Keyword
app.post('/keywords/create', (req, res) => {
  console.log(req.body);
  const sql = `INSERT INTO Keyword (word) VALUES ('${req.body.word}')`;
  pool.query(sql, (err, result) => {
    if (err) {
      return console.log(err);
    }  
    pool.query('SELECT * FROM Keyword', (err, result, fields) => {
      if (err) {
        return console.log(err);
      }
      res.json(result);
    });
  });
});

// Delete Keyword
app.post('/keywords/delete', (req, res) => {
  console.log(req.body);
  const sql = `DELETE FROM Keyword WHERE id = ${req.body.id}`;
  pool.query(sql, (err, result) => {
    if (err) {
      return console.log(err);
    }  
    pool.query('SELECT * FROM Keyword', (err, result, fields) => {
      if (err) {
        return console.log(err);
      }
      res.json(result);
    });
  });  
});

/* --------------------- Site Route -------------------- */

// Read Site
app.get('/sites', (req, res) => {
  pool.query('SELECT * FROM Site', (err, result, fields) => {
    if (err) {
      return console.log(err);
    }
    res.json(result);
  });
});

// Create Site
app.post('/sites/create', (req, res) => {
  console.log(req.body);
  const sql = `INSERT INTO Site (url) VALUES ('${req.body.url}')`;
  pool.query(sql, (err, result) => {
    if (err) {
      return console.log(err);
    }  
    pool.query('SELECT * FROM Site', (err, result, fields) => {
      if (err) {
        return console.log(err);
      }
      res.json(result);
    });
  });
});

// Delete Site
app.post('/sites/delete', (req, res) => {
  console.log(req.body);
  const sql = `DELETE FROM Site WHERE id = ${req.body.id}`;
  pool.query(sql, (err, result) => {
    if (err) {
      return console.log(err);
    }  
    pool.query('SELECT * FROM Site', (err, result, fields) => {
      if (err) {
        return console.log(err);
      }
      res.json(result);
    });
  });  
});

/* ------------------- Settings Route ------------------- */

// Read Settings
app.get('/settings', (req, res) => {
  res.json(settings);
});

// Update Settings
app.post('/settings/edit', (req, res) => {
  var sql = "UPDATE Setting SET address = 'Canyon 123' WHERE setting_id = ";
  pool.query(sql, (err, result) => {
    if (err) {
      return console.log(err);
    }
    res.json(result);
  });
});


