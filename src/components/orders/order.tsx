import { Grid, Theme, Typography } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import React from "react";
import { CartItem } from "../../types/cart";
import { Order } from "../../types/orders";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            margin: "3em 0",
            borderLeft: `1px solid ${theme.palette.primary.dark}`,
            backgroundColor: `#fbfff594`,
            padding: "1em 3em 2em 3em",
            [theme.breakpoints.down("md")]: {
                padding: "1em 1em",
            },
        },
        allItems: {
            boxShadow: "0 0 1em #d3d3d3 ",
        },
        itemContainer: {
            padding: "2em 0",
            backgroundColor: "#fff",
            marginBottom: "0",
            border: "1px solid #e1e1e1",
            borderRadius: "2px",
            "& img": {
                width: "5em",
                height: "5.5em",
            },
        },
        details: {
            padding: "0 2em",
            justifyContent: "center",
            alignItems: "center",
            [theme.breakpoints.down("md")]: {
                padding: "0",
                "& button": {
                    padding: "1em",
                },
            },
            "& button": {
                padding: "1em 2em",
            },
        },
    })
);

export default function OrderComponent(props: { orderData: Order }) {
    const classes = useStyles();
    const { orderData } = props;
    const orderDate = new Date(orderData.createTime).toDateString();
    const ItemHtml = ({ item }: { item: CartItem }) => (
        <Grid container className={classes.itemContainer}>
            <Grid
                item
                xs={5}
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <img src={item.image} alt={item.name}></img>
            </Grid>
            <Grid item xs={7}>
                <Typography style={{ fontWeight: 600, fontSize: "20px" }}>
                    {item.name}
                </Typography>
                <Typography>Quantity: {item.quantity}</Typography>
            </Grid>
        </Grid>
    );
    return (
        <Grid container className={classes.root}>
            <Grid
                item
                xs={8}
                md={9}
                style={{
                    padding: "1em 0",
                    textTransform: "capitalize",
                    fontSize: "18px",
                }}
            >
                Status: {orderData.status}
            </Grid>
            <Grid
                item
                xs={4}
                md={3}
                style={{
                    padding: "1em 0",
                    textTransform: "capitalize",
                    fontSize: "18px",
                }}
            >
                Rs {orderData.amount / 100}
            </Grid>
            <Grid item xs={12} className={classes.allItems}>
                {orderData.items.map((item) => {
                    return <ItemHtml item={item} />;
                })}
            </Grid>
            <Grid item>
                <Typography sx={{ mt: 2 }} variant="body1">
                    {orderDate}
                </Typography>
            </Grid>
            {/* <Grid className={classes.details} item xs={4} md={5} alignItems="center" direction="column">
        <Button fullWidth variant="outlined">View Details</Button>
        <Button fullWidth>Get Invoice</Button>
          
        </Grid> */}
        </Grid>
    );
}
