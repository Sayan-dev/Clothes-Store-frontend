import { LoadingButton } from "@mui/lab";
import { Box, Button, Grid, TextField, Theme, Typography } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import React from "react";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        summaryHeader: {
            margin: "0 2em 3em 2em",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "1em",
            [theme.breakpoints.down("md")]: {
                padding: "0.5em 0em",
            },
        },
        billDetail: {
            margin: "0.5em 0",
        },
        summaryBackground: {
            width: "80%",
            boxShadow: `0 0 1em ${theme.palette.secondary.dark}`,
            margin: "auto",
            backgroundColor: "#fff",
            [theme.breakpoints.down("md")]: {
                width: "90%",
                padding: "1em 0em",
            },
        },
        amountItem: {
            padding: "1em 0",
            fontWeight: 300,

            borderBottom: "1px solid #e1e1e1",
        },
        summaryButton: {
            marginBottom: "2em",
            width: "60%",
            padding: "1em",
            [theme.breakpoints.down("md")]: {
                width: "80%",
                marginBottom: "5em",
            },
        },
    })
);
export interface BillDetailsType {
    amount: number;
    serviceCharge: number;
    finalAmount: number;
}

export interface billDetailsProps {
    billDetails: BillDetailsType;
    onPayHandler: (e: React.FormEvent) => void;
    handleSubmit?: (e: React.MouseEvent) => void;
    loading: boolean;
    loadingHandler?: () => void;
}
export default function BillDetails(props: billDetailsProps) {
    const { loading } = props;
    const classes = useStyles();
    const listItem = (name: string, value: number) => {
        return (
            <Grid container className={classes.amountItem}>
                <Grid item xs={9} md={10}>
                    <Typography fontWeight={400} fontSize={16}>
                        {name}
                    </Typography>
                </Grid>
                <Grid item xs={3} md={2}>
                    &#8377; {value}
                </Grid>
            </Grid>
        );
    };

    return props.billDetails ? (
        <Box className={classes.summaryBackground}>
            <Box className={classes.summaryHeader}>
                <Typography style={{ fontSize: 24 }}>Order Summary</Typography>
            </Box>

            <Box className={classes.summaryHeader}>
                <Grid container>
                    <Typography
                        fontWeight={500}
                        fontSize={20}
                        className={classes.billDetail}
                    >
                        Bill Details
                    </Typography>
                </Grid>
                <Grid container>
                    <Grid item xs={12}>
                        {listItem("Amount", props.billDetails.amount)}
                    </Grid>
                    <Grid item xs={12}>
                        {listItem(
                            "Service Charge",
                            props.billDetails.serviceCharge
                        )}
                    </Grid>
                    <Grid item xs={12}>
                        {listItem(
                            "Final Amount",
                            props.billDetails.finalAmount
                        )}
                    </Grid>
                </Grid>
            </Box>
            <Box className={classes.summaryHeader}>
                <Grid container rowSpacing={3}>
                    <Grid item xs={12}>
                        <Typography>Got a Promo Code?</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid
                            container
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Grid item xs={8} md={9}>
                                <TextField placeholder="Promo Code" />
                            </Grid>
                            <Grid
                                item
                                xs={4}
                                md={3}
                                justifyContent="right"
                                alignItems="end"
                            >
                                <Button color="primary" variant="contained">
                                    Apply
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
            <Box className={classes.summaryHeader}>
                <LoadingButton
                    loading={loading}
                    loadingPosition="start"
                    type="submit"
                    size="large"
                    form="submit-details-form"
                    onClick={props.handleSubmit}
                    className={classes.summaryButton}
                    variant="contained"
                >
                    Proceed to Pay
                </LoadingButton>
            </Box>
        </Box>
    ) : null;
}
