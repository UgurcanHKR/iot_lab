// Importing mongoose module
const mongoose = require('mongoose');

// Define a schema in mongodb to collect data based on this schema
const cargocenterSchema = new mongoose.Schema({
    id: mongoose.SchemaTypes.ObjectId,
    center_id: Number,
    center_name: String,
    loc_x: Number,
    loc_y: Number,
});

// Output of this file and returns a collection in mongodb whose name is Cargo_center
exports.schema = cargocenterSchema;
exports.Cargo_center = mongoose.model('Cargo_center', cargocenterSchema);
