require('dotenv').config();
const express = require('express');
const app = express();
const routes = require('./src/routes/routes');


const API_KEY = process.env.API_KEY || 'AMV';

function checkApiKey(req, res, next) {
  const apiKey = req.query.api_key || req.headers['x-api-key'];

  if (apiKey === API_KEY) {
    next();
  } else {
    res.status(403).send('Denegado: API Key no válida');
  }
}

app.use(checkApiKey);

// habilitar body-parser
app.use(express.urlencoded({extended:true}))
app.use(express.json())

// Rutas del app
app.use('/api/', routes());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
});

app.get("/status", (request, response) => {
    const status = {
        "Status": "Running"
    };

    response.send(status)
});
