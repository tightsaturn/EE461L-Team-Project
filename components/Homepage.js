import React,{useState} from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "../css/Homepage.scss"
import img1 from "../images/togepi.png"
import imgb1 from "../images/togepi_background.jpg"
import img2 from "../images/eevee.png"
import imgb2 from "../images/eevee_background.jpg"
import img3 from "../images/pikachu.png"
import imgb3 from "../images/pikachu_background.png"
import ImagComp from "./ImagComp";
import img4 from "../images/bulbasaur.png"
import imgb4 from "../images/bulbasaur_background.jpg"

const Homepage = () => {

    let sliderArr = [<ImagComp src={imgb1} pokemon={img1} text="Welcome to Togepedia"/>,
        <ImagComp src={imgb2} pokemon={img2} text="Explore Pokemon"/>,
        <ImagComp src={imgb3} pokemon={img3} text="Learn more Info"/>,
        <ImagComp src={imgb4} pokemon={img4} text="Build Teams"/>]
    const [x, setX] = useState(0)

    let slidesArray = sliderArr.map((item, index) => {
        return (
            <div key={index} className="slide" style={{transform: `translateX(${x}%)`}}>

                {item}
                <span>  {index}</span>
            </div>
        )
    })

    let goL = () => {
        (x === 0) ? setX(0): setX(x + 100)
    }
    let goR = () => {
        console.log(x);
        (x === -100*(sliderArr.length-1)) ? setX(0): setX(x - 100)
    }

    return (
        <div className="slider">
            {slidesArray}
            <button className="goLeft" onClick={goL}>
                <i className="fas fa-chevron-left buttonImg"></i>
            </button>
            <button className="goRight" onClick={goR}>
                <i className="fas fa-chevron-right buttonImg"></i>

            </button>
        </div>
    )
}

export default Homepage
