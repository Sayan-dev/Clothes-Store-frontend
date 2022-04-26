import { Button, Card, CardMedia, Theme, Typography } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import React, { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { AuthContext } from "../../context/auth-context";
import { useAppSelector } from "../../redux/hooks";
import { addCartItem } from "../../redux/services/cart";
import { CompanyDress } from "../../types/dress";
import LoginModal from "../modals/loginModal"

interface props {
    data?: CompanyDress;
}
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        card: {
            padding: "1em",
            width: "14em",
            margin: "1em",
        },
        mediadiv: {
            padding: "1em",
        },
        media: {
            margin: "0 auto 1em auto",
            height: "11em",
            width: "10em",
        },
    })
);
export default function ProductCard(props: props) {
    const classes = useStyles();
    const { isLoggedIn, logout, user } = useContext(AuthContext);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { _id, name, price, image } = props.data;
    let { items } = useAppSelector((state) => state.cartReducer);
    if (!isLoggedIn) items = {};
    const dispatch = useDispatch();
    const addDressToCartHandler = (e: React.MouseEvent, item: CompanyDress) => {
        e.preventDefault();
        dispatch(addCartItem({ item: { ...item, quantity: 1 } }));
    };
    console.log(items);
    let addToCartButton = (
        <Button
            onClick={(e) => addDressToCartHandler(e, props.data)}
            variant="contained"
        >
            Add to Cart
        </Button>
    );
    if (items[_id]) {
        addToCartButton = (
            <Button
                onClick={(e) => addDressToCartHandler(e, props.data)}
                variant="outlined"
                disabled
            >
                Added to Cart
            </Button>
        );
    } else if(!isLoggedIn){
        addToCartButton = (
            <Button
                onClick={handleOpen}
                variant="contained"
            >
                Add to Cart
            </Button>
        );
    }
    return (
        <>
            <LoginModal open={open} handleClose={handleClose}/>
            <Card className={classes.card}>
                <div className={classes.mediadiv}>
                    <CardMedia
                        className={classes.media}
                        component="img"
                        image={image}
                        alt={name}
                    />
                </div>

                <Typography>{name}</Typography>
                <Typography>{price}</Typography>
                {addToCartButton}
            </Card>
        </>
    );
}
