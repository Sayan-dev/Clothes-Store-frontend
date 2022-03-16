import { createStyles, makeStyles } from "@mui/styles";
import { Theme } from "@mui/system";
import React, { Fragment } from "react";
import { CompanyDress } from "../../types/dress";

let downloadedImg: HTMLImageElement;
async function imageReceived(itemName: string) {
    let canvas = document.createElement("canvas");
    let context = canvas.getContext("2d");

    canvas.width = downloadedImg.width;
    canvas.height = downloadedImg.height;

    context.drawImage(downloadedImg, 0, 0);

    try {
        const localImage = localStorage.getItem(itemName)
        if(!localImage){

            localStorage.setItem(
                itemName,
                canvas.toDataURL("image/png")
            );
        }
    } catch (err) {
        console.log("Error: " + err);
    }
}
function startDownload(imageURL: string, itemName:string) {
    downloadedImg = new Image();
    downloadedImg.crossOrigin = "Anonymous";
    downloadedImg.addEventListener("load", ()=>imageReceived(itemName));
    downloadedImg.src = imageURL;
}
const useStyles = makeStyles((theme: Theme) => createStyles({
    dresslistImage:{
        width:"8em",
    }
}));
const CompanyImage = (props: CompanyDress) => {
    const classes = useStyles()
    console.log(props.image, props.name)
    startDownload(props.image, props.name);

    return (
        <>
            <img
                className={classes.dresslistImage}
                src={props.image}
                alt={props.name}
            />
            <p>{props.name}</p>
            <p>Rs. {props.price}</p>
        </>
    );
};

export default CompanyImage;
