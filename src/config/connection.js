const mysql = require("mysql")

const config = {
        host: "localhost",
        user: "root",
        // password: "root",
        database: "socios_db",
        timezone: "Z",
        multipleStatements: true
    };  
    
 const pool = mysql.createPool(config);
    

pool.getConnection((err, conexion) => {
    if(err){
        console.error("Error al acceder a la base de datos: ", err);
        process.exit(1)
    }else{
        conexion.release()
    }
});

module.exports = pool;