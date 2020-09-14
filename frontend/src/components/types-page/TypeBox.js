import React from "react"
import {Link} from "react-router-dom";

const TypeBox = (props) => {
    return (
        <div className="col-lg-2 mb-3 grid-margin">
            <Link to={"types/" + props.type}>
                <img className="slideImg" src={props.src}/>
            </Link>
        </div>
    )
}

export default TypeBox