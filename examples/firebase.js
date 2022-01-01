/*
  Copyright (c) 2010 - 2017, Nordic Semiconductor ASA
  All rights reserved.
  Redistribution and use in source and binary forms, with or without modification,
  are permitted provided that the following conditions are met:
  1. Redistributions of source code must retain the above copyright notice, this
     list of conditions and the following disclaimer.
  2. Redistributions in binary form, except as embedded into a Nordic
     Semiconductor ASA integrated circuit in a product or a software update for
     such product, must reproduce the above copyright notice, this list of
     conditions and the following disclaimer in the documentation and/or other
     materials provided with the distribution.
  3. Neither the name of Nordic Semiconductor ASA nor the names of its
     contributors may be used to endorse or promote products derived from this
     software without specific prior written permission.
  4. This software, with or without modification, must only be used with a
     Nordic Semiconductor ASA integrated circuit.
  5. Any software provided in binary form under this license must not be reverse
     engineered, decompiled, modified and/or disassembled.
  THIS SOFTWARE IS PROVIDED BY NORDIC SEMICONDUCTOR ASA "AS IS" AND ANY EXPRESS
  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
  OF MERCHANTABILITY, NONINFRINGEMENT, AND FITNESS FOR A PARTICULAR PURPOSE ARE
  DISCLAIMED. IN NO EVENT SHALL NORDIC SEMICONDUCTOR ASA OR CONTRIBUTORS BE
  LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
  CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
  HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
  LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT
  OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
 
var Thingy = require('../index');
var util = require('util');
var firebase = require('firebase');
var thingy_id;

var firebase_login = {
    email : "iotgroup@gmail.com",
    pass : "iotgroup"
};
/*var firebase_login = {
    email : "iotgroup1@gmail.com",
    pass : "iotgroup1"
};
var firebase_config = {
  apiKey: "AIzaSyC35Pbu3NXZ26ma3ZUnftl7_SzectjZj_c",
  authDomain: "iot-group-db.firebaseapp.com",
  databaseURL: "https://iot-group-db-default-rtdb.firebaseio.com",
  storageBucket: "iot-group-db.appspot.com",
  projectId: "iot-group-db",
};*/

var firebase_config = {
    apiKey: "AIzaSyDmBJgRYUJtQC3oCY3G9Q36Nycsxp3keWg",
    authDomain: "my-firebase-db-1e407-default-rtdb.firebaseapp.com",
    databaseURL: "https://my-firebase-db-1e407-default-rtdb.europe-west1.firebasedatabase.app",
    storageBucket: "my-firebase-db-1e407-default-rtdb.appspot.com",
    
  };
  //projectId: "my-firebase-db-1e407",
// databaseURL: "https://my-firebase-db-1e407.firebaseio.com",
//databaseURL: "https://iot-group-db-default-rtdb.europe-west1.firebasedatabase.app"
//databaseURL: "https://iot-group-db-default-rtdb.firebaseio.com",
//databaseURL: "https://iot-group-db.firebaseio.com",
//databaseURL: "https://my-firebase-db-1e407.firebaseio.com",
//databaseURL: "https://my-firebase-db-1e407.europe-west1.firebasedatabase.app",
// databaseURL: "https://my-firebase-db-1e407-default-rtdb.firebaseio.com",

var database;
var this_thingy;
var sigint = false;
var current_temp = 0;

process.on('SIGINT', function () {
    sigint = true;
    console.log('Firebase signing out :');
    firebase.auth().signOut().then(function() {
        console.log('Firebase signed out!');
    }).catch(function(error) {
        console.log('Firebase sign out failed: ' + error.code + ' -' + error.message);
    });

    this_thingy.gas_disable(function(error) {
        console.log('Gas sensor stopped! ' + ((error) ? error : ''));
        this_thingy.disconnect(function(error){
            console.log('Disconnected: ' + ((error) ? error : ''));
            process.exit(1);
        });
    });
});

/*function firebaseWriteGasData(gas, temperature) {
    var date  = new Date()
    var ISOString = date.toISOString();
    var timestamp = ISOString.split('T')[0] + '/' + ISOString.split('T')[1].split('Z')[0].replace('.', '_');
    console.log(timestamp); 
    set(ref(firebase.database(), 'thingy/' + thingy_id + '/' + timestamp),{
        eco2: gas.eco2,
        tvoc: gas.tvoc,
        temp: temperature
    });
}*/
function firebaseWriteGasData(gas, temperature) {
    var date  = new Date()
    var ISOString = date.toISOString();
    var timestamp = ISOString.split('T')[0] + '/' + ISOString.split('T')[1].split('Z')[0].replace('.', '_');
    console.log(timestamp); 
    firebase.database().ref('thingy/' + thingy_id + '/' + timestamp).set({
        eco2: gas.eco2,
        tvoc: gas.tvoc,
        temp: temperature
    });
}

function onGasSensorData(gas) {
    console.log('Gas sensor: eCO2 ' + gas.eco2 + ' - TVOC ' + gas.tvoc )
    firebaseWriteGasData(gas, current_temp);
}

function onTemperatureData(temperature) {
    current_temp = temperature;
    console.log(current_temp)
}

function connectAndEnableGas(thingy) {
    thingy_id = thingy.id;
    this_thingy = thingy;
    thingy.connectAndSetUp(function(error) {
        console.log('Connected! ' + ((error) ? error : ''));
        thingy.gas_mode_set(3, function(error) {
            console.log('Gas sensor configured! ' + ((error) ? error : ''));
        });
        thingy.temperature_interval_set(5000, function(error) {
            if (error) {
                console.log('Temperature sensor configure! ' + error);
            }
        });
        thingy.gas_enable(function(error) {
            console.log('Gas sensor started! ' + ((error) ? error : ''));
        });
        thingy.temperature_enable(function(error) {
            console.log('Temperature sensor started! ' + ((error) ? error : ''));
        });
    });
}

function onDiscover(thingy) {
    console.log('Discovered: ' + thingy);

    thingy.on('disconnect', function() {
        if (!sigint) {
            console.log('Disconnected! Trying to reconnect');
            connectAndEnableGas(this);
        }
    });
    thingy.on('gasNotif', onGasSensorData);
    thingy.on('temperatureNotif', onTemperatureData);
    connectAndEnableGas(thingy);
}

console.log('Firebase Thingy gas sensor!');

process.argv.forEach(function(val, index, array){
    if (val == '-a') {
        if (process.argv[index + 1]) {
            thingy_id = process.argv[index + 1];
        }
    }
});

firebase.initializeApp(firebase_config);

console.log('Firebase signing in as: ' + firebase_login.email);
firebase.auth().signInWithEmailAndPassword(firebase_login.email, firebase_login.pass).catch(function(error) {
    // Handle Errors here.
    console.log('Firebase sign in failed: ' + error.code + ' -' + error.message);
});

// Get a reference to the database service
database = firebase.database();

if (!thingy_id) {
    Thingy.discover(onDiscover);
}
else {
    Thingy.discoverById(thingy_id, onDiscover);
}
