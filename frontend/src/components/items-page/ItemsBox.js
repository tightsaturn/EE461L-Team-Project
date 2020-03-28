import React from "react"
import {Link} from "react-router-dom";
import Button from "react-bootstrap/Button";

const pokemonCard = {
    width: "30%",
    height: "auto",
    object: "contain"
}

const ItemsBox = (props) => {
    return (
        <tr>
            <th scope="row">{props.id}</th>
            <td><Link to={"/items/" + props.name}>{props.name}</Link></td>
            <td>{props.effect}</td>
            <td><img className="card-img-top" src={props.picture} alt="Card image cap" style={pokemonCard}/></td>
        </tr>
    )
}

export default ItemsBox