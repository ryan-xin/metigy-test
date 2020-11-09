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
app.post('/keywords', (req, res) => {
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
app.post('/keywords/:id/delete', (req, res) => {
  const sql = `DELETE FROM Keyword WHERE id = ${req.params.id}`;
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
app.post('/sites', (req, res) => {
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
app.post('/sites/:id/delete', (req, res) => {
  const sql = `DELETE FROM Site WHERE id = ${req.params.id}`;
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

// Read Setting
app.get('/settings/:id', (req, res) => {
  console.log(req.params.id);
  const sql = `SELECT * FROM Setting WHERE id = '${req.params.id}'`;
  pool.query(sql, (err, result, fields) => {
    if (err) {
      return console.log(err);
    }
    const settings = JSON.parse(result[0].data);
    res.json(settings);
  });
});

// Update Setting
app.post('/settings/:id/edit', (req, res) => {
  const settings = JSON.stringify(req.body.settings)
  const sql = `UPDATE Setting SET data = '${settings}' WHERE id = '${req.params.id}'`;
  pool.query(sql, (err, result) => {
    if (err) {
      return console.log(err);
    }
    pool.query('SELECT * FROM Setting', (err, result, fields) => {
      if (err) {
        return console.log(err);
      }
      const settings = JSON.parse(result[0].data);
      res.json(settings);
    });
  });
});


