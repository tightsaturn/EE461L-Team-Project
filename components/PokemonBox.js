import React from "react"
import {Link} from "react-router-dom";
import Button from "react-bootstrap/Button";



const PokemonBox = (props) => {
    return (
        <div className="col-3">
            <div className="card h-20">
                <h4 className="card-header">{}</h4>
                <div className="card-body">
                    <p className="card-text">{props.pokemon.type}</p>
                </div>
                <div className="card-footer">
                    <Link to={"/restaurant/info"}>
                        <Button variant="btn btn-danger">Learn More</Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default PokemonBox