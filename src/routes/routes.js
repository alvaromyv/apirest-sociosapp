const express = require('express');
const router = express.Router();

const socioController = require('../controllers/socio.controller');
//const adminController = require('../controllers/admin.controller');

module.exports = () => {
    const socioRouter = express.Router();
    //const adminRouter = express.Router();

    // Rutas de Socios
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


    //adminRouter.post('/registrar', adminController.registrarAdmin); 
    //adminRouter.post('/acceder', adminController.acceder); 


    // Montar routers en el router principal
    router.use('/socios', socioRouter);
    //router.use('/admin', adminRouter);

    return router;
};
