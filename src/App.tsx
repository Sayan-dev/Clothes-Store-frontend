import { Button } from "@mui/material";
import { Redirect, Router } from "@reach/router";
import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "./App.css";
import AppBar from "./components/appbar/appBar";
import { AuthContext } from "./context/auth-context";
import { useAuth } from "./hooks/useAuth";
import Auth from "./pages/auth";
import Checkout from "./pages/checkout";
import Collection from "./pages/collection";
import NewDress from "./pages/create";
import Edit from "./pages/edit";
import Home from "./pages/home";
import Landing from "./pages/landing";
import Order from "./pages/order";
import { persistor, store } from "./redux/store";

function App() {
    const { token, login, logout, user } = useAuth();
    let routes;
    console.log(token);
    
    if(!!token){routes = (
        <Router>
            <Redirect noThrow from="*" to="/" />
            <Landing  path="/"/>
            {/* <NewDress path="/new" /> */}
            <Collection path="/collection"/>
            {/* <Edit collectionId="" path="/edit/:collectionId"/> */}
            <Checkout path="/checkout"/>
            <Order path="/orders"/>
        </Router>
    );} else {
        routes = (
            <Router>
                <Redirect noThrow from="*" to="/auth" />
                <Auth path="/auth" />
            </Router>
        );
    }

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn: !!token,
                token: token,
                user,
                login: login,
                logout: logout,
            }}
        >
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    {routes}
                </PersistGate>
            </Provider>
        </AuthContext.Provider>
    );
}

export default App;
