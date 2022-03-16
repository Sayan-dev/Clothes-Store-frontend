import React from "react";
import { Container } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import { Theme } from "@mui/system";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            backgroundColor: theme.palette.red,
        },
        canvas: {
            "& #editor_canvas":{
                width:'45em!important',
                height:'42em!important'
            },
            "& .upper-canvas":{
                width:'45em!important',
                height:'42em!important'
            },
            height: '42em',
            width:'45em',
            margin: 'auto',
            boxShadow: '0px 0px 20em #d3d3d3'
        }
    })
);
export default function Canvas() {
    const classes = useStyles();
    return (
        <Container>
            <div className={classes.canvas}>
                <canvas id="editor_canvas" />
            </div>
        </Container>
    );
}
