import React from "react";
import {Link} from "react-router-dom";
import './css/Pokemon_Team.css';
import BlankPokemon from './css/BlankPokemon.png'
import axios from 'axios'

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
    constructor(props) {
        super(props);
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

        this.resetTeam = this.resetTeam.bind(this);
    }

    componentWillMount() {
        const savedState = JSON.parse(localStorage.getItem('teamBuilderState'));
        this.setState(savedState);
    }

    componentDidMount() {
        // Check URL to see if an action needs to be done
        console.log(window.location.pathname);
        var path = window.location.pathname.split('/')
        console.log(path);

        if (path.length == 5 && path[2].localeCompare("change") == 0) {             // If '/teambuilder/change/:memberNum/:pokemonId', update the team member with the new pokemon
            var memberNum = Number(path[3]);
            var pokemonId = Number(path[4]);

            console.log("memberNum: " + memberNum);
            console.log("pokemonId: " + pokemonId);

            // fetch the pokemon
            axios.get('https://pokeapi.co/api/v2/pokemon/' + pokemonId)
            .then(response => {
                console.log(response.data)
                let new_state = this.state.pokemonCards.slice();
                var type = "";
                new_state[memberNum - 1].image = response.data.sprites.front_default;
                new_state[memberNum - 1].name = response.data.name;

                for (let i = 0; i < response.data.types.length; i++) {
                    type += response.data.types[i].type.name + "\n";
                }

                new_state[memberNum - 1].type = type;
                this.setState({ pokemonCards: new_state})

            })
            .catch((error) => {
                console.log(error);
            })
        }
        else if (path.length == 3 && path[2].localeCompare("resetTeam") == 0) {
            console.log("Resetting pokemon team");
            let new_state = this.state.pokemonCards.slice();
            for (let i = 0; i < 6; i++) {
                new_state[i].image = BlankPokemon;
                new_state[i].name = "Who's that Pokemon?";
                new_state[i].type = "Unknown";
            }
            this.setState({ pokemonCards: new_state })
        }
    }

    componentWillUnmount() {
        localStorage.setItem('teamBuilderState', JSON.stringify(this.state));
    }

    resetTeam() {
        console.log("Resetting pokemon team");
        let new_state = this.state.pokemonCards.slice();
        for (let i = 0; i < 6; i++) {
            new_state[i].image = BlankPokemon;
            new_state[i].name = "Who's that Pokemon?";
            new_state[i].type = "Unknown";
        }
        this.setState({ pokemonCards: new_state }) 
    }

    render() {
        return (
            <div style={{width: "100%"}}>
                {/* <Link to = "/teambuilder/resetTeam"> */}
                    <button variant="outline-danger" onClick = {this.resetTeam}>Reset Team</button>
                {/* </Link> */}
                <br/>
                <br/>

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
