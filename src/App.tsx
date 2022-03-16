import { Button } from "@mui/material";
import { Redirect, Router } from "@reach/router";
import React from "react";
import "./App.css";
import AppBar from "./components/appbar/appBar";
import NewDress from "./pages/create";
import Home from "./pages/home";

function App() {
    return (
        <>
            <Router>
                <Redirect noThrow from="*" to="/new" />
                <NewDress path="/new" />
            </Router>
        </>
    );
}

export default App;
