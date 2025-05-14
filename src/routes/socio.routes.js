const router = require("express").Router();

const SocioController = require("../controllers/SocioController");

// Middleware Imports
const isAuthenticatedMiddleware = require("../common/middlewares/IsAuthenticatedMiddleware");
const SchemaValidationMiddleware = require("../common/middlewares/SchemaValidationMiddleware");
const CheckPermissionMiddleware = require("../common/middlewares/CheckPermissionMiddleware");

// JSON Schema Imports for payload verification
const crearSocioPayload = require("../schemas/crearSocioPayload");
const actualizarSocioPayload = require("../schemas/actualizarSocioPayload");
const { roles } = require("../../config");


router.get(
    "/",
    [isAuthenticatedMiddleware.check],
    SocioController.obtenerSocios
);

router.get(
  "/:socioId",
  [isAuthenticatedMiddleware.check],
  SocioController.obtenerSocioPorId
);

router.post(
  "/",
  [
    isAuthenticatedMiddleware.check,
    CheckPermissionMiddleware.has(roles.ADMIN),
    SchemaValidationMiddleware.verify(crearSocioPayload),
  ],
  SocioController.crearSocio
);

router.patch(
  "/:socioId",
  [
    isAuthenticatedMiddleware.check,
    CheckPermissionMiddleware.has(roles.ADMIN),
    SchemaValidationMiddleware.verify(actualizarSocioPayload),
  ],
  SocioController.actualizarSocio
);

router.delete(
  "/:socioId",
  [isAuthenticatedMiddleware.check, CheckPermissionMiddleware.has(roles.ADMIN)],
  SocioController.eliminarSocio
);

module.exports = router;