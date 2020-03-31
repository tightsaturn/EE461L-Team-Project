import {Link} from "react-router-dom";
import React from "react";

const PokemonMoveBox = (props) => {
    return (
        <tr>
            <th scope="row">{props.id}</th>
            <td><Link to={"/abilities/" + props.id}>{props.name}</Link></td>
            <td>{props.description}</td>
            <td>{props.generation}</td>
        </tr>
    )
}