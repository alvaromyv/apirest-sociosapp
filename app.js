const Express = require("express");
const app = Express();
const cors = require("cors");
const morgan = require("morgan");
const { Sequelize } = require("sequelize");

const { port } = require("./config");
const PORT = process.env.PORT || port;

// Express Routes Import
const AuthorizationRoutes = require("./authorization/routes");
const UsuarioRoutes = require("./usuarios/routes");
const SocioRoutes = require("./socios/routes");

const UsuarioModel = require("./common/models/Usuario");
const SocioModel = require("./common/models/Socio");

app.use(morgan("tiny"));
app.use(cors());

app.use(Express.json());

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./storage/data.db", // Ruta donde se va a guardar la BBDD SQLite.
});

UsuarioModel.inicializar(sequelize);
SocioModel.inicializar(sequelize);

sequelize
  .sync()
  .then(() => {
    console.log("Sequelize Inicializado!!");

    app.use("/", AuthorizationRoutes);
    app.use("/usuarios", UsuarioRoutes);
    app.use("/socios", SocioRoutes);

    app.listen(PORT, () => {
      console.log("Server Listening on PORT:", port);
    });
  })
  .catch((err) => {
    console.error("Sequelize Initialisation threw an error:", err);
  });