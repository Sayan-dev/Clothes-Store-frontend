import * as React from "react";
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

const drawerWidth = 200;

interface Props {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window?: () => Window;
    children: React.ReactNode;
    saveCanvas?: (event: React.MouseEvent) => void;
    editCanvas?: (event: React.MouseEvent) => void;
    appBarButtons?: React.ReactNode[];
    rightSideButtons?: React.ReactNode[];
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
    })
);

export default function BaseLayout(props: Props) {
    const { window } = props;
    const classes = useStyles();

    const { appBarButtons, rightSideButtons } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const { amount } = useAppSelector((state) => state.canvasReducer);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const { isLoggedIn, logout, user } = React.useContext(AuthContext);
    const dispatch = useAppDispatch();
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const navigateToCollection = () => {
        navigate("/collection");
    };

    const ResponsiveAppBar = (props: { openFile: () => {} }) => {
        const fileInput = useRef(null);
        const fileSelectHandler = () => {
            fileInput.current.click();
        };
        return (
            <AppBar elevation={1} position="fixed" color="secondary">
                <Toolbar style={{ padding: "0 4em" }}>
                    <img className={classes.logo} src={logo} alt="Logo" />

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
                            onClick={handleDrawerToggle}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                    </Box>
                    <Typography
                        variant="h5"
                        noWrap
                        component="div"
                        sx={{
                            flexGrow: 1,
                            display: { xs: "flex", md: "none" },
                        }}
                    >
                        LOGO
                    </Typography>
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
                            <IconButton
                                size="large"
                                aria-label={user.email}
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <Avatar alt={user.email} src={user.image} />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}>
                                    Profile
                                </MenuItem>
                                <MenuItem onClick={logout}>Logout</MenuItem>
                            </Menu>
                        </div>
                    ) : null}
                </Toolbar>
            </AppBar>
        );
    };

    const container =
        window !== undefined ? () => window().document.body : undefined;
    const openFileHandler = () => {
        return "";
    };
    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <ResponsiveAppBar openFile={openFileHandler} />

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
        </Box>
    );
}
