const express = require('express');
require('dotenv').config();
const routes = require('./src/routes/routes');

const PORT = process.env.PORT || 3000;

// SERVIDOR
const app = express();

// habilitar body-parser
app.use(express.urlencoded({extended:true}))
app.use(express.json())

// Rutas del app
app.use('/api/', routes());

app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
});

app.get("/status", (request, response) => {
    const status = {
        "Status": "Running"
    };

    response.send(status)
});
