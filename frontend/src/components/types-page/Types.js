import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import "../../App.css"
import "../../css/page.css"
import TypeBox from "./TypeBox"
import bug from "../../images/Types/Bug.png";
import dark from "../../images/Types/Dark.png";
import dragon from "../../images/Types/Dragon.png";
import electric from "../../images/Types/Electric.png";
import fairy from "../../images/Types/Fairy.png";
import fighting from "../../images/Types/Fighting.png";
import fire from "../../images/Types/Fire.png";
import flying from "../../images/Types/Flying.png";
import ghost from "../../images/Types/Ghost.png";
import grass from "../../images/Types/Grass.png";
import ground from "../../images/Types/Ground.png";
import ice from "../../images/Types/Ice.png";
import normal from "../../images/Types/Normal.png";
import poison from "../../images/Types/Poison.png";
import psychic from "../../images/Types/Psychic.png";
import rock from "../../images/Types/Rock.png";
import steel from "../../images/Types/Steel.png";
import water from "../../images/Types/Water.png";
import chart from "../../images/Types/Types Chart.jpg"


const Pokemon = () => {
    return (
            <div className="container-fluid" id="infoContent" style={{marginTop: "150px"}}>
                <div className="row mt-5">
                    <TypeBox type="normal" src={normal}/>
                    <TypeBox type="fire" src={fire}/>
                    <TypeBox type="water" src={water}/>
                    <TypeBox type="grass" src={grass}/>
                    <TypeBox type="electric" src={electric}/>
                    <TypeBox type="ice" src={ice}/>
                    <TypeBox type="ground" src={ground}/>
                    <TypeBox type="flying" src={flying}/>
                    <TypeBox type="poison" src={poison}/>
                    <TypeBox type="fighting" src={fighting}/>
                    <TypeBox type="psychic" src={psychic}/>
                    <TypeBox type="dark" src={dark}/>
                    <TypeBox type="rock" src={rock}/>
                    <TypeBox type="bug" src={bug}/>
                    <TypeBox type="ghost" src={ghost}/>
                    <TypeBox type="steel" src={steel}/>
                    <TypeBox type="dragon" src={dragon}/>
                    <TypeBox type="fairy" src={fairy}/>
                     <div>
                    <img src={chart} style={{marginLeft: "7%", marginBottom: "24px"}}/>
                     </div>
                </div>
            </div>
    );
}

export default Pokemon;