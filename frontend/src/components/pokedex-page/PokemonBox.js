import React from "react"
import {Link, BrowserRouter} from "react-router-dom";
import Button from "react-bootstrap/Button";


const PokemonBox = (props) => {
    return (
        <div className="col-sm-2 mb-4 grid-margin">
            <div className="card">
                <img className="card-img-top" src={props.imgURL} alt="Card image cap"/>
                    <div className="card-body">
                        <hr/>
                        <div className="card-text">
                            # {props.id} <br/>
                            {props.name}
                        </div>
                    </div>
                    <div className="card-footer">
                        <Link to={"/pokemon/" + props.id}>
                            <Button on variant="btn btn-danger" style={{fontWeight: "bold"}}>Learn more</Button>
                        </Link>
                    </div>
            </div>
        </div>
    )
}

export default PokemonBox