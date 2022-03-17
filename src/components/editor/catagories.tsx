import React from "react";
import { Button, Container, Grid } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import { Theme } from "@mui/system";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            backgroundColor: theme.palette.red,
        },
        catagoryContainer: {
            height: "100%",
            width: "12em",
            margin: "auto",
        },
        catagoryItem: {

            margin: "0 1em 1em 0",
            height: "14em",
            boxShadow: "0px 0px 30em #d3d3d3",

        },
        gridButton: {
            height:"100%",
            width: "100%",
            textTransform: "capitalize"
        }
    })
);



const list = [{label:"Men's Wear", value:"mens"}, {label:"Ladies Wear", value:"womens"}, {label:"Kids", value:"kids"}];
export default function Catagories({setCatagory}:{setCatagory: (catagory: "mens" | "womens" | "kids")=>void}) {
    const classes = useStyles();
    return (
        <Container>
            <div className={classes.catagoryContainer}>
                <Grid container>
                    {list.map((e:{label:string, value:"mens" | "womens" | "kids"}) => (
                        <Grid className={classes.catagoryItem} item xs={12}><Button onClick={()=>setCatagory(e.value)} className={classes.gridButton}>{e.label}</Button></Grid>
                    ))}
                </Grid>
            </div>
        </Container>
    );
}
