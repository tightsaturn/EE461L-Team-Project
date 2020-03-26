import React from "react";
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
            </div>
        </div>
    )
}

class Pokemon_Team extends React.Component {
    constructor() {
        super();
        this.state = {
            pokemon1: {
                image: BlankPokemon,
                name: "Who's that Pokemon?",
                type: "Unknown"
            },
            pokemon2: {
                image: BlankPokemon,
                name: "Who's that Pokemon?",
                type: "Unknown"
            },
            pokemon3: {
                image: BlankPokemon,
                name: "Who's that Pokemon?",
                type: "Unknown"
            },
            pokemon4: {
                image: BlankPokemon,
                name: "Who's that Pokemon?",
                type: "Unknown"
            },
            pokemon5: {
                image: BlankPokemon,
                name: "Who's that Pokemon?",
                type: "Unknown"
            },
            pokemon6: {
                image: BlankPokemon,
                name: "Who's that Pokemon?",
                type: "Unknown"
            }
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
                            image = {this.state.pokemon1.image}
                            name = {this.state.pokemon1.name}
                            type = {this.state.pokemon1.type}
                        />
                    </div>

                    <div class = "col-lg-2 grid-margin" id = "card-col">
                        <Pokemon_Card
                            number = '2'
                            image = {this.state.pokemon2.image}
                            name = {this.state.pokemon2.name}
                            type = {this.state.pokemon2.type}
                        />
                    </div>

                    <div class = "col-lg-2 grid-margin" id = "card-col">
                        <Pokemon_Card
                            number = '3'
                            image = {this.state.pokemon3.image}
                            name = {this.state.pokemon3.name}
                            type = {this.state.pokemon3.type}
                        />
                    </div>

                    <div class = "col-lg-2 grid-margin" id = "card-col">
                        <Pokemon_Card
                            number = '4'
                            image = {this.state.pokemon4.image}
                            name = {this.state.pokemon4.name}
                            type = {this.state.pokemon4.type}
                        />
                    </div>

                    <div class = "col-lg-2 grid-margin" id = "card-col">
                        <Pokemon_Card
                            number = '5'
                            image = {this.state.pokemon5.image}
                            name = {this.state.pokemon5.name}
                            type = {this.state.pokemon5.type}
                        />
                    </div>

                    <div class = "col-lg-2 grid-margin" id = "card-col">
                        <Pokemon_Card
                            number = '6'
                            image = {this.state.pokemon6.image}
                            name = {this.state.pokemon6.name}
                            type = {this.state.pokemon6.type}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default Pokemon_Team
