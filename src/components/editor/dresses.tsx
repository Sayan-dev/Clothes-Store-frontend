import React, { useEffect, useState } from "react";
import { Button, Container, Grid } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import { Theme } from "@mui/system";
import { useHttpClient } from "../../hooks/http-hook";
import { CompanyDress, CompanyDressObject } from "../../types/dress";
import CompanyImage from "./dressImage";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addItemToCart } from "../../redux/services/editor";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

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
            margin: "0 1em 1em 1em !important",
            height: "13em",
            boxShadow: "0px 0px 30em #d3d3d3",

        },
        gridButton: {
            height:"100%",
            width: "100%"
        },
        dresslistImage:{
            width:"50%",
        },
        tick: {
            position: "absolute",
            top:"-5%",
            left: "-5%"
        }
    })
);

export default function Dresses({addDressHandler, catagory= 'mens'}:{addDressHandler:(uri:string, item:CompanyDress, type: CompanyDress['type'], dresstype: CompanyDress['dresstype'])=>void, catagory:string}) {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [imageList,setImageList]=useState<CompanyDressObject[]>()
    const {items} = useAppSelector(state=>state.canvasReducer)
    const dispatch = useAppDispatch()

    const addDressesHandler = (item: CompanyDress)=>{
        addDressHandler(item.image, item, item.type, item.dresstype)
        // dispatch(addItemToCart(item))
    }
    function findItem(itemId:string){
        return items.findIndex(i=>i._id===itemId)<0?false:true
    }
    useEffect(()=>{
        const fetchImages=async()=>{
            try {
                const responseData=await sendRequest(`dress/getAllCloths?catagory=${catagory}`)

                setImageList(responseData.clothes)
            } catch (err) {

            }

        };
        fetchImages();
    },[]);
    
    const classes = useStyles();
    return (
        <Container>
            <div className={classes.dressContainer}>
                <Grid container>
                    {imageList?.map((e) => (
                        <Grid className={classes.dressItem} item xs={12}>
                            
                            <Button color="secondary" variant={"outlined"} onClick={()=>addDressesHandler(e.cloth)} className={classes.gridButton}>
                            {!findItem(e.cloth._id) || <CheckCircleIcon className={classes.tick}/>}
                                <CompanyImage {...e.cloth}/>
                            </Button></Grid>
                    ))}
                </Grid>
            </div>
        </Container>
    );
}
