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
import { inherits } from "util";
import { useRef } from "react";
import { useAppSelector } from "../../redux/hooks";
import { AuthContext } from "../../context/auth-context";
import { navigate } from "@reach/router";

const drawerWidth = 200;

interface Props {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window?: () => Window;
    children: React.ReactNode;
    saveCanvas: (event: React.MouseEvent) => void;
    editCanvas?: (event: React.MouseEvent) => void;
    appBarButtons?: React.ReactNode[];
}

export default function BaseLayout(props: Props) {
    const { window } = props;
    const {appBarButtons} = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const { amount } = useAppSelector((state) => state.canvasReducer);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const { isLoggedIn, logout } = React.useContext(AuthContext);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
     const navigateToCollection = ()=>{
         navigate("/collection")
     }
    const pages = [
        <Button
            color="primary"
            variant="outlined"
            key={"Save"}
            onClick={props.saveCanvas}
            sx={{
                my: 2,
                mx: 5,
                display: "block",
            }}
        >
            Save
        </Button>,
                <Button
                color="primary"
                variant="outlined"
                key={"Edit"}
                onClick={props.editCanvas}
                sx={{
                    my: 2,
                    mx: 5,
                    display: "block",
                }}
            >
                Edit
            </Button>,
        <Button
            color="primary"
            variant="outlined"
            key={"Download"}
            onClick={handleDrawerToggle}
            sx={{
                my: 2,
                mx: 5,
                display: "block",
            }}
        >
            Download
        </Button>,
        <Button
            color="primary"
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

    const ResponsiveAppBar = (props: { openFile: () => {} }) => {
        const fileInput = useRef(null);
        const fileSelectHandler = () => {
            fileInput.current.click();
        };
        return (
            <AppBar elevation={0} position="fixed" color="secondary">
                <Toolbar style={{ padding: "0 4em" }}>
                    <Typography
                        variant="h5"
                        noWrap
                        component="nav"
                        sx={{ mr: 10, display: { xs: "none", md: "flex" } }}
                    >
                        LOGO
                    </Typography>

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
                        <Typography
                            key={"cart_amount"}
                            sx={{
                                my: 3,
                                mx: 0,
                                display: "block",
                            }}
                        >
                            $ {amount}
                        </Typography>
                        <Button
                            color="primary"
                            variant="outlined"
                            key={"go_to_cart"}
                            onClick={handleDrawerToggle}
                            sx={{
                                my: 2,
                                mx: 5,
                                display: "block",
                            }}
                        >
                            Go to Cart
                        </Button>
                    </Box>
                    {isLoggedIn ? (
                        <Box sx={{ flexGrow: 0 }}>
                            <Avatar
                                alt="Remy Sharp"
                                src="/static/images/avatar/2.jpg"
                                onClick={handleMenu}
                            />
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
                                <MenuItem onClick={logout}>
                                    Logout
                                </MenuItem>
                            </Menu>
                        </Box>
                    ) : null}
                </Toolbar>
            </AppBar>
        );
    };

    const drawer = (
        <>
            <Toolbar />
            <List>
                {[
                    "Inbox",
                    "Checks",
                    "Mails",
                    "Drafts",
                    "All mail",
                    "Trash",
                ].map((text, index) => (
                    <ListItem
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexDirection: "column",
                            padding: "1.5em",
                            margin: "0.2em 0em",
                        }}
                        button
                        key={text}
                    >
                        <ListItemIcon
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                margin: "0.5em 0",
                            }}
                        >
                            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </>
    );

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
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: "block", sm: "none" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: drawerWidth,
                        },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: "none", sm: "block" },
                        "& .MuiDrawer-paper": {
                            boxShadow: "0px 0px 30px #d1d1d1",
                            border: "none",
                            boxSizing: "border-box",
                            width: drawerWidth,
                            position: "inherit",
                        },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                }}
            >
                <Toolbar />
                {props.children}
            </Box>
        </Box>
    );
}
