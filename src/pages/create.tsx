import { Grid } from "@mui/material";
import { RouteComponentProps } from "@reach/router";
import React, { useCallback, useEffect, useRef, useState } from "react";
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
import { addItemToCart, removeAllItems } from "../redux/services/editor";
import { useAppDispatch } from "../redux/hooks";

export default function NewDress(props: RouteComponentProps) {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const fabricCanvas = useRef(null);
    const dispatch = useAppDispatch();
    const [catagory, setCatagory] = useState("mens");
    // useEffect(() => {
    //     const item = localStorage.getItem("catagory");
    //     setCatagory(item);
    // }, []);

    const addDressHandler = (
        uri: string | null,
        item: CompanyDress,
        type: CompanyDress["type"],
        dresstype: CompanyDress["dresstype"]
    ) => {
        dispatch(addItemToCart(item));
        fabric.Image.fromURL(
            `${uri}?no-cors-please`,
            (img) => {
                const oImg = img.set(getPosition(type, dresstype));
                oImg.scaleX = getScale(type).x;
                oImg.scaleY = getScale(type).y;
                fabricCanvas.current.add(oImg).renderAll();
            },
            { crossOrigin: "anonymous" }
        );
    };
    const selectCatagory = useCallback(
        (catagory: "mens" | "womens" | "kids") => {
            fabricCanvas.current.clear();
            dispatch(removeAllItems());
            switch (catagory) {
                case "mens":
                    localStorage.setItem("catagory", catagory);
                    setCatagory(catagory);
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
                    localStorage.setItem("catagory", catagory);
                    setCatagory(catagory);
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
                    localStorage.setItem("catagory", catagory);
                    setCatagory(catagory);
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

    const saveImageHandler = async (event: React.MouseEvent) => {
        event.preventDefault();
        try {
            const dataURL = fabricCanvas.current.toDataURL();

            const response = await sendRequest(
                "dress/uploadDress",
                "POST",
                JSON.stringify({
                    name: "My File A",
                    image: dataURL,
                })

                // {
                //     "Content-Type": "application/json",
                //     Authorization: `Bearer ${auth.token}`,
                // }
            );

            console.log(response.data.imageKey);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fabricCanvas.current = new fabric.Canvas("editor_canvas", {
            controlsAboveOverlay: true,
        });

        fabricCanvas.current.setDimensions({ width: 300, height: 400 });
        const item =
            (catagory as "mens" | "womens" | "kids") ||
            (localStorage.getItem("catagory") as "mens" | "womens" | "kids");
        selectCatagory(item ? item : "mens");
        // const json = '{"version":"5.2.1","objects":[{"type":"image","version":"5.2.1","originX":"left","originY":"top","left":0,"top":0,"width":1000,"height":1000,"fill":"rgb(0,0,0)","stroke":null,"strokeWidth":0,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeUniform":false,"strokeMiterLimit":4,"scaleX":0.3,"scaleY":0.4,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","skewX":0,"skewY":0,"cropX":0,"cropY":0,"src":"http://localhost:3000/static/media/female.ad849b45916c2d93018a.png","crossOrigin":"anonymous","filters":[]},{"type":"image","version":"5.2.1","originX":"left","originY":"top","left":0,"top":0,"width":1000,"height":1000,"fill":"rgb(0,0,0)","stroke":null,"strokeWidth":0,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeUniform":false,"strokeMiterLimit":4,"scaleX":0.3,"scaleY":0.4,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","skewX":0,"skewY":0,"cropX":0,"cropY":0,"src":"http://localhost:3000/static/media/female.ad849b45916c2d93018a.png","crossOrigin":"anonymous","filters":[]},{"type":"image","version":"5.2.1","originX":"left","originY":"top","left":82,"top":68,"width":480,"height":602,"fill":"rgb(0,0,0)","stroke":null,"strokeWidth":0,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeUniform":false,"strokeMiterLimit":4,"scaleX":0.28,"scaleY":0.38,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","skewX":0,"skewY":0,"cropX":0,"cropY":0,"src":"https://clothes-store.s3.ap-south-1.amazonaws.com/dresses/be0c594a-85e5-4a79-81c4-8efdd9f4d134-photo.png.png?no-cors-please","crossOrigin":"anonymous","filters":[]}]}'
        // fabricCanvas.current.loadFromJSON(json)
    }, [catagory, selectCatagory]);
    const Editor = () => {
        return (
            <Grid container>
                <Grid item sm={3}>
                    <Catagories setCatagory={setCatagory} />
                </Grid>
                <Grid item sm={6}>
                    <Canvas />
                </Grid>
                <Grid item sm={3}>
                    <Dresses
                        addDressHandler={addDressHandler}
                        catagory={catagory}
                    />
                </Grid>
            </Grid>
        );
    };
    const saveCanvas = () => {
        const canvas = JSON.stringify(fabricCanvas.current);

        console.log(canvas);
    };
    return (
        <BaseLayout saveCanvas={saveCanvas}>
            <Editor />
        </BaseLayout>
    );
}
