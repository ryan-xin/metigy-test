const mysql = require('mysql');
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST_IP,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});

// Read Setting
const getSetting = (req, res) => {
  const sql = `SELECT * FROM Setting WHERE id = '${req.params.id}'`;
  pool.query(sql, (err, result, fields) => {
    if (err) {
      return console.log(err);
    }
    const settings = JSON.parse(result[0].data);
    res.json(settings);
  });
};

// Update Setting
const updateSetting = (req, res) => {
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
};

module.exports = { getSetting, updateSetting };