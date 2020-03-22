import React from "react"

const header = {
    marginLeft: "100px",
    width: "100%",
    textAlign: "center",
    marginRight: 0,
    position: "relative",
    zIndex: -3
}

const TypesDisplay = (props) => {
    return (
        <div className="container-fluid">
            <div className="jumbotron" style={header}>
                All {props.match.params.type} types displayed here
            </div>
        </div>
    )
}

export default TypesDisplay