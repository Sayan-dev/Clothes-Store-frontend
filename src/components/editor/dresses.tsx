import React, { useEffect, useState } from "react";
import { Button, Container, Grid } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import { Theme } from "@mui/system";
import { useHttpClient } from "../../hooks/http-hook";
import { CompanyDress, CompanyDressObject } from "../../types/dress";
import CompanyImage from "./dressImage";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            backgroundColor: theme.palette.red,
        },
        dressContainer: {
            height: "100%",
            width: "20em",
            margin: "auto",
        },
        dressItem: {
            display:"flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 1em 1em 1em",
            height: "13em",
            boxShadow: "0px 0px 30em #d3d3d3",

        },
        gridButton: {
            height:"100%",
            width: "100%"
        },
        dresslistImage:{
            width:"50%",
        }
    })
);

export default function Dresses({addDressHandler, catagory= 'mens'}:{addDressHandler:(uri:string, item:CompanyDress, type: CompanyDress['type'], dresstype: CompanyDress['dresstype'])=>void, catagory:string}) {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [imageList,setImageList]=useState<CompanyDressObject[]>()

    useEffect(()=>{
        const fetchImages=async()=>{
            try {
                const responseData=await sendRequest(`dress/getAllCloths?catagory=${catagory}`)

                setImageList(responseData.clothes)
            } catch (err) {

            }

        };
        fetchImages();
    },[sendRequest, catagory]);
    
    const classes = useStyles();
    console.log(imageList)
    return (
        <Container>
            <div className={classes.dressContainer}>
                <Grid container>
                    {imageList?.map((e) => (
                        <Grid className={classes.dressItem} item xs={12}>
                            <Button onClick={()=>addDressHandler(e.cloth.image, e.cloth, e.cloth.type, e.cloth.dresstype)} className={classes.gridButton}>
                                <CompanyImage {...e.cloth}/>
                            </Button></Grid>
                    ))}
                </Grid>
            </div>
        </Container>
    );
}
