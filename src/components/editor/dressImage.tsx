import { Grid } from "@mui/material";
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
        console.log("Image Uploaded", itemName, canvas.toDataURL("image/png"));
        
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
            <Grid item>
            <img
                className={classes.dresslistImage}
                src={props.image}
                alt={props.name}
            />
            </Grid>
            <Grid item>
                <Grid container direction="column">
                    <Grid item className={classes.dressDetails}>
                    {props.name}
                    </Grid>
                    <Grid item className={classes.dressDetails}>
                    $ {props.price}
                    </Grid>
                </Grid>
            </Grid>

        </Grid>
    );
};

export default CompanyImage;
