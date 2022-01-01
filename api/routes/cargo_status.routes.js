// Importing express module to create a Router
const router = require('express').Router();

// Importing Cargo_status collection to this file from ....model.js
const { Cargo_status } = require('../models/cargo_status.model');

// This GET function runs only if this url -'/api/cargo_status'- is called.
// It returns ALL cargo_status from Cargo_status collection
router.get('/api/cargo_status', async (req, res) => {
    const cargo_status = await Cargo_status.find({});
    res.send(cargo_status);
});

// Output of this file
exports.router = router; 
