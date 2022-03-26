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
            "& .MuiGrid-item": {
                padding: "2em 4em 2em 6em",
            },
        },
    })
);
export default function Checkout(props: RouteComponentProps) {
    const classes = useStyles();
    const { items, final_image, amount } = useAppSelector(
        (state) => state.canvasReducer
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
    const onPayHandler = async (event: React.FormEvent | any) => {
        event.preventDefault();
        console.log(event.target["address"].value);

        const orderDetail = await sendRequest(
            "/users/generateOrder",
            "POST",
            {
                amount,
                items,
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
    }, []);
    const appBarButtons = [
        <Button
            color="primary"
            variant="outlined"
            key={"Create New"}
            onClick={navigateToNew}
            sx={{
                my: 2,
                mx: 5,
                display: "block",
            }}
        >
            Create New
        </Button>,
        <Button
            color="primary"
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
        }}>
            <Grid container spacing={5}>
                <Grid className={classes.dressPreview} item xs={6}>
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
                </Grid>
                <Grid item xs={6}>
                    <Typography style={{
                        fontSize:20,
                        margin:"1em 0"
                    }}>Your Orders</Typography>
                    {items?.map((item) => {
                        return (
                            <>
                                <CheckoutItem item={item} />
                            </>
                        );
                    })}
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
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Email"
                                name="email"
                                required
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Phone Number"
                                name="phoneNo"
                                required
                                variant="standard"
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
                <Grid item xs={7}>
                    <CheckoutComponents />
                </Grid>
                <Grid item xs={5}>
                    <BillDetails
                        billDetails={billStructure}
                        onPayHandler={onPayHandler}
                    />
                </Grid>
            </Grid>
            {/* <CheckoutComponents/> */}
        </BaseLayout>
    );
}
