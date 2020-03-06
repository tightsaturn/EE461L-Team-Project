import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import './Pokemon_Team.css';

function Pokemon_Card(props) {
    return (
        <div class="card">
            <img class = "card-img-top" id = "card-img" src = {props.image} alt = {props.name}/>
            <div class="card-body">
                <h4 class = "card-title"> Pokemon #{props.number}</h4>
                <p class = "card-text">{props.name}</p>
                <p class = "card-text">Type: {props.type}</p>
            </div>
        </div>
    )
}

function Pokemon_Team(props) {
    return (
        <div className = "container">
            <div class = "row">
                <div class = "col-lg-2 grid-margin" id = "card-col">
                    <Pokemon_Card
                       number = '1'
                       image = {props.image1}
                       name = {props.name1}
                       type = {props.type1}
                    />
                </div>

                <div class = "col-lg-2 grid-margin" id = "card-col">
                    <Pokemon_Card
                        number = '2'
                        image = {props.image2}
                        name = {props.name2}
                        type = {props.type2}
                    />
                </div>

                <div class = "col-lg-2 grid-margin" id = "card-col">
                    <Pokemon_Card
                        number = '3'
                        image = {props.image3}
                        name = {props.name3}
                        type = {props.type3}
                    />
                </div>

                <div class = "col-lg-2 grid-margin" id = "card-col">
                    <Pokemon_Card
                        number = '4'
                        image = {props.image4}
                        name = {props.name4}
                        type = {props.type4}
                    />
                </div>

                <div class = "col-lg-2 grid-margin" id = "card-col">
                    <Pokemon_Card
                        number = '5'
                        image = {props.image5}
                        name = {props.name5}
                        type = {props.type5}
                    />
                </div>

                <div class = "col-lg-2 grid-margin" id = "card-col">
                    <Pokemon_Card
                        number = '6'
                        image = {props.image6}
                        name = {props.name6}
                        type = {props.type6}
                    />
                </div>
            </div>
        </div>
    )
}

export default Pokemon_Team
