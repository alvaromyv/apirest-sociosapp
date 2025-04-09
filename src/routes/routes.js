const express = require('express');
const router = express();

const socioController = require('../controllers/socio.controller');

module.exports = () => {
    router.get('/', socioController.obtenerSocios);
    //router.get('/:id', socioController.obtenerSocioPorId); // si quieres recuperar un solo socio
    router.post('/', socioController.nuevoSocio);
    router.post('/reasignar', socioController.reasignarNumeroSocio);
    router.patch('/:id', socioController.actualizarSocio);
    router.delete('/:id', socioController.borrarSocio);

    return router;
}