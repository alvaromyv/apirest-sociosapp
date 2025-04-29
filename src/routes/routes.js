const express = require('express');
const router = express();

const socioController = require('../controllers/socio.controller');

module.exports = () => {
    router.get('/', socioController.obtenerSocios);
    router.get('/buscar', socioController.buscarSocio);
    router.get('/:id', socioController.obtenerSocioPorId);
    router.get('/:id/invitaciones', socioController.obtenerInvitaciones);
    router.post('/', socioController.nuevoSocio);
    router.patch('/reasignar', socioController.reasignarNumeroSocio);
    router.patch('/:id', socioController.actualizarSocio);
    router.delete('/:id', socioController.borrarSocio);

    return router;
}