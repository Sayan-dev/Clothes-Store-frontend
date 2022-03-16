import { Grid } from "@mui/material";
import { RouteComponentProps } from "@reach/router";
import React, { useEffect, useRef, useState } from "react";
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

export default function NewDress(props: RouteComponentProps) {
    const fabricCanvas = useRef(null);
    const [catagory, setCatagory] = useState("mens");
    // useEffect(() => {
    //     const item = localStorage.getItem("catagory");
    //     setCatagory(item);
    // }, []);

    const addDressHandler = (uri: string | null, name:string, type:CompanyDress['type'], dresstype:CompanyDress['dresstype']) => {
        // startDownload(uri)

        let image;
        try {
            image = localStorage.getItem(name);
        } catch (error) {}

        fabric.Image.fromURL(
            image,
            (img) => {
                const oImg = img.set(getPosition(type, dresstype));
                oImg.scaleX = getScale(type).x;
                oImg.scaleY = getScale(type).y;
                fabricCanvas.current.add(oImg).renderAll();
            },
            { crossOrigin: "anonymous" }
        );
    };
    const selectCatagory = (catagory: "mens" | "womens" | "kids") => {
        fabricCanvas.current.clear();

        switch (catagory) {
            case "mens":
                localStorage.setItem("catagory", catagory);
                setCatagory(catagory);
                fabric.Image.fromURL(
                    mens,
                    (img) => {
                        const oImg = img.set({ left: 0, top: 0 });
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
                        const oImg = img.set({ left: 0, top: 0 });
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
                        const oImg = img.set({ left: 0, top: 0 });
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


    };
    useEffect(() => {
        fabricCanvas.current = new fabric.Canvas("editor_canvas", {
            controlsAboveOverlay: true,
            skipTargetFind: true,
        });

        fabricCanvas.current.setDimensions({ width: 300, height: 400 });
        const item = localStorage.getItem("catagory");
        setCatagory(item?item:'mens');
    }, [catagory]);
    const Editor = () => {
        return (
            <Grid container>
                <Grid item sm={3}>
                    <Catagories selectCatagory={selectCatagory} />
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
    return (
        <BaseLayout>
            <Editor />
        </BaseLayout>
    );
}
