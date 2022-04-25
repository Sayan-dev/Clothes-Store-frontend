import { Button, Card, CardMedia, Theme, Typography } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import React from "react";
import { useDispatch } from "react-redux";
import { addCartItem } from "../../redux/services/cart";
import { CompanyDress } from "../../types/dress";

interface props {
    data?: CompanyDress
}
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        card:{
            padding:"1em",
            width:"14em",
            margin:"1em"
        },
        mediadiv:{
            padding:"1em"
        },
        media:{
            margin:"0 auto 1em auto",
            height:"11em",
            width:"10em"
        }
    })
);
export default function ProductCard(props: props) {
    const classes= useStyles()
    const { name, price, image } = props.data;
    const dispatch = useDispatch()
    const addDressToCartHandler = (e: React.MouseEvent, item: CompanyDress) => {
        e.preventDefault();
        dispatch(addCartItem({ item: { ...item, quantity: 1 } }));
    };
    return (
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
            <Button onClick={(e)=>addDressToCartHandler(e, props.data)} variant="contained">Add to Cart</Button>
        </Card>
    );
}
