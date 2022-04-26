import { Button, Grid } from "@mui/material";
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
    setCatagory,
} from "../redux/services/editor";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { AuthContext } from "../context/auth-context";
import { CartItem } from "../types/cart";
import { addCartItem } from "../redux/services/cart";

interface CanvasProps extends RouteComponentProps {
    collectionId: string;
}
export default function NewDress(props: CanvasProps) {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const fabricCanvas = useRef(null);
    const dispatch = useAppDispatch();
    const { token } = useContext(AuthContext);
    // const { amount, catagory } = useAppSelector((state) => state.canvasReducer);
    const { collection } = useAppSelector((state) => state.collectionReducer);
    const [catagory, setCatagory] = useState(
        collection[props.collectionId]?.type
    );
    // useEffect(() => {
    //     const item = localStorage.getItem("catagory");
    //     setCatagory(item);
    // }, []);
    const navigateToNew = ()=>{
        navigate("/Clothes-Store-frontend/new")
    }
    const navigateToCollection=()=>{
        navigate("/Clothes-Store-frontend/collection")
    }
    const addDressHandler = (
        uri: string | null,
        item: CompanyDress,
        type: CompanyDress["type"],
        dresstype: CompanyDress["dresstype"]
    ) => {
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
            console.log("Hello World", catagory);
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
    useEffect(() => {
        fabricCanvas.current = new fabric.Canvas("editor_canvas", {
            controlsAboveOverlay: true,
        });

        fabricCanvas.current.setDimensions({ width: 300, height: 400 });
    }, []);

    useEffect(() => {
        const json = collection[props.collectionId]?.canvas_json;
        fabricCanvas.current.clear();
        fabricCanvas.current.loadFromJSON(json);

        // setCatagory(collection[props.collectionId]?.type);
    }, []);
    const addDressToCartHandler = (e:React.MouseEvent, item:CompanyDress) => {
        e.preventDefault()
        dispatch(addCartItem({item:{...item, quantity: 1}}))
    }
    const Editor = () => {
        return (
            <Grid container>
                <Grid item sm={8}>
                    <Canvas />
                </Grid>
                <Grid item sm={4}>
                    <Dresses

                        addDressHandler={addDressHandler}
                        addDressToCartHandler={addDressToCartHandler}
                        catagory={catagory}
                    />
                </Grid>
            </Grid>
        );
    };
    const saveEditCanvas = async (event: React.MouseEvent) => {
        event.preventDefault();
        const canvas = JSON.stringify(fabricCanvas.current);
        try {
            const dataURL = fabricCanvas.current.toDataURL();
            console.log(canvas);

            const response = await sendRequest(
                `dress/updateDress/${collection[props.collectionId]?._id}`,
                "PATCH",
                JSON.stringify({
                    name: "My 20 image",
                    image: dataURL,
                    canvas_json: canvas,
                    price: 0,
                }),

                {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            );
        } catch (error) {
            console.log(error);
        }
        console.log(canvas);
    };
    const appBarButtons = [
        <Button
            color="secondary"
            variant="outlined"
            key={"Edit"}
            onClick={saveEditCanvas}
            sx={{
                my: 2,
                mx: 5,
                display: "block",
            }}
        >
            Edit
        </Button>,
        <Button
            color="secondary"
            variant="outlined"
            key={"Create New"}
            onClick={navigateToNew}
            sx={{
                my: 2,
                mx: 5,
                display: "block",
            }}
        >
            Create New
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
    return (
        <BaseLayout
            appBarButtons={appBarButtons}
            saveCanvas={() => {}}
            editCanvas={saveEditCanvas}
        >
            <Editor />
        </BaseLayout>
    );
}
