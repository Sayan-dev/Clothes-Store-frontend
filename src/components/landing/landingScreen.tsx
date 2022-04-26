import { Grid, Theme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import React from "react";
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: "100%",
            boxShadow: "0 1em 2em  #e1e1e1",
            marginBottom:"5em",
            [theme.breakpoints.down('md')]:{
                backgroundColor:theme.palette.primary.dark,
                
                height:"70vh"
            },
        },
        topicContainer:{
            padding:"30% 0 20% 10%",
            [theme.breakpoints.down('md')]:{
                height:"100%",
                color:theme.palette.primary.contrastText,
                padding:"40% 0 20% 10%",

            },
        },
        subtopic:{
            fontSize:"1.2em"
        },
        topic: {
            fontSize:"3em"
        },
        rightContainer:{
            backgroundColor:theme.palette.primary.dark,
            [theme.breakpoints.down('md')]:{
                display:"none",

            },
        }
    })
);
export default function LandingScreen() {
    const classes = useStyles();

    return <div className={classes.root}>
        <Grid container>
            <Grid item xs={12} md={7}>
                <div className={classes.topicContainer}>
                    <div className={classes.topic}>Fashion at your finguretips</div>
                    <p className={classes.subtopic}>Choose your collection lafj auisf ihfa fu faufhafs uihasfa fdiuasda sssd</p>

                </div>
            </Grid>
            <Grid item xs={5} className={classes.rightContainer}>
                <div >Some Image</div>
            </Grid>
        </Grid>
    </div>;
}
