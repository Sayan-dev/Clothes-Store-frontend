import { Box, Button, Grid, Typography } from "@mui/material";
import { navigate, RouteComponentProps } from "@reach/router";
import React, { useContext, useEffect, useState } from "react";
import BaseLayout from "../components/appbar/appBar";
import { AuthContext } from "../context/auth-context";
import { useHttpClient } from "../hooks/http-hook";

export default function Order(props: RouteComponentProps) {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const {token} = useContext(AuthContext)
    const [orders, setOrders] = useState<{status:string}[]>([])
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

                setOrders(responseData.orders)
            } catch (err) {}
        };
        fetchOrders();
    }, [])
    
  const navigateToNew = () => {
    navigate("/new");
};
const navigateToCollection = () => {
    navigate("/collection");

}

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
            key={"Collection"}
            onClick={navigateToCollection}
            sx={{
                my: 2,
                mx: 5,
                display: "block",
            }}
        >
            Collection
        </Button>,
    ];
    const NewOrders = ()=>{
        return(
            <Box>
                {orders?.map(order=>{
                    console.log(order.status);
                    
                    return (
                        <Grid container>
                            <Grid item xs={12}>
                                <Typography>{order.status}</Typography>
                            </Grid>
                        </Grid>
                    )
                })}
            </Box>
        )
    }
    return (
        <BaseLayout appBarButtons={appBarButtons}>
            <NewOrders/>
        </BaseLayout>
    );
}
