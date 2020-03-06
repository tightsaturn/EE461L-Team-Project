import React from 'react';
import Background from "./Background";
import Title from "./Title"
import Pokemon_Team from "./Pokemon_Team";
import squirtle from './squirtle.png'

const tableabilities = {
    marginTop: "70px",
    paddingLeft: "200px",
    paddingRight: "120px"
}

function Team_Builder_App() {
    return (
        <div style={tableabilities}>
            <Background/>
            <Title
                title = "Team Builder"
                subtitle = "Build your Ultimate Team"
            />

            <Pokemon_Team
                image = {squirtle}
                name = "Squrtle"
                type = "Water"
            />
        </div>
    )
}

export default Team_Builder_App;