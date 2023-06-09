import {
    Checkbox,
    FormControlLabel,
    Grid,
    Radio,
    Slider,
    Theme,
} from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import React from "react";
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: "90%",
            padding: "1em",
            height: "auto",
            boxShadow: "0 1em 2em  #e1e1e1",
        },
        bar: {
            padding: "1.5em 1em 5em 1em ",
            marginBottom: "5em",
        },
        sectionTitle: {
            fontSize: "1.5em !important",
            fontWeight: "600 !important",
            marginBottom: "0.5em",
        },
        sectionBody: {
            margin: "2em 0",
        },
    })
);
interface props {
    userState: any;
    toggleCatagory: (catagory: "mens" | "womens" | "kids") => void;
    handleSlider: (
        e: Event | React.SyntheticEvent<Element, Event>,
        value: number | number[]
    ) => void;
}
export default function Sidebar(props: props) {
    const classes = useStyles();
    const { userState, toggleCatagory, handleSlider } = props;
    return (
        <div className={classes.root}>
            <Grid
                container
                spacing={3}
                direction="column"
                className={classes.bar}
            >
                <Grid item className={classes.sectionBody}>
                    <div className={classes.sectionTitle}> Price</div>
                    <Slider
                        size="small"
                        value={userState.slider.val}
                        onChangeCommitted={handleSlider}
                        aria-label="Small"
                        step={userState.slider.max / userState.slider.min}
                        min={userState.slider.min}
                        max={userState.slider.max}
                        valueLabelDisplay="auto"
                    />
                    <div>
                        Range: {userState.slider.min} - {userState.slider.val}
                    </div>
                </Grid>
                <Grid item className={classes.sectionBody}>
                    <div className={classes.sectionTitle}> Catagory</div>

                    <Grid item>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    onChange={() => toggleCatagory("mens")}
                                    checked={userState.catagory.mens}
                                />
                            }
                            label="Men's Wear"
                        />
                    </Grid>
                    <Grid item>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    onChange={() => toggleCatagory("womens")}
                                    checked={userState.catagory.womens}
                                />
                            }
                            label="Ladies Wear"
                        />
                    </Grid>
                    <Grid item>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    onChange={() => toggleCatagory("kids")}
                                    checked={userState.catagory.kids}
                                />
                            }
                            label="Kids Wear"
                        />
                    </Grid>
                </Grid>

                <Grid item className={classes.sectionBody}>
                    <div className={classes.sectionTitle}> Brands</div>

                    <Grid container>
                        <Grid item>
                            <FormControlLabel
                                value="rbk"
                                control={<Radio />}
                                label="Reebok"
                            />
                        </Grid>
                        <Grid item>
                            <FormControlLabel
                                value="gucci"
                                control={<Radio />}
                                label="Gucci"
                            />
                        </Grid>
                        <Grid item>
                            <FormControlLabel
                                value="puma"
                                control={<Radio />}
                                label="Puma"
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <div className={classes.sectionTitle}> Tags</div>

                    <Grid container>
                        <Grid item>
                            <FormControlLabel
                                value="rbk"
                                control={<Radio />}
                                label="Shirts"
                            />
                        </Grid>
                        <Grid item>
                            <FormControlLabel
                                value="gucci"
                                control={<Radio />}
                                label="Pants"
                            />
                        </Grid>
                        <Grid item>
                            <FormControlLabel
                                value="puma"
                                control={<Radio />}
                                label="One-Piece"
                            />
                        </Grid>
                        <Grid item>
                            <FormControlLabel
                                value="puma"
                                control={<Radio />}
                                label="Traditional"
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}
