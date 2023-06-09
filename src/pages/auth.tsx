import { Box, Button, Grid, TextField } from "@mui/material";
import { Theme } from "@mui/system";
import { createStyles, makeStyles } from "@mui/styles";
import { RouteComponentProps } from "@reach/router";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/auth-context";
import { useHttpClient } from "../hooks/http-hook";
import GoogleImage from "../assets/google.svg";
import { LoadingButton } from "@mui/lab";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            margin: 0,
            height: "100vh",
            padding: 0,
            [theme.breakpoints.down("md")]: {
                display: "none",
            },
        },
        root_second: {
            [theme.breakpoints.down("md")]: {
                padding: "5em 0 0 2em",
            },
            padding: "5em 0 0 7em",
        },
        loginImage: {
            width: "100%",
            height: "100vh",
            margin: 0,
            padding: 0,
        },
        loginBox: {
            boxShadow: "0px 0px 30em #d3d3d3",
            height: "70vh",
            width: "50%",
            padding: "1em 2em",
            borderRadius: "1em",
            [theme.breakpoints.down("md")]: {
                width: "75%",
                padding: "1em 2em",
            },
        },
        loginHeader: {
            fontSize: "2em",
            fontWeight: 300,
            marginBottom: "2em",
            "& button": {
                padding: "1em 2em",
                fontSize: 18,
                borderRadius: "1em",
                textTransform: "capitalize",
            },
        },
        loginBody: {
            height: "15em",
            "& button": {
                marginTop: "2em",
            },
            "& form": {
                display: "flex",
                flexDirection: "column",
            },
        },
    })
);
interface State {
    email: string;
    password: string;
    showPassword: boolean;
}
interface SignupState {
    email: string;
    name: string;
    password: string;
    showPassword: boolean;
}
export default function Auth(props: RouteComponentProps) {
    const userAuth = useContext(AuthContext);
    const [isLogin, setIsLogin] = useState(true);
    const { isLoading, sendRequest } = useHttpClient();
    const [values, setValues] = useState<State>({
        email: "",
        password: "",
        showPassword: false,
    });

    const [signUpValues, setSignUpValues] = useState<SignupState>({
        email: "",
        name: "",
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
        e.preventDefault();
        const responseData = await sendRequest(`users/login`, "POST", {
            email: values.email,
            password: values.password,
        });
        userAuth.login(responseData.token, responseData);
    };
    const handleSignUpSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const responseData = await sendRequest(`users/signup`, "POST", {
            name: signUpValues.name,
            email: signUpValues.email,
            password: signUpValues.password,
        });
        userAuth.login(responseData.token, responseData);
    };

    const LoginBody = (
        <form onSubmit={(e: React.FormEvent) => handleSubmit(e)}>
            <TextField
                label="Email"
                variant="outlined"
                placeholder="Enter your email"
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
                style={{
                    marginBottom: "2em",
                }}
            />

            <TextField
                label="Password"
                variant="outlined"
                type="password"
                placeholder="Enter your password"
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
                style={{
                    marginBottom: "1em",
                }}
            />
            <LoadingButton
                loading={isLoading}
                loadingPosition="start"
                type="submit"
                style={{
                    textTransform: "capitalize",
                    margin: "6em 0 1em 0",
                    padding: "1em",
                }}
                variant="contained"
            >
                Submit
            </LoadingButton>
            {/* <Box>
                <Grid container>
                    <Grid style={{alignItems:"center",justifyContent:"center"}} item xs={5}><hr/></Grid>
                    <Grid style={{textAlign:"center"}} item xs={2}><span>OR</span></Grid>
                    <Grid style={{alignItems:"center",justifyContent:"center"}} item xs={5}><hr/></Grid>
                </Grid>
            </Box> */}
            {/* <Button
                style={{ textTransform:"capitalize", margin: "1em 0 0.5em 0", padding: "1em" }}
                fullWidth
                variant="outlined"
            >
                <img
                    style={{ height: "80%", margin: "0 1em" }}
                    src={GoogleImage}
                    alt="Google"
                />
                <Typography style={{ textTransform: "capitalize" }}>
                    Sign in with Google
                </Typography>
            </Button> */}
        </form>
    );

    const SignupBody = (
        <form onSubmit={(e: React.FormEvent) => handleSignUpSubmit(e)}>
            <TextField
                label="Name"
                variant="outlined"
                placeholder="Enter your name"
                required
                value={signUpValues.name}
                onChange={(e) =>
                    setSignUpValues((prev: SignupState) => {
                        return {
                            ...prev,
                            name: e.target.value,
                        };
                    })
                }
                style={{
                    marginBottom: "2em",
                }}
            />
            <TextField
                label="Email"
                variant="outlined"
                placeholder="Enter your email"
                required
                value={signUpValues.email}
                onChange={(e) =>
                    setSignUpValues((prev: SignupState) => {
                        return {
                            ...prev,
                            email: e.target.value,
                        };
                    })
                }
                style={{
                    marginBottom: "2em",
                }}
            />

            <TextField
                label="Password"
                variant="outlined"
                type="password"
                placeholder="Enter your password"
                required
                value={signUpValues.password}
                onChange={(e) =>
                    setSignUpValues((prev: SignupState) => {
                        return {
                            ...prev,
                            password: e.target.value,
                        };
                    })
                }
                style={{
                    marginBottom: "1em",
                }}
            />
            <LoadingButton
                loading={isLoading}
                loadingPosition="start"
                type="submit"
                style={{
                    textTransform: "capitalize",
                    margin: "5em 0 1em 0",
                    padding: "1em",
                }}
                variant="contained"
            >
                Submit
            </LoadingButton>
            {/* <Box>
                <Grid container>
                    <Grid style={{alignItems:"center",justifyContent:"center"}} item xs={5}><hr/></Grid>
                    <Grid style={{textAlign:"center"}} item xs={2}><span>OR</span></Grid>
                    <Grid style={{alignItems:"center",justifyContent:"center"}} item xs={5}><hr/></Grid>
                </Grid>
            </Box> */}
            {/* <Button
                style={{ textTransform:"capitalize", margin: "1em 0 0.5em 0", padding: "1em" }}
                fullWidth
                variant="outlined"
            >
                <img
                    style={{ height: "80%", margin: "0 1em" }}
                    src={GoogleImage}
                    alt="Google"
                />
                <Typography style={{ textTransform: "capitalize" }}>
                    Sign in with Google
                </Typography>
            </Button> */}
        </form>
    );
    return (
        <Grid container>
            <Grid item xs={6} className={classes.root}>
                <img
                    className={classes.loginImage}
                    alt="background"
                    src="https://images.unsplash.com/photo-1553095066-5014bc7b7f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d2FsbCUyMGJhY2tncm91bmR8ZW58MHx8MHx8&w=1000&q=80"
                />
            </Grid>
            <Grid item md={6} xs={12} className={classes.root_second}>
                <Box className={classes.loginBox}>
                    <Box className={classes.loginHeader}>
                        <Button
                            variant={isLogin ? "contained" : "text"}
                            onClick={() => setIsLogin(true)}
                        >
                            Login
                        </Button>
                        <Button
                            variant={isLogin ? "text" : "contained"}
                            onClick={() => setIsLogin(false)}
                        >
                            SignUp
                        </Button>
                    </Box>
                    <Box className={classes.loginBody}>
                        {isLogin ? LoginBody : SignupBody}
                    </Box>
                    {/* <Box
                        style={{
                            marginTop: "4em",
                        }}
                    >
                        <GoogleLogin
                            render={()=>{
                                return(
                                    <Button  style={{padding:"0.5em"}}  color="secondary" fullWidth variant="outlined">
                                        <img  style={{height:"80%", margin:"0 1em"}}  src={GoogleImage} alt="Google"/>
                                        <Typography style={{textTransform:"capitalize"}}>Sign in with Google</Typography>
                                    </Button>
                                )
                            }}
                            clientId="380360847586-tvu7qq43tb5ep0cemn9kpic598tv8hip.apps.googleusercontent.com"
                            buttonText="Sign in with Google"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy={"single_host_origin"}
                        />

                    </Box> */}
                </Box>
            </Grid>
        </Grid>
    );
}
