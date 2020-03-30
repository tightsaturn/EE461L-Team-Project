import React from 'react';
import Background from "./Background";
import Pokemon_Team from "./Pokemon_Team";
import {Link} from "react-router-dom";
import Button from "react-bootstrap/Button";
import axios from 'axios'

const tableAbilities = {
 //   backgroundColor: "blue",
    marginTop: "100px",
    marginLeft: "300px",
    marginRight: "150px",
    width: "70%"
}

function Team_Builder_App() {
    return (
        <div className="container-fluid" style={tableAbilities}>
            <Background/>
                <h1>Team Builder</h1>
                <h3>Build the Ultimate Team</h3>
            <br/>

            <h5>Team Members:</h5>
            <Pokemon_Team/>
        </div>
    )
}

export default Team_Builder_App;