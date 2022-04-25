import { Button, Grid } from "@mui/material";
import { navigate, RouteComponentProps } from "@reach/router";
import React, { useEffect, useState } from "react";
import BaseLayout from "../components/appbar/appBar";
import LandingScreen from "../components/landing/landingScreen";
import Sidebar from "../components/landing/sidebar";
import ProductCard from "../components/product/productCard";
import { loadScript } from "../helpers/loadScript";
import { useHttpClient } from "../hooks/http-hook";
import { useAppDispatch } from "../redux/hooks";
import { addCartItem } from "../redux/services/cart";
import { setCanvasState } from "../redux/services/editor";
import { CompanyDress } from "../types/dress";

export default function Landing(props: RouteComponentProps) {
    const { isLoading, sendRequest, error } = useHttpClient();
    const [items, setItems] = useState([]);
    const [state, setState] = useState({
        catagory:{"mens":true,"womens":false,"kids":false},
        slider:{
            min:200,
            val:500,
            max:2000
        }
    })
    // useEffect(() => {
    //   sendRequest("/")
    // }, [])
    const dispatch = useAppDispatch();
    const navigateToCart = () => {
        navigate("/checkout");
        const loadRazorpayScript = async () => {
            await loadScript("https://checkout.razorpay.com/v1/checkout.js");
        };
        loadRazorpayScript();
    };
    useEffect(() => {
        const fetchImages = async () => {
            const catagoryList:("mens" | "womens" | "kids")[] = []
            Object.keys(state.catagory).forEach((cat:"mens" | "womens" | "kids")=>{
                if(state.catagory[cat])catagoryList.push(cat)
            })
            try {
                const responseData = await sendRequest(`dress/getAllCloths`,"POST",{
                    catagoryList,
                    slider:state.slider
                });

                setItems(responseData.clothes);
            } catch (err) {}
        };
        fetchImages();
    }, [state]);

    const rightButtons = [
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
        </Button>,
    ];
    const toggleCatagory = (catagory:"mens" | "womens" | "kids")=>{
        const newState = {...state}
        newState.catagory[catagory] = !newState.catagory[catagory]
        setState(newState)

    }
    const toggleSlider = (event:Event | React.SyntheticEvent<Element, Event>, value:number | number[])=>{
        const newState = {...state}
        if(typeof value==='number')
            newState.slider.val = value
        setState(newState)

    }
    const SideBar = () => <Sidebar handleSlider={toggleSlider} toggleCatagory={toggleCatagory} userState={state}/>;
    const Popular = () => (
        <Grid container direction={"column"} spacing={3}>
            <Grid item>
                <h1>Popular Products</h1>
                <Grid container>
                    {items.map((product) => {
                        console.log(product);

                        return <ProductCard data={product.cloth} />;
                    })}
                </Grid>
            </Grid>
            <Grid item>
                <h1>Latest Fashion</h1>
                <Grid container>
                    {items.map((product) => {
                        console.log(product);

                        return <ProductCard data={product.cloth} />;
                    })}
                </Grid>
            </Grid>
        </Grid>
    );
    return (
        <BaseLayout rightSideButtons={rightButtons}>
            <LandingScreen />

            <Grid container>
                <Grid item xs={3}>
                    <SideBar />
                </Grid>
                <Grid item xs={1}></Grid>
                <Grid item xs={8}>
                    <Popular />
                </Grid>
            </Grid>
        </BaseLayout>
    );
}
