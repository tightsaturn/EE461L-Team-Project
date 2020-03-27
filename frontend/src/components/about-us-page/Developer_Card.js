import React from "react";

function Developer_Card(props) {
    return (
        <div class="cards">
            <img class = "card-img-top" id = "dev-card-img" src = {props.image} alt = {props.name}/>
            <div class="card-body">
                <h4 class = "dev-card-title"> {props.name}</h4>
                <p class = "card-text">Track: {props.track}</p>
                <p class ="card-text">Responsibilities: {props.res} </p>
            </div>
        </div>
    )
}

export default Developer_Card