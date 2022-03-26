import React from "react";
import { Button, Container, Grid } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import { Theme } from "@mui/system";
import { useAppSelector } from "../../redux/hooks";

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

            margin: "0 1em 1em 0 !important",
            height: "13em",
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
    const {catagory} = useAppSelector(state=>state.canvasReducer) as any
    console.log(catagory)
    return (
        <Container>
            <div className={classes.catagoryContainer}>
                <Grid container>
                    {list.map((e:{label:string, value:"mens" | "womens" | "kids"}) => (
                        <Grid key={e.value} className={classes.catagoryItem} item xs={12}><Button color="secondary" variant={catagory===e.value?"contained":"outlined"} onClick={()=>setCatagory(e.value)} className={classes.gridButton}>{e.label}</Button></Grid>
                    ))}
                </Grid>
            </div>
        </Container>
    );
}
