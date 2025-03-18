const mysql = require("mysql")

const config = {
    host: "localhost",
    user: "root",
    // password: "root",
    database: "socios_db"
};  

const pool = mysql.createPool(config);

module.exports = pool;