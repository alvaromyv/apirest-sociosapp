const pool = require("../config/connection");

exports.obtenerSocios = (req, res) => {
  const sql = "SELECT * FROM socios;";
  pool.query(sql, (err, result, fields) => {
    if (err){
      res.json({ message: "Error al recuperar la lista de socios."});
    }
    res.json(result)
  })
}

/*
exports.obtenerSocioPorId = (req, res) => {
  const ID = req.params.id;

  const sql = "SELECT * FROM socio WHERE id=?";
  pool.query(sql,[ID], (err, result, fields) => {
    if(err) {
      res.json({ message: "Error al recuperar el socio." });
    }
    res.json(result)
  })
}

exports.darAltaSocio = (req, res) => {
  const values = Object.values(req.body)

  const sql = "INSERT INTO socios(nombre, apellidos, telefono, email, categoria, cuota, invitado_por) VALUES(?, ?, ?, ?, ?, ?, ?)";
  pool.query(sql, values, (err, result, fields) => {
    if(err) {
      res.json({ message: "Error al guardar en la base de datos." });
    }
    res.json({message: "¡Socio agregado correctamente!"})
  })
}

exports.actualizarSocioPorId = (req, res) => {
  const values = Object.values(req.body);
  const ID = req.params.id;

  const sql = "UPDATE socios SET nombre=?, apellidos=?, email=?, categoria=?, cuota=?, invitado_por=? WHERE id=?";
  pool.query(sql, [...values, ID], (err, result, fields) => {
    if(err) {
      res.json({ message: "Error al actualizar el socio." });
    }
    res.json({message: "¡Libro actualizado correctamente!"})
  })
}

exports.darBajaSocioPorId = (req, res) => {
  const ID = req.params.id;

  const sql = "DELETE FROM socios WHERE id=?";
  pool.query(sql, ID, (err, result, fields) => {
    if(err) {
      res.json({ message: "Error al eliminar el socio." });
    }
    res.json({message: "¡Libro eliminado correctamente!"})
  })
}
*/