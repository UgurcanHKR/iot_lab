// importing "react", "react-dom", and "react-router-dom" modules
import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// importing output objects from .js files
import Main from "./components/Main";
import Overview from "./components/Overview";
import Delivery from "./components/Delivery";

// If the URL is the exact with "/"", the route is rendered and Main.js runs
// If the URL is the exact with "/overview", the route is rendered and Overview.js runs
// If the URL is the exact with "/delivery", the route is rendered and Delivery.js runs
ReactDOM.render(
    <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" exact element={<Main />}></Route>
                    <Route path="/overview" exact element={<Overview />}> </Route>
                    <Route path="/delivery" exact element={<Delivery />}></Route>
                </Routes>
            </BrowserRouter>  
        </div>,
    document.getElementById("root"))

// As a note, in index.html file, this "root" DOM is called
// because React DOM manages all components in this "root"