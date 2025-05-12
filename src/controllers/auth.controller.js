const pool = require('../config/connection');


exports.registrarAdmin = async (req, res) => {
    
};

exports.acceder = async (req, res) => {
    const { email, password } = req.body;
    
    const sql = "SELECT * FROM admins WHERE email = ? AND password = ?"
    pool.query(sql,[email, password], (err, result, fields) => {
        if(err || result.length === 0) {
            return res.status(401).json({ message: "El correo y/o la contraseña no son correctos."})
        }

        res.status(200).json(result[0])
    })
};

