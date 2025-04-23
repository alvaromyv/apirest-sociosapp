const mysql = require("mysql")

try{
    const config = {
        host: "localhost",
        user: "root",
        // password: "root",
        database: "socios_db",
        multipleStatements: true
    };  
    
    const pool = mysql.createPool(config);
    
    module.exports = pool;
}catch(error){
    console.error('Conexión fallida a la base de datos:', error);
}