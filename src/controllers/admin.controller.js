const pool = require('../config/connection');
const bcrypt = require('bcrypt');

// Función para registrar un administrador
exports.registrarAdmin = async (req, res) => {
    const { nombre, email, password } = req.body;

    const hashPassword = await bcrypt.hash(password, 10);

    const sql = "INSERT INTO admins (nombre, email, password) VALUES (?, ?, ?)";

    pool.query(sql, [nombre, email, hashPassword], (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Error al registrar un administrador" });
      }
      res.status(201).json(result);
    });
};

// Función para acceder como administrador
exports.acceder = async (req, res) => {
    const { email, password } = req.body;

    const sql = "SELECT * FROM admins WHERE email = ?";

    pool.query(sql, [email], async (err, results) => {
        if (err || results.length === 0) {
            return res.status(401).json({ message: "Email o contraseña incorrectos" });
        }

        const admin = results[0];

        const isPasswordValid = await bcrypt.compare(password, admin.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Email o contraseña incorrectos" });
        }

        res.status(200).json({
            message: "Login exitoso",
            admin: {
                nombre: admin.nombre,
                email: admin.email
            }
        });
    });
};
