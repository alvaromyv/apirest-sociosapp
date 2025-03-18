const express = require('express');
const router = express();

const socioController = require('../controller/socio.controller');

module.exports = () => {
    router.get('/socios', socioController.obtenerSocios);
    // router.get('/socios/:id', socioController.obtenerSocioPorId);
    // router.post('/socios', socioController.darAltaSocio);
    // router.put('/socios/:id', socioController.actualizarSocioPorId);
    // router.delete('/socios/:id', socioController.darBajaSocioPorId);

    return router;
}