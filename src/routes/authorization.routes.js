const router = require("express").Router();

// Controller Imports
const AuthorizationController = require("../controllers/authorization.controller.js");

// Middleware Imports
const SchemaValidationMiddleware = require("../common/middlewares/SchemaValidationMiddleware.js");

// JSON Schema Imports for payload verification
const registerPayload = require("../schemas/registerPayload.js");
const loginPayload = require("../schemas/loginPayload.js");

router.post(
  "/signup",
  [SchemaValidationMiddleware.verify(registerPayload)],
  AuthorizationController.register
);

router.post(
  "/login",
  [SchemaValidationMiddleware.verify(loginPayload)],
  AuthorizationController.login
);

module.exports = router;