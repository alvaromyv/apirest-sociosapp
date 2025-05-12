const express = require('express');
const router = express.Router();

const socioController = require('../controllers/socio.controller');
const authController = require('../controllers/auth.controller');

module.exports = () => {
    const socioRouter = express.Router();
    const authRouter = express.Router();

    socioRouter.get('/', socioController.obtenerSocios);
    socioRouter.get('/morosos', socioController.obtenerMorosos);
    socioRouter.get('/pagados', socioController.obtenerPagados);
    socioRouter.get('/buscar', socioController.buscarSocio);
    socioRouter.get('/:id', socioController.obtenerSocioPorId);
    socioRouter.get('/:id/invitaciones', socioController.obtenerInvitaciones);
    socioRouter.get('/:id/invitador', socioController.obtenerInvitador);
    socioRouter.get('/contabilidad/resumen', socioController.obtenerResumenContabilidad);
    socioRouter.post('/', socioController.registrarSocio);
    socioRouter.patch('/reasignar', socioController.reasignarNumeroSocio);
    socioRouter.patch('/:id', socioController.actualizarSocio);
    socioRouter.delete('/:id', socioController.borrarSocio);


    authRouter.post('/login', authController.acceder); 


    router.use('/socios', socioRouter);
    router.use('/auth', authRouter);

    return router;
};
