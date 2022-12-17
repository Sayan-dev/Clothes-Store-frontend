import { Box, Button, Grid, Typography } from "@mui/material";
import { navigate, RouteComponentProps } from "@reach/router";
import React, {
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import BaseLayout from "../components/appbar/appBar";
import Canvas from "../components/editor/canvas";
import Catagories from "../components/editor/catagories";
import Dresses from "../components/editor/dresses";
import { fabric } from "fabric";
import mens from "../assets/male.png";
import womens from "../assets/female.png";
import kids from "../assets/kids.png";
import { getPosition, getScale } from "../helpers/constants";
import { CompanyDress } from "../types/dress";
import { useHttpClient } from "../hooks/http-hook";
import {
    addItemToCanvas,
    removeAllItems,
    setCanvasState,
    setCatagory,
    setFinalImage,
} from "../redux/services/editor";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { AuthContext } from "../context/auth-context";
import { loadScript } from "../helpers/loadScript";
import { CartItem } from "../types/cart";
import { addCartItem } from "../redux/services/cart";
import Loader from "../components/loader/loader";

interface ImageWithId extends fabric.IImageOptions {
    id: string;
}

export default function NewDress(props: RouteComponentProps) {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const fabricCanvas = useRef(null);
    const dispatch = useAppDispatch();
    const { token } = useContext(AuthContext);
    const { catagory, canvas_state } = useAppSelector(
        (state) => state.canvasReducer
    );
    const { amount, items } = useAppSelector((state) => state.cartReducer);
    // useEffect(() => {
    //     const item = localStorage.getItem("catagory");
    //     setCatagory(item);
    // }, []);
    const setCatagoryHandler = (newCatagory: CompanyDress["type"]) => {
        if (catagory !== newCatagory) {
            dispatch(setCatagory({ catagory: newCatagory }));
            // resetCanvas()

            selectCatagory(newCatagory);
        }
    };
    const navigateToCollection = () => {
        navigate("/Clothes-Store-frontend/collection");
    };
    const addDressHandler = (
        uri: string | null,
        item: CompanyDress,
        type: CompanyDress["type"],
        dresstype: CompanyDress["dresstype"]
    ) => {
        //
        fabric.Image.fromURL(
            `${uri}?no-cors-please`,
            (img) => {
                const oImg = img.set({
                    ...getPosition(type, dresstype),
                    id: dresstype,
                } as ImageWithId);
                oImg.scaleX = getScale(type).x;
                oImg.scaleY = getScale(type).y;
                fabricCanvas.current.add(oImg).renderAll();
            },
            { crossOrigin: "anonymous" }
        );
        dispatch(
            addItemToCanvas({
                item,
                canvas_state: JSON.stringify(fabricCanvas.current),
                canvas_image: fabricCanvas.current.toDataURL(),
            })
        );
    };
    const selectCatagory = useCallback(
        (catagory: "mens" | "womens" | "kids") => {
            fabricCanvas.current.clear();
            dispatch(removeAllItems());
            switch (catagory) {
                case "mens":
                    fabric.Image.fromURL(
                        mens,
                        (img) => {
                            const oImg = img.set({ left: 100, top: 20 });
                            oImg.scaleX = 0.3;
                            oImg.scaleY = 0.4;
                            fabricCanvas.current.add(oImg).renderAll();
                        },
                        { crossOrigin: "anonymous" }
                    );

                    break;
                case "womens":
                    fabric.Image.fromURL(
                        womens,
                        (img) => {
                            const oImg = img.set({ left: 100, top: 20 });
                            oImg.scaleX = 0.3;
                            oImg.scaleY = 0.4;
                            fabricCanvas.current.add(oImg).renderAll();
                        },
                        { crossOrigin: "anonymous" }
                    );
                    break;
                case "kids":
                    fabric.Image.fromURL(
                        kids,
                        (img) => {
                            const oImg = img.set({ left: 100, top: 20 });
                            oImg.scaleX = 0.3;
                            oImg.scaleY = 0.4;
                            fabricCanvas.current.add(oImg).renderAll();
                        },
                        { crossOrigin: "anonymous" }
                    );

                    break;
                default:
                    break;
            }
        },
        [dispatch]
    );

    const resetCanvas = () => {
        if (fabricCanvas.current) {
            fabricCanvas.current.clear();
        }
        dispatch(
            setCanvasState({
                current_state: JSON.stringify(fabricCanvas.current),
            })
        );
        if (catagory) selectCatagory(catagory);
    };

    useEffect(() => {
        fabricCanvas.current = new fabric.Canvas("editor_canvas", {
            controlsAboveOverlay: true,
            width: 300,
            height: 400,
        });
        fabricCanvas.current.loadFromJSON(canvas_state);
        // const json = '{"version":"5.2.1","objects":[{"type":"image","version":"5.2.1","originX":"left","originY":"top","left":0,"top":0,"width":1000,"height":1000,"fill":"rgb(0,0,0)","stroke":null,"strokeWidth":0,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeUniform":false,"strokeMiterLimit":4,"scaleX":0.3,"scaleY":0.4,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","skewX":0,"skewY":0,"cropX":0,"cropY":0,"src":"http://localhost:3000/static/media/female.ad849b45916c2d93018a.png","crossOrigin":"anonymous","filters":[]},{"type":"image","version":"5.2.1","originX":"left","originY":"top","left":0,"top":0,"width":1000,"height":1000,"fill":"rgb(0,0,0)","stroke":null,"strokeWidth":0,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeUniform":false,"strokeMiterLimit":4,"scaleX":0.3,"scaleY":0.4,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","skewX":0,"skewY":0,"cropX":0,"cropY":0,"src":"http://localhost:3000/static/media/female.ad849b45916c2d93018a.png","crossOrigin":"anonymous","filters":[]},{"type":"image","version":"5.2.1","originX":"left","originY":"top","left":82,"top":68,"width":480,"height":602,"fill":"rgb(0,0,0)","stroke":null,"strokeWidth":0,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeUniform":false,"strokeMiterLimit":4,"scaleX":0.28,"scaleY":0.38,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","skewX":0,"skewY":0,"cropX":0,"cropY":0,"src":"https://clothes-store.s3.ap-south-1.amazonaws.com/dresses/be0c594a-85e5-4a79-81c4-8efdd9f4d134-photo.png.png?no-cors-please","crossOrigin":"anonymous","filters":[]}]}'
    }, [catagory, canvas_state, items]);

    useEffect(() => {
        setCatagoryHandler("mens");
        // const json = '{"version":"5.2.1","objects":[{"type":"image","version":"5.2.1","originX":"left","originY":"top","left":0,"top":0,"width":1000,"height":1000,"fill":"rgb(0,0,0)","stroke":null,"strokeWidth":0,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeUniform":false,"strokeMiterLimit":4,"scaleX":0.3,"scaleY":0.4,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","skewX":0,"skewY":0,"cropX":0,"cropY":0,"src":"http://localhost:3000/static/media/female.ad849b45916c2d93018a.png","crossOrigin":"anonymous","filters":[]},{"type":"image","version":"5.2.1","originX":"left","originY":"top","left":0,"top":0,"width":1000,"height":1000,"fill":"rgb(0,0,0)","stroke":null,"strokeWidth":0,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeUniform":false,"strokeMiterLimit":4,"scaleX":0.3,"scaleY":0.4,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","skewX":0,"skewY":0,"cropX":0,"cropY":0,"src":"http://localhost:3000/static/media/female.ad849b45916c2d93018a.png","crossOrigin":"anonymous","filters":[]},{"type":"image","version":"5.2.1","originX":"left","originY":"top","left":82,"top":68,"width":480,"height":602,"fill":"rgb(0,0,0)","stroke":null,"strokeWidth":0,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeUniform":false,"strokeMiterLimit":4,"scaleX":0.28,"scaleY":0.38,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","skewX":0,"skewY":0,"cropX":0,"cropY":0,"src":"https://clothes-store.s3.ap-south-1.amazonaws.com/dresses/be0c594a-85e5-4a79-81c4-8efdd9f4d134-photo.png.png?no-cors-please","crossOrigin":"anonymous","filters":[]}]}'
        // fabricCanvas.current.loadFromJSON(json)
    }, []);
    const addDressToCartHandler = (e: React.MouseEvent, item: CompanyDress) => {
        e.preventDefault();
        dispatch(
            setCanvasState({
                current_state: JSON.stringify(fabricCanvas.current),
            })
        );
        dispatch(addCartItem({ item: { ...item, quantity: 1 } }));
    };
    const Editor = () => {
        return (
            <Grid container>
                <Grid item sm={3}>
                    <Catagories setCatagory={setCatagoryHandler} />
                </Grid>
                <Grid item sm={6}>
                    <Canvas />
                </Grid>
                <Grid item sm={3}>
                    <Dresses
                        addDressHandler={addDressHandler}
                        addDressToCartHandler={addDressToCartHandler}
                        catagory={catagory}
                    />
                </Grid>
            </Grid>
        );
    };
    const saveCanvas = async (event: React.MouseEvent) => {
        event.preventDefault();
        const canvas = JSON.stringify(fabricCanvas.current);
        try {
            const dataURL = fabricCanvas.current.toDataURL();

            await sendRequest(
                "dress/uploadDress",
                "POST",
                JSON.stringify({
                    name: "My File A",
                    image: dataURL,
                    type: catagory,
                    canvas_json: canvas,
                    price: amount,
                }),

                {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            );
        } catch (error) {
        }
    };
    const appBarButtons = [
        <Button
            color="secondary"
            variant="outlined"
            key={"Save"}
            onClick={saveCanvas}
            sx={{
                my: 2,
                mx: 5,
                display: "block",
            }}
        >
            Save
        </Button>,
        <Button
            color="secondary"
            variant="outlined"
            key={"Reset"}
            onClick={resetCanvas}
            sx={{
                my: 2,
                mx: 5,
                display: "block",
            }}
        >
            Reset
        </Button>,
        <Button
            color="secondary"
            variant="outlined"
            key={"Collection"}
            onClick={navigateToCollection}
            sx={{
                my: 2,
                mx: 5,
                display: "block",
            }}
        >
            Collection
        </Button>,
    ];
    const navigateToCart = () => {
        navigate("/Clothes-Store-frontend/checkout");
        dispatch(
            setFinalImage({
                current_state: JSON.stringify(fabricCanvas.current),
                canvas_image: fabricCanvas.current.toDataURL(),
            })
        );
        const loadRazorpayScript = async () => {
            await loadScript("https://checkout.razorpay.com/v1/checkout.js");
        };
        loadRazorpayScript();
    };
    const rightButtons = [
        <Typography
            key={"cart_amount"}
            sx={{
                my: 3,
                mx: 0,
                display: "block",
            }}
        >
            $ {amount}
        </Typography>,
        <Button
            color="secondary"
            variant="outlined"
            key={"go_to_cart"}
            onClick={navigateToCart}
            sx={{
                my: 2,
                mx: 5,
                display: "block",
            }}
        >
            Go to Cart
        </Button>,
    ];
    return (
        <>
            <Loader text="Your App is loading" open={isLoading}/>
            <BaseLayout
                appBarButtons={appBarButtons}
                rightSideButtons={rightButtons}
            >
                <Editor />
            </BaseLayout>
        </>
    );
}
