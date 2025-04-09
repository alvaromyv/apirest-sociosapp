const mysql = require("mysql")

const config = {
    host: "localhost",
    user: "root",
    // password: "root",
    database: "socios_db",
    multipleStatements: true
};  

const pool = mysql.createPool(config);

module.exports = pool;