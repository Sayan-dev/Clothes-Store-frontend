import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { Theme } from "@mui/system";
import { createStyles, makeStyles } from "@mui/styles";
import React from "react";
import { useAppDispatch } from "../../redux/hooks";
import { removeItemFromCart } from "../../redux/services/cart";
import { CartItem } from "../../types/cart";

export interface CheckoutItemInterface {
    item: CartItem;
    removeItemFromCartHandler?: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: "0 4em 0 0",
            margin: "0 0 2em 0",
        },
        itemImage: {
            alignItems: "center",
            "& img": {
                width: "6em",
                height: "8em",
            },
        },
        items: {
            [theme.breakpoints.down("md")]: {
                paddingLeft: "1em",
            },
        },
    })
);
export default function CheckoutItem(props: CheckoutItemInterface) {
    // const {removeItemFromCartHandler} = props
    const dispatch = useAppDispatch();
    const removeItemFromCartHandler = (
        e: React.MouseEvent,
        itemId: CartItem["_id"]
    ) => {
        e.preventDefault();
        dispatch(removeItemFromCart({ itemId }));
    };
    const classes = useStyles();
    return (
        <Box className={classes.root}>
            <Paper className={classes.items}>
                <Grid container spacing={1}>
                    <Grid className={classes.itemImage} item md={4}>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                padding: "1em",
                            }}
                        >
                            <img src={props.item.image} alt={props.item.name} />
                        </div>
                    </Grid>
                    <Grid item md={8}>
                        <Grid container>
                            <Grid item xs={8}>
                                <Typography
                                    style={{
                                        fontWeight: 600,
                                        fontSize: 20,
                                    }}
                                >
                                    {props.item.name}
                                </Typography>
                                <Typography>
                                    Rating:{" "}
                                    <span
                                        style={{
                                            fontSize: 20,
                                            fontWeight: 600,
                                        }}
                                    >
                                        5.0
                                    </span>
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography
                                    style={{
                                        fontSize: 24,
                                        fontWeight: 300,
                                    }}
                                >
                                    &#8377; {props.item.price}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Typography>Quantity: {props.item.quantity}</Typography>

                        <Typography
                            style={{
                                marginTop: "1em",
                                padding: "0 1em 0 0",
                                fontSize: 14,
                            }}
                        >
                            Best in Syle and Quality, Freshly designed by lead
                            designers
                        </Typography>
                        <Button
                            style={{
                                margin: "1em 0",
                                padding: "0.5em",
                            }}
                            variant="outlined"
                            onClick={(event) =>
                                removeItemFromCartHandler(event, props.item._id)
                            }
                            color="error"
                        >
                            Remove from Cart
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
}
