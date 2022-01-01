// importing "react" and "react-router-dom" modules
import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom"

function Main() {

    // To create states with initial values -zero-
    // These two states refer to selected attributes from the first(Main) page
    const [selectedCargoCenter, setSelectedCargoCenter] = useState(0)
    const [selectedVehicle, setSelectedVehicle] = useState(0)

    // These two states refer to show all vehicles or cargoCenters in the first(Main) page
    // These vehicles or cargoCenters are shown in combobox in the first(Main) page
    const [vehicles, setVehicles] = useState([])
    const [cargoCenters, setCargoCenters] = useState([])

    // This state refers to the status of button
    const [buttonOnOff, setButtonOnOff] = useState(0)

    // Two functions run and set two states after every render
    useEffect(()=>{
        fetchVehicles().then(setVehicles)
        fetchCargoCenter().then(setCargoCenters)
    }, []);

    // This function fetches data based on this url -/api/vehicle-
    // The data in response is fetched and set the index of the first item to SelectedVehicle()
    async function fetchVehicles() {
        const response = await fetch("/api/vehicle");
        const data = await response.json();
        setSelectedVehicle(data[0].vehicle_id)
        return data
    };

    // This function fetches data based on this url -/api/cargo_center-
    // The data in response is fetched and set the index of the first item to setSelectedCargoCenter()
    async function fetchCargoCenter() {
        const response = await fetch("/api/cargo_center");
        const data = await response.json();
        setSelectedCargoCenter(data[0].center_id)        
        return data
    };
    
    // This function returns and sets the value of SELECTED city in combobox
    function handleCityChange(event){
        setSelectedCargoCenter(event.target.value)
    }

    // This function returns and sets the value of SELECTED vehicle in combobox
    function handleVehicleChange(event){
        setSelectedVehicle(event.target.value)
    }

    // When the pointer is ON the button, the state for the button is set by one, 1
    function buttonSwitchOn(){
        setButtonOnOff(1)
    }

    // When the pointer is NOT ON the button, the state for the button is set by zero, 0
    function buttonSwitchOff(){
        setButtonOnOff(0)
    }

    // id = "main" has 4 parts
    // 1. id="pageTitle" refers to only "MAIN"
    // 2. id="cityDiv" has two parts; 
        //  "citySpanDiv" refers to "CITY" and 
        //  "cityComboDiv" refers to combobox, first option is disabled(Choose City), and each cargo_center is added and label of it is written by {c.center_name}
    // 3. id="vehicleDiv" refers to only "MAIN"
        //  "vehicleSpanDiv" refers to "VEHICLE" and 
        //  "vehicleComboDiv" refers to combobox, first option is disabled(Choose Vehicle), each vehicle is added and label of it is written by {v.vehicle_name} 
    // 4. id="buttonDiv" refers to button
        // Based on "buttonOnOff" value, className is changed by if else statement, it goes TO "/overview" component
        // Two states are passed with "state" keyword. They are "selectedCargoCenter" and "selectedVehicle"
        // When the pointer is ON the button, with {buttonSwitchOn} keyword, buttonSwitchOn() function runs
        // When the pointer is NOT ON the button, with {buttonSwitchOff} keyword, buttonSwitchOff() function runs
    return (
        <div id="main">
            <div id="pageTitle">MAIN</div>
            <div id="cityDiv">
                <div id="citySpanDiv">
                    <span>CITY</span>
                </div>
                <div id="cityComboDiv">
                    <select onChange={handleCityChange} id="citySelect" defaultValue="0">
                        <option disabled>Choose City</option>
                        {cargoCenters.map((c) =>   
                            <option key={c.center_id} value={c.center_id}>{c.center_name}</option> 
                        )}
                    </select>    
                </div>
            </div>
            <div id="vehicleDiv">
                <div id="vehicleSpanDiv">
                    <span>VEHICLE</span>
                </div>
                <div id="vehicleComboDiv">
                    <select onChange={handleVehicleChange} id="vehicleSelect" defaultValue="0">
                        <option disabled>Choose Vehicle</option>
                        {vehicles.map((v) =>     
                            <option key={v.vehicle_id} value={v.vehicle_id}>{v.vehicle_name}</option> 
                        )}
                    </select>    
                </div>
            </div>
            <div id="buttonDiv">
                <Link className={buttonOnOff ? "mybuttonOn" : "mybuttonOff"} to="/overview" state={{selectedCargoCenter: selectedCargoCenter, selectedVehicle: selectedVehicle}} onMouseEnter={buttonSwitchOn} onMouseLeave={buttonSwitchOff}>NEXT</Link>
            </div>
        </div>
    )
}

export default Main; 