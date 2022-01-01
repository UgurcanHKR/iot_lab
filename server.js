// Importing dotenv, path modules and create a path
require('dotenv').config();
const path = require('path');

// Importing express module and create an app
const express = require('express');
const app = express();

// importing router output objects from ....routes.js files
const { router: cargo_centerRouter } = require('./api/routes/cargo_center.routes');
const { router: cargo_infoRouter } = require('./api/routes/cargo_info.routes');
const { router: cargo_statusRouter } = require('./api/routes/cargo_status.routes');
const { router: vehicleRouter } = require('./api/routes/vehicle.routes');

// This USE function is used to mount the specified middleware function(s) 
// at the path which is being specified.
app.use(express.static(path.resolve(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'client/components'))); 

// importing connectToDatabase from .../database file
const { connectToDatabase } = require('./database');

// This GET function is used when URL is the same with "/"
// With this URL, GET function runs and index.html is sent as a response 
app.get("/", (_, res) => {
    res.sendFile("index.html");
});

// This USE function is used to mount following routers
app.use(cargo_centerRouter);
app.use(cargo_infoRouter);
app.use(cargo_statusRouter);
app.use(vehicleRouter);

// After running connectToDatabase() function, with chaining, a function is created
// and PORT is set 8080 or is taken from "process.env.PORT"
// LISTEN function is used to bind and listen the connections on the specified host and port
// Print a message to console
connectToDatabase()
    .then(() => {
        const PORT = process.env.PORT || 8080;
        app.listen(PORT, () => {
            console.log('Listening to port ' + PORT);
        });
    })
    .catch((error) => console.error(error));