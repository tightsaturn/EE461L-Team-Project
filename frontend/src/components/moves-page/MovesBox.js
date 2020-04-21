import React from "react"
import {Link, BrowserRouter} from "react-router-dom";
import Button from "react-bootstrap/Button";


const MovesBox = (props) => {
    return (
        <div className="col-sm-3 mb-4 grid-margin">
            <div className="card">
                <div className="card-header">
                    {props.name}
                </div>
                <div className="card-body">
                    <div className="card-text">
                        {props.type}
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