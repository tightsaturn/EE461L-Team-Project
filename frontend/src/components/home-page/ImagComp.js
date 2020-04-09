import React from "react"
import pikachu from "../../images/pikachu.png"
import bulbasaur from "../../images/bulbasaur.png"


const pokemon = {
    position: "absolute",
    left: "25%",
    top: "50%",
    width: "200px",
    height: "200px"
}

const background_img = {
    width: "100vw",
    height: "100vh"
}

const text = {
    position: "absolute",
    top: "8%",
    left: "230px",
    background: "rgb(0, 0, 0, 0.0)",
    color: "white",
    fontSize: 80,
    fontWeight: "bold"
}


function ImagComp(props){
    return (
        <div>
            <div className="greeting" style={text}>
                {props.text}
            </div>
            <img src={props.src} style={background_img} alt="slide-img"></img>
        </div>
    )
}

export default ImagComp