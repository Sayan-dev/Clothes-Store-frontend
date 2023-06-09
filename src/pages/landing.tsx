import { Button, Grid, Theme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import { navigate, RouteComponentProps } from "@reach/router";
import React, { useContext, useEffect, useState } from "react";
import BaseLayout from "../components/appbar/appBar";
import LandingScreen from "../components/landing/landingScreen";
import Sidebar from "../components/landing/sidebar";
import ProductCard from "../components/product/productCard";
import { AuthContext } from "../context/auth-context";
import { loadScript } from "../helpers/loadScript";
import { useHttpClient } from "../hooks/http-hook";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        sidebar: {
            [theme.breakpoints.down("md")]: {
                display: "none",
            },
        },
    })
);

export default function Landing(props: RouteComponentProps) {
    const classes = useStyles();
    const { isLoggedIn } = useContext(AuthContext);

    const { sendRequest } = useHttpClient();
    const [popularItems, setPopularItems] = useState([]);
    const [items, setItems] = useState([]);
    const [state, setState] = useState({
        catagory: { mens: false, womens: false, kids: false },
        slider: {
            min: 200,
            val: 900,
            max: 2000,
        },
    });
    // useEffect(() => {
    //   sendRequest("/")
    // }, [])
    const navigateToCart = () => {
        navigate("/Clothes-Store-frontend/checkout");
        const loadRazorpayScript = async () => {
            await loadScript("https://checkout.razorpay.com/v1/checkout.js");
        };
        loadRazorpayScript();
    };
    useEffect(() => {
        const fetchImages = async () => {
            try {
                const responseData = await sendRequest(
                    `dress/getAllCloths?listType=popular`,
                    "POST",
                    {}
                );
                setPopularItems(responseData.clothes);
            } catch (err) {}
        };
        fetchImages();
    }, []);

    useEffect(() => {
        const fetchImages = async () => {
            const catagoryList: ("mens" | "womens" | "kids")[] = [];
            Object.keys(state.catagory).forEach(
                (cat: "mens" | "womens" | "kids") => {
                    if (state.catagory[cat]) catagoryList.push(cat);
                }
            );
            try {
                const responseData = await sendRequest(
                    `dress/getAllCloths?listType=latest`,
                    "POST",
                    {
                        catagoryList,
                        slider: state.slider,
                    }
                );

                setItems(responseData.clothes);
            } catch (err) {}
        };
        fetchImages();
    }, [state]);

    const rightButtons = [
        isLoggedIn ? (
            <Button
                color="secondary"
                variant="outlined"
                key={"go_to_cart"}
                onClick={navigateToCart}
                sx={{
                    my: 2,
                    mx: 5,
                    display: "block",
                }}
            >
                Go to Cart
            </Button>
        ) : null,
    ];
    const toggleCatagory = (catagory: "mens" | "womens" | "kids") => {
        const newState = { ...state };
        newState.catagory[catagory] = !newState.catagory[catagory];
        setState(newState);
    };
    const toggleSlider = (
        event: Event | React.SyntheticEvent<Element, Event>,
        value: number | number[]
    ) => {
        const newState = { ...state };
        if (typeof value === "number") newState.slider.val = value;
        setState(newState);
    };
    const SideBar = () => (
        <Sidebar
            handleSlider={toggleSlider}
            toggleCatagory={toggleCatagory}
            userState={state}
        />
    );
    const Popular = () => (
        <Grid container direction={"column"} spacing={3}>
            <Grid item>
                <h1>Popular Products</h1>
                <Grid container>
                    {popularItems.map((product) => {
                        return <ProductCard data={product.cloth} />;
                    })}
                </Grid>
            </Grid>
            <Grid item>
                <h1>Latest Fashion</h1>
                <Grid container>
                    {items.map((product) => {
                        return <ProductCard data={product.cloth} />;
                    })}
                </Grid>
            </Grid>
        </Grid>
    );
    return (
        <BaseLayout rightSideButtons={rightButtons} sideBar={[<SideBar />]}>
            <LandingScreen />

            <Grid container>
                <Grid item xs={3} className={classes.sidebar}>
                    <SideBar />
                </Grid>
                <Grid item xs={1}></Grid>
                <Grid item xs={11} md={8}>
                    <Popular />
                </Grid>
            </Grid>
        </BaseLayout>
    );
}
