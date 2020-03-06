import React from 'react';
import Background from "./Background";
import Title from "./Title"
import Pokemon_Team from "./Pokemon_Team";
import squirtle from './squirtle.png'

function Team_Builder_App() {
    return (
        <div>
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