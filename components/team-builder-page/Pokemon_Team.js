import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import './Pokemon_Team.css';

const Pokemon_Card_Style = makeStyles(theme => ({
    pokemon_card: {
        flexGrow: 1,
    },
    pokemon_card_paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        elevation: 24,
    },
    pokemon_card_img: {
        width: 50,
        height: 50,
    },
}));

function Pokemon_Card(props) {
    const classes = Pokemon_Card_Style();

    return (
        //  <div className={classes.pokemon_card}>
        //     <Paper className={classes.pokemon_card_paper} elevation={24}>
        //         <Grid container spacing = {2}>
        //             <Grid item xs = {12} sm container direction = "column" spacing = {2}>
        //                 <Grid item xs>
        //                     <Typography variant={"body1"}>Pokemon #{props.number}</Typography>
        //                 </Grid>
        //                 <Grid item xs>
        //                     <img className={classes.pokemon_card_img} src = {props.image} alt = {props.name}/>
        //                 </Grid>
        //                 <Grid item xs>
        //                     <Typography gutterBottom variant = "subtitle1">{props.name}</Typography>
        //                     <Typography variant = "body2" gutterBottom>Type: {props.type}</Typography>
        //                 </Grid>
        //             </Grid>
        //         </Grid>
        //     </Paper>
        // </div>

        <div class = "container" id = "card">
            <div id = "card_number">
                <h3>Pokemon #{props.number}</h3>
            </div>
            <div id = "card_image_cont">
                <img id = "card_image" src = {props.image} alt = {props.name}/>
            </div>
            <div id = "card_info">
                <h5>{props.name}</h5>
                <h5>Type: {props.type}</h5>
            </div>
        </div>
    )
}

//
function Pokemon_Team(props) {
    return (
        <React.Fragment>
            <Grid item xs = {2}>
                <Pokemon_Card
                    number = "1"
                    image = {props.image}
                    name = {props.name}
                    type = {props.type}
                />
            </Grid>
        </React.Fragment>
    )
}

export default Pokemon_Team
