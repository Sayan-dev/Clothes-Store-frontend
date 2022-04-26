import { navigate, RouteComponentProps } from "@reach/router";
import BaseLayout from "../components/appbar/appBar";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
    Box,
    Button,
    Grid,
    Paper,
    TextField,
    Theme,
    Typography,
} from "@mui/material";
import { useAppSelector } from "../redux/hooks";
import CheckoutItem from "../components/checkout/checkoutItems";
import BillDetails, {
    BillDetailsType,
} from "../components/checkout/billDetails";
import { useHttpClient } from "../hooks/http-hook";
import { AuthContext } from "../context/auth-context";
import { createStyles, makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        dressPreview: {

            "& img": {
                width: "20em",
                height: "20em",
                padding: "2em",
                margin: "2em 0",
                boxShadow: "0 0 5em #e1e1e1",
            },
        },
        infoForm: {
            width: "100%",
            padding: "2em 2em 1em 4em",

            "& .MuiGrid-item": {
                padding: "1em 1em 1em 1em",
            },
            [theme.breakpoints.down('md')]:{
                paddingLeft:"0em",


            }
        },
        items:{
            paddingLeft:"5.5em",
            [theme.breakpoints.down('md')]:{
                paddingLeft:"1em",


            }
        }
    })
);
export default function Checkout(props: RouteComponentProps) {
    const classes = useStyles();
    const { final_image } = useAppSelector(
        (state) => state.canvasReducer
    );
    const { items, amount } = useAppSelector(
        (state) => state.cartReducer
    );
    const { user, token } = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [billStructure, setBillStructure] = useState<BillDetailsType>(null);
    const [infoState, setInfoState] = useState<any>({});
    const navigateToNew = () => {
        navigate("/new");
    };
    const navigateToOrders = () => {
        navigate("/orders");
    };
    const checkBookingStatus = (orderId: string) => {
        console.log("Booked Successfully", appBarButtons);
    };
    const itemsArr = Object.keys(items).map((key)=>{
        return items[key]
    })
    const onPayHandler = async (event: React.FormEvent | any) => {
        event.preventDefault();
        console.log(event.target["address"].value);

        const orderDetail = await sendRequest(
            "/users/generateOrder",
            "POST",
            {
                amount,
                items:itemsArr,
                address: event.target["address"].value,
                email: event.target["email"].value,
                phoneNo: event.target["phoneNo"].value,
            },
            {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        );
        const options = {
            key: process.env.REACT_APP_RAZORPAY_KEY,
            currency: orderDetail.currency,
            amount: orderDetail.amount,
            name: "ClothesStore",
            description: "Order Payment",
            order_id: orderDetail.id,
            handler: function () {
                checkBookingStatus(orderDetail.id);
            },
            prefill: {
                name: user.name,
                email: user?.email,
            },
        };
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    };

    useEffect(() => {
        const getBillDetails = async (amount: number) => {
            const newBillStructure = await sendRequest(
                `payments/getBillDetails?amount=${amount}`,
                "GET"
            );
            setBillStructure(newBillStructure);
        };
        getBillDetails(amount);
    }, [amount]);
    const appBarButtons = [
        <Button
            color="secondary"
            variant="outlined"
            key={"Home"}
            onClick={navigateToNew}
            sx={{
                my: 2,
                mx: 5,
                display: "block",
            }}
        >
            Home
        </Button>,
        <Button
            color="secondary"
            variant="outlined"
            key={"Your_Orders"}
            onClick={navigateToOrders}
            sx={{
                my: 2,
                mx: 5,
                display: "block",
            }}
        >
            Your Orders
        </Button>,
    ];

    const CheckoutComponents = () => (
        <div style={{
            marginTop:"1em"
        }} >
            <Grid container>
                {/* <Grid item xs={1}>
                    <Typography style={{
                        fontSize:24,
                        paddingLeft: "3em",
                        margin: "1em",
                    }}>Your Design Preview</Typography>
                    <div style={{
                        width:"100%",
                        display:"flex",
                        alignItems:"center",
                        justifyContent:"center"
                    }}>
                        <img src={final_image} />
                    </div>
                </Grid> */}
                <Grid className={classes.items} item xs={12}>
                    <Typography style={{
                        fontSize:20,
                        margin:"1em 0"
                    }}>Your Orders</Typography>
                    <div style={{height: "25em",overflowY:"scroll"}}>
                    {itemsArr?.map((item) => {
                        return (
                            <>
                                <CheckoutItem item={item} />
                            </>
                        );
                    })}
                    </div>

                </Grid>
            </Grid>
            <Grid container>
                <form
                    className={classes.infoForm}
                    id="submit-details-form"
                    onSubmit={onPayHandler}
                >
                    <Grid container>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Address"
                                name="address"
                                required
                                helperText="Please Use Landmark for faster delivery"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Email"
                                name="email"
                                required
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Phone Number"
                                name="phoneNo"
                                required
                                variant="outlined"
                            />
                        </Grid>
                    </Grid>
                </form>
            </Grid>
        </div>
    );
    return (
        <BaseLayout appBarButtons={appBarButtons}>
            {/* <img src={final_image} alt="current"/> */}
            <Grid container spacing={2}>
                <Grid item xs={12} md={7}>
                    <CheckoutComponents />
                </Grid>
                <Grid item xs={12} md={5}>
                    <BillDetails
                        billDetails={billStructure}
                        onPayHandler={onPayHandler}
                    />
                </Grid>
            </Grid>
        </BaseLayout>
    );
}
