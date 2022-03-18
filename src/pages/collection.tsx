import { Button, Grid } from "@mui/material";
import { navigate, RouteComponentProps } from "@reach/router";
import React, { useContext, useEffect } from "react";
import BaseLayout from "../components/appbar/appBar";
import ImageCard from "../components/collections/imageCard";
import { AuthContext } from "../context/auth-context";
import { useHttpClient } from "../hooks/http-hook";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setCollection } from "../redux/services/collection";

export default function Collection(props: RouteComponentProps) {
    const { user } = useContext(AuthContext);
    const { collection } = useAppSelector((state) => state.collectionReducer);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const navigateToNew=()=>{
        navigate("/new")
    }
    const dispatch = useAppDispatch();
    useEffect(() => {
        const fetchDresses = async () => {
            try {
                const responseData = await sendRequest(
                    `dress/dresses/${user.userId}`
                );

                dispatch(setCollection({ collection: responseData.dresses }));
            } catch (err) {}
        };
        fetchDresses();
    }, []);

    const Collection = () => (
        <Grid container>
            {Object.keys(collection)?.map((key) => {
                return (
                    <Grid item md={3}>
                        <ImageCard {...collection[key]} />
                    </Grid>
                );
            })}
        </Grid>
    );
    const appBarButtons = [
        <Button
            color="primary"
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
        </Button>
    ];
    return (
        <BaseLayout appBarButtons={appBarButtons} saveCanvas={() => {}}>
            <Collection />
        </BaseLayout>
    );
}
