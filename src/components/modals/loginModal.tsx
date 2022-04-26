import { Box, Button, Modal, Theme, Typography } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import { navigate } from "@reach/router";
import React from "react";

interface props{
    open:boolean;
    handleClose:()=>void
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        modalBody:{
            position: 'absolute' as 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            backgroundColor: "#fff" ,
            padding:"2em",
            [theme.breakpoints.down("md")]: {
                width: 300,
            },
        }
    })
);

export default function LoginModal(props:props) {
    const classes=useStyles()
    const {open,handleClose} = props
    const navigateToAuth=()=>{
        navigate("/Clothes-Store-frontend/auth")
    }
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box className={classes.modalBody}>
                <Typography id="modal-modal-title" variant="h3" component="h2">
                    !Important
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2, mb:5 }}>
                    Please Login or Signup to continue
                </Typography>
                <Button onClick={navigateToAuth} variant="contained" color="primary">Go to Auth page</Button>
            </Box>
        </Modal>
    );
}
