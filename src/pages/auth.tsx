import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { Theme } from "@mui/system";
import { createStyles, makeStyles } from "@mui/styles";
import { RouteComponentProps } from "@reach/router";
import React, { useContext, useState } from "react";
import GoogleLogin from "react-google-login";
import { AuthContext } from "../context/auth-context";
import { useHttpClient } from "../hooks/http-hook";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            margin: 0,
            height: "100vh",
            padding: 0,
        },
        loginImage: {
            width: "100%",
            height: "100vh",
            margin: 0,
            padding: 0,
        },
        loginBox: {
            boxShadow: "0px 0px 30em #d3d3d3",
            height: "auto",
            width: "100%",
            padding: "1em 2em 5em 2em",
        },
        loginHeader: {
            fontSize: "2em",
            fontWeight: 300,
        },
        loginBody: {
            height: "15em",
            "& button":{
                marginTop:"5em"
            },
            "& form":{
                display:"flex",
                flexDirection: "column",

            }
        },
    })
);
interface State {
    email: string;
    password: string;
    showPassword: boolean;
}
export default function Auth(props: RouteComponentProps) {
    const userAuth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [values, setValues] = useState<State>({
        email: "",
        password: "",
        showPassword: false,
    });

    function validateForm() {
        return values.email.length > 0 && values.password.length > 0;
    }
    const classes = useStyles();
    const responseGoogle = async () => {
        // console.log(resp);
        // const userData = resp.profileObj;
        // console.log(userData);
        const responseData = await sendRequest(`users/login`, "POST", {
            email: values.email,
            password: values.password,
        });
        userAuth.login(responseData.token, responseData);
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const responseData = await sendRequest(`users/login`, "POST", {
            email: values.email,
            password: values.password,
        });
        userAuth.login(responseData.token, responseData);
    };
    return (
        <Grid container>
            <Grid item xs={8} className={classes.root}>
                <img
                    className={classes.loginImage}
                    alt="background"
                    src="https://png.pngtree.com/background/20210711/original/pngtree-dark-vector-abstract-background-picture-image_1159556.jpg"
                />
            </Grid>
            <Grid item xs={4}>
                <Box sx={{ mx: 15, my: 15 }}>
                    <Paper className={classes.loginBox}>
                        <h3 className={classes.loginHeader}>Login</h3>
                        <Box className={classes.loginBody}>
                            <form onSubmit={(e:React.FormEvent)=>handleSubmit(e)}>
                            <TextField
                                label="Email"
                                variant="filled"
                                required
                                value={values.email}
                                onChange={(e) =>
                                    setValues((prev: State) => {
                                        return {
                                            ...prev,
                                            email: e.target.value,
                                        };
                                    })
                                }
                            />
                             <TextField
                                label="Password"
                                variant="filled"
                                required
                                value={values.password}
                                onChange={(e) =>
                                    setValues((prev: State) => {
                                        return {
                                            ...prev,
                                            password: e.target.value,
                                        };
                                    })
                                }
                            />
                            <Button type="submit" variant="contained">
                                Submit
                            </Button>
                            </form>
                        </Box>
                        {/* <GoogleLogin
                            clientId="380360847586-tvu7qq43tb5ep0cemn9kpic598tv8hip.apps.googleusercontent.com"
                            buttonText="Sign in with Google"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy={"single_host_origin"}
                        /> */}
                    </Paper>
                </Box>
            </Grid>
        </Grid>
    );
}
