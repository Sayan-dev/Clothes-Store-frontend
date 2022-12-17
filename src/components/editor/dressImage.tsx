import { Button, Grid, Typography } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import { Theme } from "@mui/system";
import React, { Fragment, useEffect } from "react";
import { CompanyDress } from "../../types/dress";

let downloadedImg: HTMLImageElement;
async function imageReceived(itemName: string) {
    let canvas = document.createElement("canvas");
    let context = canvas.getContext("2d");

    canvas.width = downloadedImg.width;
    canvas.height = downloadedImg.height;

    context.drawImage(downloadedImg, 0, 0);

    try {
        localStorage.setItem(itemName, canvas.toDataURL("image/png"));
    } catch (err) {
        console.log("Error: " + err);
    }
}
function startDownload(imageURL: string, itemName: string) {
    downloadedImg = new Image();
    downloadedImg.crossOrigin = "Anonymous";
    downloadedImg.addEventListener(
        "load",
        () => imageReceived(itemName),
        false
    );
    downloadedImg.src = imageURL;
    return downloadedImg.removeEventListener("load",null)
}
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        dresslistImage: {
            width: "8em",
            height: "10em",
        },
        dressDetails: {
            height:"100%"
        }
    })
);
const CompanyImage = (props: CompanyDress) => {
    const classes = useStyles();
    return (
        <Grid container >
            <Grid item xs={6} style={{display:"flex", alignItems:"center", justifyContent: "center"}}>
            <img
                className={classes.dresslistImage}
                src={props.image}
                alt={props.name}
            />
            </Grid>
            <Grid item xs={6}>
                <Grid container direction="column">
                    <Grid item className={classes.dressDetails}>
                    <Typography style={{fontWeight:600,fontSize:"20px", overflow: "hidden", wordWrap:"normal"}}>{props.name}</Typography>
                    </Grid>
                    <Grid item className={classes.dressDetails}>
                    <Typography>&#8377; {props.price}</Typography>
                    </Grid>
                    <Grid item className={classes.dressDetails}>
                    In Stock:{" "} 4
                    </Grid>
                </Grid>
            </Grid>

        </Grid>
    );
};

export default CompanyImage;
