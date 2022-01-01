// Importing express module to create a Router
const router = require('express').Router();

// Importing Cargo_center collection to this file from ....model.js
const { Cargo_center } = require('../models/cargo_center.model');

// This GET function runs only if this url -'/api/cargo_center/:id'- is called. :id means it's variable/parameter
// It returns SELECTED cargo_center_id from Cargo_center collection
router.get('/api/cargo_center/:id', async (req, res) => {
    const cargo_center = await Cargo_center.find({ center_id: req.params.id });
    res.send(cargo_center[0]);
});

// This GET function runs only if this url -'/api/cargo_center'- is called.
// It returns ALL cargo_center_id from Cargo_center collection
router.get('/api/cargo_center', async (req, res) => {
    const cargo_center = await Cargo_center.find({});
    res.send(cargo_center);
});

// Output of this file
exports.router = router; 