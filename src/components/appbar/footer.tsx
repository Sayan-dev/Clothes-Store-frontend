import { ClassNames } from "@emotion/react";
import { Theme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import React from "react";
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            backgroundColor: theme.palette.primary.dark,
            color: "#fff",
            "& a,a:hover,a:visited":{
                color:"#fff",
                textDecoration:"none"
            },
            marginTop:"5em",
            padding:"2em",
            textAlign:"center"
        },
    })
);
export default function Footer() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            Made with love by{" "}
            <a target="_blank" href="https://github.com/Sayan-dev" rel="noreferrer">
                @Sayan-dev
            </a>
        </div>
    );
}
