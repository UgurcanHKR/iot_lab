import React, { useState, useEffect} from 'react'
import {Link, useLocation} from "react-router-dom"

function Delivery() {
    
    // The useLocation hook returns the location object that represents the current URL.
    const location = useLocation()

    // To create states with initial values coming from the previous component
    // These three states refer to selected attributes from the first and the second pages
    const [selectedVehicle, setSelectedVehicle] = useState(location.state.selectedVehicle)
    const [selectedCargoCenter, setSelectedCargoCenter] = useState(location.state.selectedCargoCenter) 
    const [deliveryList, setDeliveryList] = useState(location.state.deliveryList)   

    // This state refers to whether the delivery completes or not.
    const [completed, setCompleted] = useState(false)

    // These states refer to the status of buttons and they are initialized by zero
    const [backButtonSwitch, setBackButtonSwitch] = useState(0)
    const [nextButtonSwitch, setNextButtonSwitch] = useState(0)

    // These states refer to recipient information
    const [cargoId, setCargoId] = useState(0)
    const [recipient, setRecipient] = useState("")
    const [address, setAddress] = useState("")
    const [distance, setDistance] = useState("") 

    // This function visits in each item in the delivery list
    async function fetchCargoInfo() {

        // To fetch the first item in the delivery list based on cargo_center and vehicle
        if(deliveryList[0].status_id == 1){
            await fetch("/api/delivery_started/center/" + selectedCargoCenter + "/vehicle/" + selectedVehicle);
        }

        // To fetch cargo information based on cargo_center and vehicle
        const response = await fetch("/api/cargo_info/center/" + selectedCargoCenter + "/vehicle/" + selectedVehicle);
        const cargoList = await response.json()

        // This block runs for updating the status_id. 
        // Taken from db, status_id in deliveryList updates.
        cargoList.forEach(element => {
            deliveryList.forEach(c => {
                if(element.cargo_id == c.cargo_id){
                    c.status_id = element.status_id
                }
            })
        })

        // To update deliveryList, this function uses this set function
        setDeliveryList(deliveryList)
        
        // Define a variable named "check"
        var check = true

        // To update each state function, this block runs
        // if the status_id of the first rank in deliveryList equals 2, each state set
        for(var i = 0; i < deliveryList.length; i++){
            const c = deliveryList[i]            
            if(c.status_id == 2){                
                check = false
                setCargoId(c.cargo_id)
                setRecipient(c.recipient_name + " " + c.recipient_surname)
                setAddress(c.recipient_address)
                setDistance(c.distance)
                break
            }
        }

        // After each item in deliveryList is delivered, the operation is completed.
        if(check){
            setCompleted(true)
        }
    };

    // Runs after every render
    useEffect(()=>{
        fetchCargoInfo()
    }, []);


    async function setAsDelivered(){

        // To update the status_id as delivered, with this URL it is updated
        await fetch('/api/delivered/' + cargoId)        
        
        // To assign 3 to the status_id in deliveryList
        deliveryList.forEach(element => {
            if(element.cargo_id == cargoId){
                element.status_id = 3
            }
        })

        // To update deliveryList, this function uses this set function
        setDeliveryList(deliveryList)
        fetchCargoInfo()
    }

    // When the pointer is ON the button, the state for the button is set by one, 1
    function backSwitchOn(){
        setBackButtonSwitch(1)
    }

    // When the pointer is NOT ON the button, the state for the button is set by zero, 0
    function backSwitchOff(){
        setBackButtonSwitch(0)
    }

    // When the pointer is ON the button, the state for the button is set by one, 1
    function nextSwitchOn(){
        setNextButtonSwitch(1)
    }

    // When the pointer is NOT ON the button, the state for the button is set by zero, 0
    function nextSwitchOff(){
        setNextButtonSwitch(0)
    }
 
    // id = "main" has 5 parts
    // 1. id="pageTitle" refers to only "CARGO #{cargoId}"

    // 2. id="cargoNameDiv" has two parts;         
        // the label is generated as "REMAINING PACKAGES" and 
        // the text is generated as {recipient}    
        
    // 3. id="cargoLocationDiv" has another two parts;
        // the label is generated as "ADDRESS" and     
        // the text is generated as {address}  

    // 4. id="cargoDistanceDiv" has another two parts;
        // the label is generated as "REMAINING DISTANCE(km)" and     
        // the text is generated as {distance}   

    // 5. id="buttonDiv" has another two parts;
        // backButtonSwitch goes TO overview page, and passes 3 states, and onMouseEnter(), onMouseLeave() functions are added     
        // nextButtonSwitch is clicked, and onMouseEnter(), onMouseLeave() and onClick={setAsDelivered} functions are added     

    function deliveryNotCompleted(){
        return(
            <div id="main">
                <div id="pageTitle">CARGO #{cargoId}</div>
                <div id="cargoNameDiv">
                    <div className="mylabel">RECIPIENT</div>
                    <div className="mytext" style={{fontSize: "32px"}}>{recipient}</div>            
                </div>
                <hr />
                <div id="cargoLocationDiv">
                    <div className="mylabel">ADDRESS</div>
                    <div className="mytext">{address}</div>
                </div>
                <hr />
                <div id="cargoDistanceDiv">
                    <div className="mylabel">REMAINING DISTANCE(km)</div>
                    <div className="mytext">{distance}</div>
                </div> 
                <hr />       
                <div id="buttonDiv">
                    <Link className={backButtonSwitch ? "mybuttonOn" : "mybuttonOff"} to="/overview" state={{selectedCargoCenter: selectedCargoCenter, selectedVehicle: selectedVehicle, deliveryList: deliveryList}} style={{padding: "0px 5%",marginLeft: "2%",marginRight: "2%"}} onMouseEnter={backSwitchOn} onMouseLeave={backSwitchOff}>BACK</Link>
                    <button className={nextButtonSwitch ? "mybuttonOn" : "mybuttonOff"} style={{padding: "0px 5%",marginLeft: "2%",marginRight: "2%"}} onMouseEnter={nextSwitchOn} onMouseLeave={nextSwitchOff} onClick={setAsDelivered}>DELIVERED</button>               
                </div>
            </div>
        )        
    }

    // id = "main" has 3 parts
    // 1. id="pageTitle" refers to only "CARGO"

    // 2. "DELIVERY COMPLETED"  
        
    // 3. id="buttonDiv" has another two parts;
        // backButtonSwitch goes TO overview page
        // onMouseEnter(), onMouseLeave() functions are added 

    function deliveryCompleted(){
        return(
            <div id="main">
                <div id="pageTitle">CARGO</div>
                <div style={{fontSize: "64px",height: "67%",position: "relative"}}>
                    <div style={{top: "50%",left: "50%",transform: "translate(-50%, -50%)",position: "absolute",}}>DELIVERY COMPLETED</div>
                </div>
                <hr />       
                <div id="buttonDiv">
                    <Link className={backButtonSwitch ? "mybuttonOn" : "mybuttonOff"} to="/overview" style={{padding: "0px 5%",marginLeft: "2%",marginRight: "2%"}} onMouseEnter={backSwitchOn} onMouseLeave={backSwitchOff}>BACK</Link>                    
                </div>
            </div>
        )
    }

    // This tag has if else statement and it returns based on the completion of delivery
    return (
        <div id="main">
            {completed ? deliveryCompleted() : deliveryNotCompleted()}
        </div>
    )
}

export default Delivery;
