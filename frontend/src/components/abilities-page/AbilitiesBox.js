import React from "react"
import {Link} from "react-router-dom";
import Button from "react-bootstrap/Button";

const AbilitiesBox = (props) => {
    return (
        <tr>
            <th scope="row">{props.id}</th>
            <td><Link to={"/abilities/" + props.id}>{props.name}</Link></td>
            <td>{props.description}</td>
            <td>{props.generation}</td>
        </tr>
    )
}

export default AbilitiesBox