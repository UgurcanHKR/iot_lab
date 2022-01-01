// Importing express module to create a Router
const router = require('express').Router();

// Importing Vehicle collection to this file from ....model.js
const { Vehicle } = require('../models/vehicle.model');

// This GET function runs only if this url -'/api/vehicle'- is called.
// It returns ALL vehicle from Vehicle collection
router.get('/api/vehicle', async (req, res) => {
    const vehicle = await Vehicle.find({});
    res.send(vehicle);
});

// Output of this file
exports.router = router;  
