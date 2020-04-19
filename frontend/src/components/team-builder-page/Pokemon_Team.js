import React from "react";
import {Link} from "react-router-dom";
import './css/Pokemon_Team.css';
import BlankPokemon from './css/BlankPokemon.png'
import axios from 'axios'


function Pokemon_Card(props) {
    return (
        <div className="card" id={"partycards"}>
            <img className = "card-img-top" id = "card-img" src = {props.image} alt = {props.name}/>
            <div className="card-body">
                <h4 className = "card-title"> Pokemon #{props.number}</h4>
                <p className = "card-text">{props.name}</p>
                <p className = "card-text">Type: {props.type}</p>
                <Link to = {"/teambuilder/addpokemon/" + props.number}>Change</Link>
            </div>
        </div>
    )
}

class Pokemon_Team extends React.Component {
    constructor(props) {
        super(props);

        let pokemonCardArray = []
        const pokemonCard = {
            image: BlankPokemon,
            name: "Who's that Pokemon?",
            type: "Unknown"
        }

        for(let i = 0; i < 6; i++) {
            pokemonCardArray.push(pokemonCard)
        }

        this.state = {
            pokemonCards : pokemonCardArray
        }
        this.resetTeam = this.resetTeam.bind(this);
        this.capitalize = this.capitalize.bind(this);
    }

    UNSAFE_componentWillMount() {
        const savedState = JSON.parse(localStorage.getItem('teamBuilderState'));
        this.setState(savedState);
    }

    componentDidMount() {
        // Check URL to see if an action needs to be done
        // console.log(window.location.pathname);
        let path = window.location.pathname.split('/')
        // console.log(path);

        if (path.length == 5 && path[2].localeCompare("change") == 0) {             // If '/teambuilder/change/:memberNum/:pokemonId', update the team member with the new pokemon
            let memberNum = Number(path[3]);
            let pokemonId = Number(path[4]);

            console.log("memberNum: " + memberNum);
            console.log("pokemonId: " + pokemonId);

            // fetch the pokemon
            axios.get('https://pokeapi.co/api/v2/pokemon/' + pokemonId)
            .then(response => {
                console.log(response.data)
                let new_state = this.state.pokemonCards.slice();
                var type = "";
                new_state[memberNum - 1].image = response.data.sprites.front_default;
                new_state[memberNum - 1].name = this.capitalize(response.data.name);

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

    capitalize(name) {
        let firstLetter = name.charAt(0).toUpperCase()
        return (firstLetter + name.substring(1))
    }

    render() {
        let pokemonArray = []
        for(let i = 0; i < 6; i++) {
            pokemonArray.push(
                <div className = "col-lg-2 grid-margin" id = "card-col">
                    <Pokemon_Card
                        number = {i+1}
                        image = {this.state.pokemonCards[i].image}
                        name = {this.state.pokemonCards[i].name}
                        type = {this.state.pokemonCards[i].type}
                    />
                </div>
            )
        }

        return (
            <div style={{width: "100%"}}>
                {/* <Link to = "/teambuilder/resetTeam"> */}
                    <button variant="outline-danger" onClick = {this.resetTeam}>Reset Team</button>
                {/* </Link> */}
                <br/>
                <br/>

                <div className = "row">
                    {pokemonArray}
                </div>

                <div id = "pokemonStats" color = "black">
                    
                </div> 
            </div>
        )
    }
}

function TeamPageMain() {
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

export default TeamPageMain
