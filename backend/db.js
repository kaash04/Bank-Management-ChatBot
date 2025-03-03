const mysql = require("mysql2");
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "idb",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL");
});

function createTable() {
  const query = `CREATE TABLE IF NOT EXISTS customers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        branch_code INT NOT NULL,
        account_no BIGINT UNIQUE NOT NULL,
        account_type VARCHAR(50) NOT NULL,
        curr_balance DECIMAL(15,2) NOT NULL,
        name VARCHAR(255) NOT NULL,
        dob DATE NOT NULL,
        gender ENUM('Male', 'Female', 'Other') NOT NULL,
        phone VARCHAR(15) UNIQUE NOT NULL
    )`;
  db.query(query, (err) => {
    if (err) throw err;
  });
}

function runSQL(command, params = []) {
  return new Promise((resolve, reject) => {
    db.query(command, params, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
}

createTable();
module.exports = { runSQL };
