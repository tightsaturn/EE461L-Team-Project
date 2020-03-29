import React from "react";
import {Link} from "react-router-dom";
import './css/Pokemon_Team.css';
import BlankPokemon from './css/BlankPokemon.png'

const tableAbilities = {
   // marginLeft: "350px",
    marginTop: "40px",
    marginRight: "50px",
    width: "80%",
    height: "100%",
}

function Pokemon_Card(props) {
    return (
        <div class="card" id={"partycards"}>
            <img class = "card-img-top" id = "card-img" src = {props.image} alt = {props.name}/>
            <div class="card-body">
                <h4 class = "card-title"> Pokemon #{props.number}</h4>
                <p class = "card-text">{props.name}</p>
                <p class = "card-text">Type: {props.type}</p>
                <Link to = {"/teambuilder/addpokemon/" + props.number}>Change</Link>
            </div>
        </div>
    )
}

class Pokemon_Team extends React.Component {
    constructor() {
        super();
        this.state = {
            pokemonCards : [
                {
                    image: BlankPokemon,
                    name: "Who's that Pokemon?",
                    type: "Unknown" 
                },
                {
                    image: BlankPokemon,
                    name: "Who's that Pokemon?",
                    type: "Unknown" 
                },
                {
                    image: BlankPokemon,
                    name: "Who's that Pokemon?",
                    type: "Unknown" 
                },
                {
                    image: BlankPokemon,
                    name: "Who's that Pokemon?",
                    type: "Unknown" 
                },
                {
                    image: BlankPokemon,
                    name: "Who's that Pokemon?",
                    type: "Unknown" 
                },
                {
                    image: BlankPokemon,
                    name: "Who's that Pokemon?",
                    type: "Unknown" 
                },
            ]
        }
    }

    componentDidMount() {
        // This is where you will get data from the database
    }

    render() {
        return (
            <div style={{width: "100%"}}>
                <div class = "row">
                    <div class = "col-lg-2 grid-margin" id = "card-col">
                        <Pokemon_Card
                            number = '1'
                            image = {this.state.pokemonCards[0].image}
                            name = {this.state.pokemonCards[0].name}
                            type = {this.state.pokemonCards[0].type}
                        />
                    </div>

                    <div class = "col-lg-2 grid-margin" id = "card-col">
                        <Pokemon_Card
                            number = '2'
                            image = {this.state.pokemonCards[1].image}
                            name = {this.state.pokemonCards[1].name}
                            type = {this.state.pokemonCards[1].type}
                        />
                    </div>

                    <div class = "col-lg-2 grid-margin" id = "card-col">
                        <Pokemon_Card
                            number = '3'
                            image = {this.state.pokemonCards[2].image}
                            name = {this.state.pokemonCards[2].name}
                            type = {this.state.pokemonCards[2].type}
                        />
                    </div>

                    <div class = "col-lg-2 grid-margin" id = "card-col">
                        <Pokemon_Card
                            number = '4'
                            image = {this.state.pokemonCards[3].image}
                            name = {this.state.pokemonCards[3].name}
                            type = {this.state.pokemonCards[3].type}
                        />
                    </div>

                    <div class = "col-lg-2 grid-margin" id = "card-col">
                        <Pokemon_Card
                            number = '5'
                            image = {this.state.pokemonCards[4].image}
                            name = {this.state.pokemonCards[4].name}
                            type = {this.state.pokemonCards[4].type}
                        />
                    </div>

                    <div class = "col-lg-2 grid-margin" id = "card-col">
                        <Pokemon_Card
                            number = '6'
                            image = {this.state.pokemonCards[5].image}
                            name = {this.state.pokemonCards[5].name}
                            type = {this.state.pokemonCards[5].type}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default Pokemon_Team
