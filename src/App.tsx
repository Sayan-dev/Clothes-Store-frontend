import { Redirect, Router } from "@reach/router";
import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "./App.css";
import { AuthContext } from "./context/auth-context";
import { useAuth } from "./hooks/useAuth";
import Auth from "./pages/auth";
import Checkout from "./pages/checkout";
import Collection from "./pages/collection";
import Landing from "./pages/landing";
import Order from "./pages/order";
import { persistor, store } from "./redux/store";

function App() {
    const { token, login, logout, user } = useAuth();
    let routes;

    if (!!token) {
        routes = (
            <Router>
                <Redirect noThrow from="*" to="/Clothes-Store-frontend/" />
                <Landing path="/Clothes-Store-frontend/" />
                {/* <NewDress path="/new" /> */}
                <Collection path="/Clothes-Store-frontend/collection" />
                {/* <Edit collectionId="" path="/edit/:collectionId"/> */}
                <Checkout path="/Clothes-Store-frontend/checkout" />
                <Order path="/Clothes-Store-frontend/orders" />
            </Router>
        );
    } else {
        routes = (
            <Router>
                <Redirect noThrow from="*" to="/Clothes-Store-frontend/" />
                <Landing path="/Clothes-Store-frontend/" />
                <Auth path="/Clothes-Store-frontend/auth" />
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
