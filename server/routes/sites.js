const mysql = require('mysql');
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST_IP,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});

// Read Site
const getSite = (req, res) => {
  pool.query('SELECT * FROM Site', (err, result, fields) => {
    if (err) {
      return console.log(err);
    }
    res.json(result);
  });
};

// Create Site
const createSite = (req, res) => {
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
};

// Delete Site
const deleteSite = (req, res) => {
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
};

module.exports = { getSite, createSite, deleteSite };