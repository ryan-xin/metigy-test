const mysql = require('mysql');
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST_IP,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});

// Read Keyword
const getKeyword = (req, res) => {
  pool.query('SELECT * FROM Keyword', (err, result, fields) => {
    if (err) {
      return console.log(err);
    }
    res.json(result);
  });
};

// Create Keyword
const createKeyword = (req, res) => {
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
};

// Delete Keyword
const deleteKeyword = (req, res) => {
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
};

module.exports = { getKeyword, createKeyword, deleteKeyword };