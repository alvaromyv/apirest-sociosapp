const express = require('express');
const router = express();

const socioController = require('../controllers/socio.controller');

module.exports = () => {
    router.get('/', socioController.obtenerSocios);
    router.get('/morosos', socioController.obtenerMorosos);
    router.get('/pagados', socioController.obtenerPagados);
    router.get('/buscar', socioController.buscarSocio);
    router.get('/:id', socioController.obtenerSocioPorId);
    router.get('/:id/invitaciones', socioController.obtenerInvitaciones);
    router.get('/:id/invitador', socioController.obtenerInvitador)
    router.get('/contabilidad/resumen', socioController.obtenerResumenContabilidad)
    router.post('/', socioController.nuevoSocio);
    router.patch('/reasignar', socioController.reasignarNumeroSocio);
    router.patch('/:id', socioController.actualizarSocio);
    router.delete('/:id', socioController.borrarSocio);

    return router;
}