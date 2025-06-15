const router = require("express").Router();

// Middleware Imports
const isAuthenticatedMiddleware = require("../common/middlewares/IsAuthenticatedMiddleware");
const SchemaValidationMiddleware = require("../common/middlewares/SchemaValidationMiddleware");
const CheckPermissionMiddleware = require("../common/middlewares/CheckPermissionMiddleware");
const ignorarCampos = require('../common/middlewares/IgnorarCampos');

// Controller Imports
const UsuarioController = require("../controllers/usuario.controller");

// JSON Schema Imports for payload verification
const actualizarUsuarioPayload = require("../schemas/actualizarUsuarioPayload");

const upload = require("../common/middlewares/UploadAvatar");
const { roles } = require("../../config/config");

router.get(
  "/todos",
  [isAuthenticatedMiddleware.check, CheckPermissionMiddleware.has(roles.ADMIN)],
  UsuarioController.obtenerUsuarios
);

// Sirve para obtener los datos del usuario que ha iniciado sesión
router.get(
  "/", 
  [isAuthenticatedMiddleware.check], 
  UsuarioController.encontrarUsuario
);

router.get(
  "/buscar",
  [isAuthenticatedMiddleware.check],
  UsuarioController.buscarUsuario
);

router.post(
  "/subir-avatar/:id",
  [
    isAuthenticatedMiddleware.check,
    upload.single("avatar"),
  ],
  UsuarioController.subirAvatar
);


router.patch(
  "/:id",
  [
    isAuthenticatedMiddleware.check,
    CheckPermissionMiddleware.has(roles.ADMIN),
    ignorarCampos('password'),
    SchemaValidationMiddleware.verify(actualizarUsuarioPayload),
  ],
  UsuarioController.actualizarUsuarioPorId
);

router.patch(
  "/",
  [
    isAuthenticatedMiddleware.check,
    SchemaValidationMiddleware.verify(actualizarUsuarioPayload),
  ],
  UsuarioController.actualizarUsuario
);

router.delete(
  "/:id",
  [isAuthenticatedMiddleware.check, CheckPermissionMiddleware.has(roles.ADMIN)],
  UsuarioController.eliminarUsuario
);

module.exports = router;