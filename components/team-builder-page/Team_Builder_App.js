import React from 'react';
import Background from "./Background";
import Pokemon_Team from "./Pokemon_Team";
import squirtle from './squirtle.png'

const tableAbilities = {
 //   backgroundColor: "blue",
    marginTop: "150px",
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
                <br></br>

                <h5>Team Members:</h5>
                <Pokemon_Team
                    image1 = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png"
                    name1 = "Squrtle"
                    type1 = "Water"

                    image2 = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png"
                    name2 = "Squrtle"
                    type2 = "Water"

                    image3 = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png"
                    name3 = "Squrtle"
                    type3 = "Water"

                    image4 = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png"
                    name4 = "Squrtle"
                    type4 = "Water"

                    image5 = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png"
                    name5 = "Squrtle"
                    type5 = "Water"

                    image6 = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png"
                    name6 = "Squrtle"
                    type6 = "Water"
                />
        </div>
    )
}

export default Team_Builder_App;