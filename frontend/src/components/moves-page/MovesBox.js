import React from "react"
import { Link } from "react-router-dom";
import {capitalize} from "../componentFunctions";
import Button from "react-bootstrap/Button"


const MovesBox = (props) => {
    return (
        <div className="col-sm-3 mb-4 grid-margin">
            <div className="card">
                <div className="card-header">
                    {props.name}
                </div>
                <div className="card-body">
                    <div className="card-text">
                        <Link to={"/types/" + props.type}>
                            <img src={require(`../../images/Types/${capitalize(props.type)}.png`)}
                                style={{width: "90%", maxWidth: "100px"}}/>
                        </Link>
                    </div>
                </div>
                <div className="card-footer">
                    <Link to={"/moves/" + props.name.toLowerCase()}>
                        <Button on variant="btn btn-danger" style={{fontWeight: "bold"}}>Learn more</Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default MovesBox