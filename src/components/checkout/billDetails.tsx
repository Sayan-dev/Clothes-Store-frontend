import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import { Theme } from "@mui/system";
import React, { useEffect } from "react";
import { useAppSelector } from "../../redux/hooks";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            backgroundColor: theme.palette.red,
        },
        summaryHeader: {
            margin: "0 2em 4em 2em",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "1em",
        },
        billDetail: {
            margin: "0.5em 0",
        },
        summaryBackground: {
            width: "80%",
            boxShadow: "0 0 1em #2fff00",
            margin: "auto",
            backgroundColor: "#fff",
        },
        amountItem: {
            padding: "1em 0",
            fontWeight: 300,

            borderBottom: "1px solid #e1e1e1",
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
}
export default function BillDetails(props: billDetailsProps) {
    const classes = useStyles();
    const { amount, items } = useAppSelector((state) => state.canvasReducer);

    const listItem = (name: string, value: number) => {
        return (
            <Grid container className={classes.amountItem}>
                <Grid item xs={10}>
                    <Typography fontWeight={400} fontSize={16}>
                        {name}
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                &#8377;{" "}{value}
                </Grid>
            </Grid>
        );
    };
    return props.billDetails ? (
        <Box className={classes.summaryBackground}>
            <Box className={classes.summaryHeader}>
                <Typography style={{fontSize:24}}>Order Summary</Typography>
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
                        <Grid container justifyContent="center" alignItems="center">
                            <Grid item xs={9}>
                                <TextField 
                                    placeholder="Promo Code"
                                />
                            </Grid>
                            <Grid item xs={3} justifyContent="right" alignItems="end">
                                <Button color="secondary" variant="contained">Apply</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
            <Box className={classes.summaryHeader}>
                <Button
                    size="large"
                    color="secondary"
                    type="submit"
                    form="submit-details-form"
                    variant="contained"
                    style={{
                        marginBottom: "2em",
                        width:"60%",
                        padding:"1em",
                    }}
                >
                    Proceed to Pay
                </Button>
            </Box>
        </Box>
    ) : null;
}
