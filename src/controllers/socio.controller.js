const pool = require("../config/connection");

// Devuelve una lista de todos los socios
exports.obtenerSocios = (req, res) => {
  const sql = "SELECT * FROM socios ORDER BY antiguedad DESC;";
  pool.query(sql, (err, result, fields) => {
    if (err){
      return res.status(500).json({ message: "Error al recuperar la lista de socios."});
    }
    res.status(226).json(result)
  })
}

// Devuelve una lista de todos los socios morosos
exports.obtenerMorosos = (req, res) => {
  const sql = "SELECT * FROM socios WHERE pagado = 0;";
  pool.query(sql, (err, result, fields) => {
    if (err){
      return res.status(500).json({ message: "Error al recuperar la lista de socios."});
    }
    res.status(226).json(result)
  })
}

// Devuelve una lista de todos los socios pagados
exports.obtenerPagados = (req, res) => {
  const sql = "SELECT * FROM socios WHERE pagado = 1;";
  pool.query(sql, (err, result, fields) => {
    if (err){
      return res.status(500).json({ message: "Error al recuperar la lista de socios."});
    }
    res.status(226).json(result)
  })
}

// Obtiene una lista de socios que contengan la cadena buscada
exports.buscarSocio = (req, res) => {
  const TEXTO = req.query.q ? `%${req.query.q}%` : '%' // Si no hay consulta, mostramos todos los socios

  const sql = "SELECT * FROM socios WHERE CONCAT(nombre, ' ', apellidos) LIKE ?;";
  pool.query(sql,[TEXTO, TEXTO], (err, result, fields) => {
    if (err){
      return res.status(500).json({ message: "Error al buscar la cadena indicada."});
    }
    res.status(226).json(result)
  })
}

// Obtener un socio concreto por su ID
exports.obtenerSocioPorId = (req, res) => {
  const ID = req.params.id;

  const sql = "SELECT * FROM socios WHERE id=?;"
  pool.query(sql,[ID], (err, result, fields) => {
    if(err) {
      return res.status(500).json({ message: "Error al recuperar el socio.", error: err})
    }
    res.status(226).json(result)
  })
}

// Obtener la lista de socios invitados por un socio concreto por su ID
exports.obtenerInvitaciones = (req, res) => {
  const ID = req.params.id;

  const sql = "SELECT * FROM socios WHERE invitado_por=?;"
  pool.query(sql,[ID], (err, result, fields) => {
    if(err) {
      return res.status(500).json({ message: "Error al recuperar la lista de socios.", error: err})
    }
    res.status(226).json(result)
  })
}

// Obtener el socio que ha invitado a un socio concreto por su ID (invitado_por)
exports.obtenerInvitador = (req, res) => {
  const ID = req.params.id;

  const sql = "SELECT * FROM socios WHERE id = (SELECT invitado_por FROM socios WHERE id=?);"
  pool.query(sql,[ID], (err, result, fields) => {
    if(err) {
      return res.status(500).json({ message: "Error al recuperar el socio.", error: err})
    }
    res.status(226).json(result)
  })
}

// Obtener un resumen de la contabilidad de la empresa
exports.obtenerResumenContabilidad = (req, res) => {
  const sql = `SELECT
      SUM(cuota) AS total,
      SUM(CASE WHEN pagado = 1 THEN cuota ELSE 0 END) AS pagado,
      SUM(CASE WHEN pagado = 0 THEN cuota ELSE 0 END) AS impagado,
      ROUND(100 * SUM(CASE WHEN pagado = 1 THEN cuota ELSE 0 END) / SUM(cuota), 2) AS porcentaje_pagado
    FROM socios;
  `;
  
  pool.query(sql, (err, result) => {
    if (err){
      return res.status(500).json({ message: "Error al recuperar el resumen de la contabilidad."});
    }
    res.status(226).json({
      cuotaTotal: result[0].total ?? 0,
      cuotaTotalPagada: result[0].pagado ?? 0,
      cuotaTotalImpagada: result[0].impagado ?? 0,
      porcentajeCuotasPagadas: result[0].porcentaje_pagado ?? 0
    });
  })
}

// Crear un nuevo socio
exports.nuevoSocio = (req, res) => {
  const values = [
    req.body.n_socio, req.body.nombre, req.body.apellidos, req.body.telefono,
    req.body.email, req.body.categoria, req.body.antiguedad, req.body.cuota,
    req.body.abonado, req.body.pagado, req.body.invitado_por
  ];

  const sql = "INSERT INTO socios(n_socio, nombre, apellidos, telefono, email, categoria, antiguedad, cuota, abonado, pagado, invitado_por) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);"

  pool.query(sql, values, (err, result, fields) => {
    if(err) {
      return res.status(500).json({ message: "Error al guardar en la base de datos.", error: err })
    }
    res.status(201).json({message: "¡Socio agregado correctamente!"})
  })
}

// Actualizar el nº de socio de cada socio en función de la antiguedad
exports.reasignarNumeroSocio = (req, res) => {
  const sql = "SET @num := 0; UPDATE socios SET n_socio = (@num := @num + 1) ORDER BY antiguedad ASC;";

  pool.query(sql, (err, result, fields) => {
    if(err) {
      return res.status(500).json({ message: "Error al actualizar los socios.", error: err });
    }
    res.status(200).json({message: "Socios actualizados correctamente!"})
  })
}

// Actualizar atributos de un socio en especifico
exports.actualizarSocio = (req, res) => {
  const values = [
    req.body.nombre, req.body.apellidos, req.body.telefono,
    req.body.email, req.body.categoria, req.body.antiguedad, req.body.cuota,
    req.body.abonado, req.body.pagado, req.body.invitado_por
  ];
  const ID = req.params.id;

  
  const sql = "UPDATE socios SET nombre=?, apellidos=?, telefono=?, email=?, categoria=?, antiguedad=?, cuota=?, abonado=?, pagado=?, invitado_por=? WHERE id=?";

  pool.query(sql, [...values, ID], (err, result, fields) => {
    if(err) {
      return res.status(500).json({ message: "Error al actualizar el socio.", error: err });
    }
    
    console.log(result.affectedRows) 
    res.status(200).json({message: "Socio actualizado correctamente!"})
  })
}

// Eliminar un socio por ID
exports.borrarSocio = (req, res) => {
  const ID = req.params.id;

  const sql = "DELETE FROM socios WHERE id=?";
  pool.query(sql, ID, (err, result, fields) => {
    if(err) {
      return res.status(500).json({ message: "Error al eliminar el socio.", error: err });
    }
    res.status(200).json({message: "Socio eliminado correctamente!"})
  })
}