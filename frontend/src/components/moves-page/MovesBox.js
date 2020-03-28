import React from "react"
import {Link} from "react-router-dom";
import Button from "react-bootstrap/Button";

const pokemonCard = {
    width: "18 rem"
}

const MovesBox = (props) => {
    return (
        <tr>
            <th scope="row">{props.id}</th>
            <td><Link to={"/abilities/" + props.name}>{props.name}</Link></td>
            <td>{props.effect}</td>
            <td>{props.type}</td>
        </tr>
    )
}

export default MovesBox