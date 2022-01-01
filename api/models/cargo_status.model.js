// Importing mongoose module
const mongoose = require('mongoose');

// Define a schema in mongodb to collect data based on this schema
const cargostatusSchema = new mongoose.Schema({
    id: mongoose.SchemaTypes.ObjectId,
    status_id: Number,
    status_name: String
});

// Output of this file and returns a collection in mongodb whose name is Cargo_status
exports.schema = cargostatusSchema;
exports.Cargo_status = mongoose.model('Cargo_status', cargostatusSchema);

