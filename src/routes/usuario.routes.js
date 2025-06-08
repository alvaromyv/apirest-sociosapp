const router = require("express").Router();

// Middleware Imports
const isAuthenticatedMiddleware = require("../common/middlewares/IsAuthenticatedMiddleware");
const SchemaValidationMiddleware = require("../common/middlewares/SchemaValidationMiddleware");
const CheckPermissionMiddleware = require("../common/middlewares/CheckPermissionMiddleware");

// Controller Imports
const UsuarioController = require("../controllers/usuario.controller");

// JSON Schema Imports for payload verification
const actualizarUsuarioPayload = require("../schemas/actualizarUsuarioPayload");
const cambiarRolPayload = require("../schemas/cambiarRolPayload");

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
  "/:id",
  [
    isAuthenticatedMiddleware.check, 
    CheckPermissionMiddleware.has(roles.ADMIN)
  ],
  UsuarioController.obtenerUsuarioPorId
)

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
  "/",
  [
    isAuthenticatedMiddleware.check,
    SchemaValidationMiddleware.verify(actualizarUsuarioPayload),
  ],
  UsuarioController.actualizarUsuario
);

router.patch(
  "/:id",
  [
    isAuthenticatedMiddleware.check,
    CheckPermissionMiddleware.has(roles.ADMIN),
    SchemaValidationMiddleware.verify(actualizarUsuarioPayload),
  ],
  UsuarioController.actualizarUsuarioPorId
);

router.patch(
  "/cambiar-rol/:id",
  [
    isAuthenticatedMiddleware.check,
    CheckPermissionMiddleware.has(roles.ADMIN),
    SchemaValidationMiddleware.verify(cambiarRolPayload),
  ],
  UsuarioController.cambiarRol
);

router.delete(
  "/:id",
  [isAuthenticatedMiddleware.check, CheckPermissionMiddleware.has(roles.ADMIN)],
  UsuarioController.eliminarUsuario
);

module.exports = router;
