import React from "react"
import "../../css/page.css"
import { capitalize } from "../componentFunctions";

const TypesDisplay = (props) => {
    return (
        <div className="container-fluid" id="infoContent">
            <div className="jumbotron">
                All {capitalize(props.match.params.type)} types displayed here
            </div>
        </div>
    )
}

export default TypesDisplay