const router = require("express").Router();

// Middleware Imports
const isAuthenticatedMiddleware = require("./../common/middlewares/IsAuthenticatedMiddleware");
const SchemaValidationMiddleware = require("../common/middlewares/SchemaValidationMiddleware");
const CheckPermissionMiddleware = require("../common/middlewares/CheckPermissionMiddleware");

// Controller Imports
const UsuarioController = require("./controllers/UsuarioController");

// JSON Schema Imports for payload verification
const actualizarUsuarioPayload = require("./schemas/actualizarUsuarioPayload");
const cambiarRolPayload = require("./schemas/cambiarRolPayload");


const { roles } = require("../config");

router.get("/", [isAuthenticatedMiddleware.check], UsuarioController.encontrarUsuario);

router.patch(
  "/",
  [
    isAuthenticatedMiddleware.check,
    SchemaValidationMiddleware.verify(actualizarUsuarioPayload),
  ],
  UsuarioController.actualizarUsuario
);

router.get(
  "/all",
  [isAuthenticatedMiddleware.check, CheckPermissionMiddleware.has(roles.ADMIN)],
  UsuarioController.obtenerUsuarios
);

router.patch(
  "/change-role/:userId",
  [
    isAuthenticatedMiddleware.check,
    CheckPermissionMiddleware.has(roles.ADMIN),
    SchemaValidationMiddleware.verify(cambiarRolPayload),
  ],
  UsuarioController.cambiarRol
);

router.delete(
  "/:usuarioId",
  [isAuthenticatedMiddleware.check, CheckPermissionMiddleware.has(roles.ADMIN)],
  UsuarioController.eliminarUsuario
);

module.exports = router;
