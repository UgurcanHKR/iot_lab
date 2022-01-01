// Importing mongoose module
const mongoose = require('mongoose');

// Define a schema in mongodb to collect data based on this schema
const vehicleSchema = new mongoose.Schema({
    id: mongoose.SchemaTypes.ObjectId,
    vehicle_id: Number,
    vehicle_name: String,
    vehicle_cargosize: Number,
    vehicle_volume: Number,
    fuel_consumption: Number,
});

// Output of this file and returns a collection in mongodb whose name is Vehicle
exports.schema = vehicleSchema;
exports.Vehicle = mongoose.model('Vehicle', vehicleSchema);
