// Importing mongoose module
const mongoose = require('mongoose');

// Importing collections to this file from ....model.js
const { Cargo_center } = require('./api/models/cargo_center.model');
const { Cargo_info } = require('./api/models/cargo_info.model');
const { Cargo_status } = require('./api/models/cargo_status.model');
const { Vehicle } = require('./api/models/vehicle.model');
 
// This function connects to mongodb and inserted data to Cargo database
exports.connectToDatabase = async function() {

    // Connection is established by my credentials
    await mongoose.connect("mongodb+srv://dbUser:ruCnY2RhMs9JuOJ5@cluster0.tt2bl.mongodb.net/Cargo?retryWrites=true&w=majority");

    // To get the count value of Cargo_center
    const cargo_centerCount = await Cargo_center.count();

    // To check the count value of Cargo_center
    if(cargo_centerCount === 0){

        // This "create" function inserts a document 
        // This document contains 4 fields; "center_id", "center_name", "loc_x", "loc_y"
        Cargo_center.create({center_id: 1, center_name: "Malmo", loc_x: 55.59, loc_y: 13.02});
        Cargo_center.create({center_id: 2, center_name: "Skelleftea", loc_x: 59.27, loc_y: 15.2});
        Cargo_center.create({center_id: 3, center_name: "Orebro", loc_x: 64.65, loc_y: 20.85});
        
        
        // Print a message to console
        console.log("The new data samples are added to Cargo_center");
    }else{
        // Print a message to console
        console.log("There are enough data samples in Cargo_center: " + cargo_centerCount);
    }

    // Print the count value of Cargo_info
    const cargo_infoCount = await Cargo_info.count();
    
    // To check the count value of Cargo_info 
    if(cargo_infoCount === 0){

        // This "create" function inserts a document 
        // This document contains 10 fields; "cargo_id", "center_id", "vehicle_id", "cargo_weight", "status_id", "recipient_name", "recipient_surname", "recipient_address", "loc_x", "loc_y"
        Cargo_info.create({cargo_id: 2, center_id: 2, vehicle_id: 1, cargo_weight: 1.389, status_id: 1, recipient_name: "Carolin", recipient_surname: "Ström", recipient_address: "Helsingborg", loc_x: 56.04, loc_y: 12.72})
        Cargo_info.create({cargo_id: 4, center_id: 3, vehicle_id: 1, cargo_weight: 1.078, status_id: 1, recipient_name: "Gunnar", recipient_surname: "Gustavsson", recipient_address: "Umeå", loc_x: 63.83, loc_y: 20.27})
        Cargo_info.create({cargo_id: 11, center_id: 2, vehicle_id: 1, cargo_weight: 0.558, status_id: 1, recipient_name: "Lars", recipient_surname: "Bergström", recipient_address: "Jönköping", loc_x: 57.78, loc_y: 14.17})
        Cargo_info.create({cargo_id: 14, center_id: 1, vehicle_id: 1, cargo_weight: 0.073, status_id: 1, recipient_name: "Hans", recipient_surname: "Nyström", recipient_address: "Norrköping", loc_x: 58.59, loc_y: 16.19})
        Cargo_info.create({cargo_id: 15, center_id: 1, vehicle_id: 1, cargo_weight: 0.128, status_id: 1, recipient_name: "Hakan", recipient_surname: "Oak", recipient_address: "Karlstad", loc_x: 59.38, loc_y: 13.5})
        Cargo_info.create({cargo_id: 16, center_id: 1, vehicle_id: 1, cargo_weight: 0.298, status_id: 1, recipient_name: "Karolina", recipient_surname: "Ström", recipient_address: "Sundsvall", loc_x: 62.39, loc_y: 17.31})
        Cargo_info.create({cargo_id: 20, center_id: 2, vehicle_id: 1, cargo_weight: 0.141, status_id: 1, recipient_name: "Elias", recipient_surname: "Olsson", recipient_address: "Gävle", loc_x: 60.67, loc_y: 17.17})
        Cargo_info.create({cargo_id: 1, center_id: 1, vehicle_id: 2, cargo_weight: 0.713, status_id: 1, recipient_name: "Johan", recipient_surname: "Forsberg", recipient_address: "Borås", loc_x: 57.73, loc_y: 12.92})
        Cargo_info.create({cargo_id: 5, center_id: 1, vehicle_id: 2, cargo_weight: 0.875, status_id: 1, recipient_name: "Kjell", recipient_surname: "Dahl", recipient_address: "Växjö", loc_x: 56.88, loc_y: 14.82})
        Cargo_info.create({cargo_id: 6, center_id: 2, vehicle_id: 2, cargo_weight: 1.111, status_id: 1, recipient_name: "Johannes", recipient_surname: "Hassan", recipient_address: "Halmstad", loc_x: 56.68, loc_y: 12.86})
        Cargo_info.create({cargo_id: 7, center_id: 3, vehicle_id: 2, cargo_weight: 1.125, status_id: 1, recipient_name: "Henrik", recipient_surname: "Ekström", recipient_address: "Luleå", loc_x: 65.58, loc_y: 22.19})
        Cargo_info.create({cargo_id: 8, center_id: 1, vehicle_id: 2, cargo_weight: 0.588, status_id: 1, recipient_name: "David", recipient_surname: "Lundström", recipient_address: "Östersund", loc_x: 63.18, loc_y: 14.64})
        Cargo_info.create({cargo_id: 12, center_id: 2, vehicle_id: 2, cargo_weight: 0.816, status_id: 1, recipient_name: "John", recipient_surname: "Svensson", recipient_address: "Trollhättan", loc_x: 58.27, loc_y: 12.3})
        Cargo_info.create({cargo_id: 13, center_id: 2, vehicle_id: 2, cargo_weight: 0.261, status_id: 1, recipient_name: "Simon", recipient_surname: "Sundberg", recipient_address: "Kalmar", loc_x: 56.67, loc_y: 16.32})
        Cargo_info.create({cargo_id: 19, center_id: 1, vehicle_id: 2, cargo_weight: 0.504, status_id: 1, recipient_name: "Rolf", recipient_surname: "Andersson", recipient_address: "Borlänge", loc_x: 60.48, loc_y: 15.42})
        Cargo_info.create({cargo_id: 3, center_id: 1, vehicle_id: 3, cargo_weight: 0.84, status_id: 1, recipient_name: "Johnny", recipient_surname: "Arvidsson", recipient_address: "Mölndal", loc_x: 57.65, loc_y: 12.01})
        Cargo_info.create({cargo_id: 9, center_id: 3, vehicle_id: 3, cargo_weight: 0.697, status_id: 1, recipient_name: "Henrik", recipient_surname: "Palsson", recipient_address: "Falun", loc_x: 60.61, loc_y: 15.65})
        Cargo_info.create({cargo_id: 10, center_id: 3, vehicle_id: 3, cargo_weight: 0.13, status_id: 1, recipient_name: "Erik", recipient_surname: "Sandberg", recipient_address: "Karlskrona", loc_x: 56.16, loc_y: 15.59})
        Cargo_info.create({cargo_id: 17, center_id: 2, vehicle_id: 3, cargo_weight: 1.224, status_id: 1, recipient_name: "Rune", recipient_surname: "Lundin", recipient_address: "Nyköping", loc_x: 58.76, loc_y: 17.02})
        Cargo_info.create({cargo_id: 18, center_id: 3, vehicle_id: 3, cargo_weight: 0.523, status_id: 1, recipient_name: "Kjell", recipient_surname: "Lundin", recipient_address: "Kristianstad", loc_x: 56.03, loc_y: 14.13})
        
        // Print a message to console
        console.log("The new data samples are added to Cargo_info");
    }else{

        // Print a message to console
        console.log("There are enough data samples in Cargo_info: " + cargo_infoCount);
    }

    // To check the count value of Cargo_status 
    const cargo_statusCount = await Cargo_status.count();

    // Print the count value of Cargo_status
    if(cargo_statusCount === 0){

        // This "create" function inserts a document 
        // This document contains 2 fields; "status_id", "status_name"
        Cargo_status.create({status_id: 1, status_name: "The package is at the cargo center."})
        Cargo_status.create({status_id: 2, status_name: "The package is out for delivery."})
        Cargo_status.create({status_id: 3, status_name: "The package has been delivered."})
        
        // Print a message to console
        console.log("The new data samples are added to Cargo_status");
    }else{

        // Print a message to console
        console.log("There are enough data samples in Cargo_status: " + cargo_statusCount);
    }

    // To check the count value of Vehicle 
    const vehicleCount = await Vehicle.count();

    // Print the count value of Vehicle
    if(vehicleCount === 0){

        // This "create" function inserts a document 
        // This document contains 2 fields; "vehicle_id", "vehicle_name"
        Vehicle.create({vehicle_id: 1, vehicle_name: "Compact van"})
        Vehicle.create({vehicle_id: 2, vehicle_name: "Van"})
        Vehicle.create({vehicle_id: 3, vehicle_name: "Van (extra-long)"})
        
        // Print a message to console
        console.log("The new data samples are added to Vehicle");
    }else{

        // Print a message to console
        console.log("There are enough data samples in Vehicle: " + vehicleCount);
    }

};