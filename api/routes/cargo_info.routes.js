// Importing express module to create a Router
const router = require('express').Router();

// Importing Cargo_info collection to this file from ....model.js
const { Cargo_info } = require('../models/cargo_info.model');

// This GET function runs only if this url -'/api/cargo_info/center/:center_id/vehicle/:vehicle_id'- is called. 
// :center_id and :vehicle_id means it's variable/parameter
// It returns SELECTED center_id and vehicle_id from Cargo_info collection
router.get('/api/cargo_info/center/:center_id/vehicle/:vehicle_id', async (req, res) => {
    const cargo_info = await Cargo_info.find({"center_id" : req.params.center_id, "vehicle_id" : req.params.vehicle_id});
    res.send(cargo_info);
});

// This GET function runs only if this url -'/api/delivery_started/center/:center_id/vehicle/:vehicle_id'- is called. 
// :center_id and :vehicle_id means it's variable/parameter
// It updates status_id = 2 of MANY SELECTED documents based on center_id and vehicle_id from Cargo_info collection
router.get('/api/delivery_started/center/:center_id/vehicle/:vehicle_id', async(req, res) => {
    const updateMany = await Cargo_info.updateMany({ "center_id": req.params.center_id, "vehicle_id": req.params.vehicle_id }, { $set: { "status_id": 2 }})
    res.send(updateMany)
});

// This GET function runs only if this url -'/api/delivered/:cargo_id'- is called. :cargo_id means it's variable/parameter
// It updates status_id = 3 of ONE SELECTED documents based on cargo_id from Cargo_info collection
router.get('/api/delivered/:cargo_id', async(req, res) => {
    const delivered = await Cargo_info.updateOne({ "cargo_id": req.params.cargo_id}, {$set: {"status_id": 3}})
    res.send(delivered)
})

// Output of this file
exports.router = router; 
