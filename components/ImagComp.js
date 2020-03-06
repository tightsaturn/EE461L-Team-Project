import React from "react"
import pikachu from "../images/pikachu.png"
import bulbasaur from "../images/bulbasaur.png"


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


function ImagComp(props){
    return (
        <div>
            <img src={props.pokemon} style={pokemon}/>
            <img src={props.src} style={background_img} alt="slide-img"/>
        </div>
    )
}

export default ImagComp