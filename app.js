const Express = require("express");
require('dotenv').config();
const { I18n } = require('i18n')
const path = require("path");
const app = Express();
const cors = require("cors");
const morgan = require("morgan");
const { Sequelize } = require("sequelize");

const { port } = require("./config/config");
const PORT = process.env.PORT || port;

// Express Routes Import
const AuthorizationRoutes = require("./src/routes/authorization.routes");
const UsuarioRoutes = require("./src/routes/usuario.routes");
const SocioRoutes = require("./src/routes/socio.routes");

const UsuarioModel = require("./src/common/models/Usuario");
const SocioModel = require("./src/common/models/Socio");

app.use(morgan("tiny"));
app.use(cors());
app.use(Express.json());

const i18n = new I18n({
  locales: ['en', 'es'],
  directory: path.join(__dirname, 'src/common/locales'),
  defaultLocale: 'en',
  autoReload: true,
  objectNotation: true
})

app.use(i18n.init)

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./src/common/databases/data.db",
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