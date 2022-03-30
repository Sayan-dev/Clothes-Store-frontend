import React, { useEffect, useState } from "react";
import { Button, Container, Grid } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";
import { useHttpClient } from "../../hooks/http-hook";
import { CompanyDress, CompanyDressObject } from "../../types/dress";
import CompanyImage from "./dressImage";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { CartItem } from "../../types/cart";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        dressContainer: {
            height: "100%",
            width: "20em",
            margin: "auto",
        },
        dressItem: {
            display:"flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            margin: "0 1em 1em 1em !important",
            height: "13em",
            boxShadow: "0px 0px 30em #d3d3d3",
        },
        gridButton: {
            height:"100%",
            width: "100%",
            fontSize: 18,
            textTransform: "capitalize"
        },
        dresslistImage:{
            width:"50%",
        },
        tick: {
            color: theme.palette.secondary.dark,
            position: "absolute",
            top:"-5%",
            left: "-5%"
        }
    })
);

export default function Dresses({addDressHandler, addDressToCartHandler, catagory= 'mens'}:{addDressHandler:(uri:string, item:CompanyDress, type: CompanyDress['type'], dresstype: CompanyDress['dresstype'])=>void, catagory:string, addDressToCartHandler:(e: React.MouseEvent,item: CompanyDress)=>void}) {
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
                        <Grid className={classes.dressItem} direction="column" item xs={12}>
                            
                            <Button sx={{ textTransform: 'none' }} color="primary" onClick={()=>addDressesHandler(e.cloth)} className={classes.gridButton}>
                            {!findItem(e.cloth._id) || <CheckCircleIcon className={classes.tick}/>}
                                <CompanyImage {...e.cloth}/>
                            </Button>
                <Button onClick={(event)=>addDressToCartHandler(event, e.cloth)} color="primary" variant="contained">Add to Cart</Button>

                            </Grid>
                    ))}
                </Grid>
            </div>
        </Container>
    );
}
