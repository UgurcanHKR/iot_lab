// importing "react" and "react-router-dom" modules
import React, { useState, useEffect } from 'react'
import {Link, useLocation} from "react-router-dom"

function Overview() {

    // The useLocation hook returns the location object that represents the current URL.
    const location = useLocation()

    // To create states with initial values coming from the previous component
    // These two states refer to selected attributes from the first(Main) page
    const [selectedCargoCenter, setSelectedCargoCenter] = useState(location.state.selectedCargoCenter)
    const [selectedVehicle, setSelectedVehicle] = useState(location.state.selectedVehicle)

    // These four states refer to show the current situation in delivery as an overview
    // Each one are shown at one of the parts in the second(Overview) page and they are initialized by zero
    const [packageLeft, setPackageLeft] = useState(0)
    const [packageTotal, setPackageTotal] = useState(0)
    const [distanceLeft, setDistanceLeft] = useState(0)
    const [distanceTotal, setDistanceTotal] = useState(0)

    // These states refer to the status of buttons and they are initialized by zero
    const [backButtonSwitch, setBackButtonSwitch] = useState(0)
    const [nextButtonSwitch, setNextButtonSwitch] = useState(0)

    // This state refers to be created a delivery list after selecting vehicle and cargo center
    const [deliveryList, setDeliveryList] = useState({})

    // All runs after every render
    useEffect(()=>{ 

        // This function determines the delivery list created by distance calculation based on selected attributes on the first page.
        void async function fetchCargoInfo() {

            // This function fetches data based on this url -/api/cargo_info/center/" + selectedCargoCenter + "/vehicle/" + selectedVehicle-
            // selectedCargoCenter and selectedVehicle are passed from Main.js file
            // The JsonCargoInfo in response is fetched and set cargo_info to setPackageTotal()
            // let's say, based on these two attributes, we have four delivery packages
            const response = await fetch("/api/cargo_info/center/" + selectedCargoCenter + "/vehicle/" + selectedVehicle);
            const JsonCargoInfo = await response.json();
            setPackageTotal(JsonCargoInfo.length);

            // This function fetches data based on this url -/api/cargo_center/" + selectedCargoCenter-
            // selectedCargoCenter is passed from Main.js file
            // The point in response2 is obtained
            const response2 = await fetch("/api/cargo_center/" + selectedCargoCenter);
            let point = await response2.json()

            // A deliveryRoute array is created to save/record to be visited delivery stops
            // These delivery stops are added to this array based on Euclidean distance
            let deliveryRoute = []

            // This function returns a distance value between two points
            // At start point, one of them is cargo_center location and the other one is the nearest one 
            // Euclidean distance are calculated by this function
            const distance = (coor1, coor2) => {
                const x = coor2.loc_x - coor1.loc_x;
                const y = coor2.loc_y - coor1.loc_y;
                return Math.sqrt((x*x) + (y*y));
            };

            // This function determines the minimum distance based on cargo_weight
            // If the cargo_weight is high, the vehicle reaches to the stop in longer time.
            // In here, this relation is made.
            const sortByDistance = (JsonCargoInfo, point) => {
                const sorter = (b, a) => a.cargo_weight/distance(a, point) - b.cargo_weight*distance(b, point);
                JsonCargoInfo.sort(sorter);
            };

            // This code block determines the delivery route based on distance 
            while(JsonCargoInfo.length > 0){

                // This function returns the minimum distance between one of the stops in JsonCargoInfo and point
                sortByDistance(JsonCargoInfo, point)

                // The returned value from distance() function is assigned 
                // to the distance of the first item in JsonCargoInfo list
                JsonCargoInfo[0].distance = distance(JsonCargoInfo[0], point).toFixed(2)

                // the first element of JsonCargoInfo is added to deliveryRoute array
                deliveryRoute.push(JsonCargoInfo[0])

                // Let point the first element of JsonCargoInfo
                point = JsonCargoInfo[0]

                // Remove the first element of JsonCargoInfo
                JsonCargoInfo.splice(0,1)

                // This loop continues until the points of JsonCargoInfo (number of packages) are visited
                // The visited points are removed one by one
            }
            
            // initial values are set to zero for 3 variables
            let packageLeftCount = 0, distanceLeft = 0, distanceTotal = 0;
            
            // From determined delivery route list, both total distance and packageCount are calculated.
            deliveryRoute.forEach(element => {
                
                // To sum each distance in deliveryRoute by parsing it o float
                distanceTotal += parseFloat(element.distance)
                
                // In deliveryRoute, if one of them is not delivered, then packageLeftCount increases
                // distanceLeft is a summation of each element's distance
                if(element.status_id != 3){
                    packageLeftCount++
                    distanceLeft += parseFloat(element.distance)
                }
            })

            // set the states with new values and two of them are used two digits after decimal points.
            setPackageLeft(packageLeftCount)
            setDistanceLeft(distanceLeft.toFixed(2))
            setDistanceTotal(distanceTotal.toFixed(2))
            setDeliveryList(deliveryRoute)

        }();    

    }, []); 

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

    // id = "main" has 4 parts
    // 1. id="pageTitle" refers to only "OVERVIEW"

    // 2. id="packageCountDiv" has two parts; 
        //  "packageLeftDiv" has another two parts;
            //  the label is generated as "REMAINING PACKAGES" and 
            //  id="packageLeft" is called from packageLeft
        //  "packageTotalDiv" has another two parts;
            //  the label is generated as "TOTAL PACKAGES" and     
            //  id="packageTotal" is called from packageTotal
    
    
    // 3. id = "distanceDiv" has two parts; 
        //  "distanceLeftDiv" has another two parts;
            //  the label is generated as "REMAINING DISTANCE(km)" and 
            //  id="distanceLeft" is called from distanceLeft
        //  "distanceTotalDiv" has another two parts;
            //  the label is generated as "TOTAL DISTANCE(km)" and
            //  id="distanceTotal" is called from distanceTotal


     // 4. id="buttonDiv" refers to buttons
        // Based on "backButtonSwitch" value, className is changed by if else statement, it goes TO "/delivery" component
        // Two states are passed with "state" keyword. They are "selectedCargoCenter" and "selectedVehicle"
        // Based on "buttonOnOff" value, className is changed by if else statement, it goes TO "/delivery" component
        
        // When the pointer is ON the button, with {backSwitchOn}, {nextSwitchOn} keyword, the state for the button is set by one, 1 function runs 
        // When the pointer is NOT ON the button, with {backSwitchOff}, {nextSwitchOff} keyword, the state for the button is set by one, 0 function runs
    
        return (
        <div id="main">
            <div id="pageTitle">OVERVIEW</div>
            <div id="packageCountDiv">
                <div id="packageLeftDiv">
                    <div className="mylabel">REMAINING PACKAGES</div>
                    <div id="packageLeft">{packageLeft}</div>
                </div>
                <div id="packageTotalDiv">
                    <div className="mylabel">TOTAL PACKAGES</div>
                    <div id="packageTotal">{packageTotal}</div>
                </div>
            </div>
            <div id="distanceDiv">
                <div id="distanceLeftDiv">
                    <div className="mylabel">REMAINING DISTANCE(km)</div>
                    <div id="distanceLeft">{distanceLeft}</div>
                </div>
                <div id="distanceTotalDiv">
                    <div className="mylabel">TOTAL DISTANCE(km)</div>
                    <div id="distanceTotal">{distanceTotal}</div>
                </div>
            </div>
            <div id="buttonDiv">
                <Link className={backButtonSwitch ? "mybuttonOn" : "mybuttonOff"} to="/" onMouseEnter={backSwitchOn} onMouseLeave={backSwitchOff}>BACK</Link>
                <Link className={nextButtonSwitch ? "mybuttonOn" : "mybuttonOff"} to="/delivery" state={{selectedCargoCenter: selectedCargoCenter, selectedVehicle: selectedVehicle, deliveryList: deliveryList}} onMouseEnter={nextSwitchOn} onMouseLeave={nextSwitchOff}>NEXT</Link>
            </div>
        </div> 
    )
}
export default Overview;