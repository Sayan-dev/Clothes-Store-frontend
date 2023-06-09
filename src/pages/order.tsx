import { Box, Button, Theme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import { navigate, RouteComponentProps } from "@reach/router";
import React, { useContext, useEffect, useState } from "react";
import BaseLayout from "../components/appbar/appBar";
import OrderComponent from "../components/orders/order";
import { AuthContext } from "../context/auth-context";
import { useHttpClient } from "../hooks/http-hook";
import { Orders } from "../types/orders";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        orderRoot: {
            width: "60%",
            margin: "auto",
            [theme.breakpoints.down("md")]: {
                width: "100%",
            },
        },
    })
);
export default function Order(props: RouteComponentProps) {
    const classes = useStyles();

    const { sendRequest } = useHttpClient();
    const { token } = useContext(AuthContext);
    const [orders, setOrders] = useState<Orders>([]);
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const responseData = await sendRequest(
                    `payments/getAllOrders`,
                    "GET",
                    null,
                    {
                        Authorization: `Bearer ${token}`,
                    }
                );

                setOrders(responseData.orders);
            } catch (err) {}
        };
        fetchOrders();
    }, []);

    const navigateToNew = () => {
        navigate("/Clothes-Store-frontend/new");
    };

    const appBarButtons = [
        <Button
            color="secondary"
            variant="outlined"
            key={"Create New"}
            onClick={navigateToNew}
            sx={{
                my: 2,
                mx: 5,
                display: "block",
            }}
        >
            Home
        </Button>,
    ];
    const NewOrders = () => {
        return (
            <Box className={classes.orderRoot}>
                {orders?.map((order) => {
                    return <OrderComponent orderData={order} />;
                })}
            </Box>
        );
    };
    return (
        <BaseLayout appBarButtons={appBarButtons}>
            <NewOrders />
        </BaseLayout>
    );
}
