import { Button, Card, Grid } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import { Theme } from "@mui/system";
import { navigate } from "@reach/router";
import React from "react";
import { useHttpClient } from "../../hooks/http-hook";
import { UserCollectionDress } from "../../types/dress";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            backgroundColor: theme.palette.red,
            display: "flex",
            flexDirection: "column",
            "& img": {
                width: "20em",
                height: "20em",
            },
            padding: "2em 1em",
            margin: "1em",
            "&:hover": {
                cursor: "pointer",
            },

        },
        actionButtons:{
            margin:"1em 0"
        },
        cardItems:{
            margin:"1em 0"

        }
    })
);
export default function ImageCard(item: UserCollectionDress) {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const classes = useStyles();
    const navigateToEdit = () => {
        navigate(`/Clothes-Store-frontend/edit/${item._id}`);
    };
    const deleteHandler=async ()=>{
        try{
          const response=await sendRequest(`dress/user/delete/${item._id}`,'DELETE')
        }catch(error){
    
        }
    
        // console.log("Deleted Successfully")
    
      }
    return (
        <Card key={item._id} className={classes.root}>
            <img src={item.image} alt={item.name} />
            <Grid container className={classes.cardItems}>
                <Grid item xs={6} >{item.name}</Grid>

                <Grid item xs={6}>Rs {item.price}</Grid>
            </Grid>
            <Grid container className={classes.actionButtons}>
                <Grid alignItems="center" justifyContent="center" item xs={6}><Button onClick={navigateToEdit} variant="contained" color="primary">Edit</Button></Grid>

                <Grid alignItems="center" justifyContent="center" item xs={6}><Button onClick = {deleteHandler}variant="contained" color="error">Delete</Button></Grid>
            </Grid>
        </Card>
    );
}
