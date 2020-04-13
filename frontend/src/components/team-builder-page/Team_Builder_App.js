import React from 'react';
import "../../css/page.css"
import Pokemon_Team from "./Pokemon_Team";


function Team_Builder_App() {
    return (
        <div className="container-fluid" id="infoContent" style={{textAlign: "justify"}}>
                <h1>Team Builder</h1>
                <h3>Build the Ultimate Team</h3>
            <br/>

            <h5>Team Members:</h5>
            <Pokemon_Team/>
        </div>
    )
}

export default Team_Builder_App;