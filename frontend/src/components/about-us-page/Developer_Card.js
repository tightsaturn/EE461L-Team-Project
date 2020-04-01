import React from "react";

function Developer_Card(props) {
    return (
        <div className="cards">
            <img className = "card-img-top" id = "dev-card-img" src = {props.image} alt = {props.name}/>
            <div className="card-body">
                <h4 className = "dev-card-title"> {props.name}</h4>
                <p className = "card-text">Track: {props.track}</p>
                <p className ="card-text">Responsibilities: {props.res} </p>
            </div>
        </div>
    )
}

export default Developer_Card