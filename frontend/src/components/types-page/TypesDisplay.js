import React from "react"
import "../../css/page.css"

const TypesDisplay = (props) => {
    return (
        <div className="container-fluid" id="infoContent">
            <div className="jumbotron">
                All {props.match.params.type} types displayed here
            </div>
        </div>
    )
}

export default TypesDisplay