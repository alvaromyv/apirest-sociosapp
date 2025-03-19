const express = require('express');
const router = express();

const socioController = require('../controllers/socio.controller');

module.exports = () => {
    router.get('/socios', socioController.obtenerSocios);
    router.get('/socios/:id', socioController.obtenerSocioPorId);
    router.post('/socios', socioController.nuevoSocio);
    router.put('/socios/:id', socioController.actualizarSocio);
    router.delete('/socios/:id', socioController.borrarSocio);

    return router;
}