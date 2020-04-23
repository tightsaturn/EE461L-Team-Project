import React from "react"
import {Link} from "react-router-dom";

const pokemonCard = {
    width: "30%",
    height: "auto",
    object: "contain"
}
    .img  ={
    maxWidth: "100%",
    maxHeight: "100%"
}

    .portrait = {
    height: "auto",
    width: "auto"
}

const TypesDisplayBox = (props) => {
    return (
        <tr>
            <th scope="row"></th>
            <td><Link to={"/items/" + props.id}>{props.name}</Link></td>
            <td>{props.effect}</td>
            <td><img className="portrait" src={props.picture} alt="Card image cap" style={pokemonCard}/></td>
        </tr>
    )
}

export default TypesDisplayBox