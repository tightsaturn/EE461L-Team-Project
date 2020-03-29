import React from "react"
import {Link} from "react-router-dom";
import Button from "react-bootstrap/Button";

const pokemonCard = {
    width: "18 rem"
}

const PokemonBox = (props) => {
    return (
        <div className="col-lg-4 mb-4 grid-margin">
            <div className="card" style={pokemonCard}>
                <img className="card-img-top" src={props.imgURL} alt="Card image cap"/>
                    <div className="card-body">
                        <hr/>
                        <p className="card-text">
                            # {props.id} <br/>
                            Name: {props.name}
                        </p>
                    </div>
                    <div className="card-footer">
                        <Link to={"/pokemon/" + props.id}>
                            <Button on variant="btn btn-danger">Learn more</Button>
                        </Link>
                    </div>
            </div>
        </div>
    )
}

export default PokemonBox