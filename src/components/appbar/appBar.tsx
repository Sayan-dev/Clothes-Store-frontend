import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import {
    Avatar,
    Button,
    Container,
    Menu,
    MenuItem,
    Tooltip,
} from "@mui/material";
import { useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { AuthContext } from "../../context/auth-context";
import { navigate } from "@reach/router";
import { loadScript } from "../../helpers/loadScript";
import { setFinalImage } from "../../redux/services/editor";
import logo from "../../assets/myLogo.png";
import { createStyles, makeStyles } from "@mui/styles";
import { Theme } from "@mui/system";
import { orange } from "@mui/material/colors";
import Footer from "./footer";

const drawerWidth = 250;

interface Props {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    children: React.ReactNode;
    saveCanvas?: (event: React.MouseEvent) => void;
    editCanvas?: (event: React.MouseEvent) => void;
    appBarButtons?: React.ReactNode[];
    rightSideButtons?: React.ReactNode[];
    sideBar?: React.ReactNode[];
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            backgroundColor: theme.palette.red,
        },
        summaryHeader: {
            boxShadow: "0 0 1em #d1d1d1",
            margin: "4em 8em",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1em",
        },
        logo: {
            width: "4em",
            marginRight: "5em",
        },
        logoutButton: {
            [theme.breakpoints.down("md")]: {
                display: "none",
            },
        },
    })
);

export default function BaseLayout(props: Props) {
    const [mobView, setMobView] = useState(false);
    const [drawer, setDrawer] = useState(false);
    const classes = useStyles();

    const { appBarButtons, rightSideButtons, sideBar } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const { isLoggedIn, logout, user } = React.useContext(AuthContext);
    const dispatch = useAppDispatch();
    const ResponsiveAppBar = () => {
        return (
            <AppBar elevation={1} position="fixed" color="primary">
                <Toolbar style={{ padding: "0 4em" }}>
                    <img className={classes.logo} src={logo} alt="Logo" />

                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "none", md: "flex" },
                        }}
                    >
                        {appBarButtons?.map((button) => button)}
                    </Box>

                    <Box
                        sx={{
                            flexGrow: 0,
                            display: { xs: "none", md: "flex" },
                        }}
                    >
                        {rightSideButtons}
                    </Box>
                    {isLoggedIn ? (
                        <div>
                            <Button
                                className={classes.logoutButton}
                                style={{ marginRight: "2em" }}
                                color="secondary"
                                variant="outlined"
                                onClick={logout}
                            >
                                Logout
                            </Button>
                            <IconButton
                                size="large"
                                aria-label={user.name}
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                color="secondary"
                            >
                                <Avatar
                                    alt={user.name}
                                    sx={{ bgcolor: orange[600] }}
                                    src={user.image}
                                >
                                    {user.image ? undefined : user.name[0]}
                                </Avatar>
                            </IconButton>
                        </div>
                    ) : null}
                </Toolbar>
            </AppBar>
        );
    };
    const width = window.innerWidth;
    useEffect(() => {
        if (width < 500) {
            setMobView(true);
        } else {
            setMobView(false);
        }
    }, [width]);
    console.log(mobView);

    const ResponsiveMobAppBar = () => {
        return (
            <AppBar elevation={1} position="fixed" color="primary">
                <Toolbar style={{ padding: "0 4em" }}>
                    <img className={classes.logo} src={logo} alt="Logo" />
                    {isLoggedIn ? (
                        <Box
                            sx={{
                                flexGrow: 1,
                                display: { xs: "flex" },
                            }}
                        >
                            <IconButton
                                size="large"
                                aria-label={user.name}
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                color="secondary"
                            >
                                <Avatar
                                    alt={user.name}
                                    sx={{ bgcolor: orange[600] }}
                                    src={user.image}
                                >
                                    {user.image ? undefined : user.name[0]}
                                </Avatar>
                            </IconButton>
                            <Drawer
                                anchor={"right"}
                                open={drawer}
                                onClose={() => setDrawer(!drawer)}
                                sx={{
                                    display: { xs: "block", sm: "none" },
                                    "& .MuiDrawer-paper": {
                                        boxSizing: "border-box",
                                        width: drawerWidth,
                                    },
                                }}
                            >
                                <Button
                                    className={classes.logoutButton}
                                    style={{ marginRight: "2em" }}
                                    color="primary"
                                    draggable
                                    variant="outlined"
                                    onClick={logout}
                                >
                                    Logout
                                </Button>
                                {appBarButtons?.map((button) => button)}

                                {rightSideButtons}
                                {sideBar}
                            </Drawer>
                        </Box>
                    ) : null}
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "flex", md: "none" },
                        }}
                    >
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={() => setDrawer(true)}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
        );
    };
    return (
        <div>
            <CssBaseline />
            {mobView ? <ResponsiveMobAppBar /> : <ResponsiveAppBar />}

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                }}
            >
                <Toolbar />
                {props.children}
            </Box>
            <Footer />
        </div>
    );
}
