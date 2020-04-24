import React from "react";
import {Link} from "react-router-dom";
import { Button } from 'react-bootstrap';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete'
import './css/Pokemon_Team.css';
import BlankPokemon from './css/BlankPokemon.png';
import axios from 'axios';
import { Card } from 'react-bootstrap';
import { Chip, Icon, Select } from '@material-ui/core' ;
import { Avatar } from "@material-ui/core";


function Pokemon_Card(props) {
    return (
        // <div className="card" id={"partycards"}>
        //     <img className = "card-img-top" id = "card-img" src = {props.image} alt = {props.name}/>
        //     <div className="card-body">
        //         <h4 className = "card-title"> Pokemon #{props.number}</h4>
        //         <p className = "card-text">{props.name}</p>
        //         <p className = "card-text">Type: {props.type}</p>
        //         <Link to = {"/teambuilder/addpokemon/" + props.number}>Change</Link>
        //     </div>
        // </div>

        <Card>
            <Card.Img variant = "top" src = {props.image} />

            <Card.Body>
                <Card.Title>Pokemon #{props.number}</Card.Title>
                <Card.Text>{props.name}</Card.Text>
                <Card.Text>{props.type}</Card.Text>
                <Link to = {"/teambuilder/addpokemon/" + props.number}>Change</Link>
            </Card.Body>
        </Card>
    )
}

class Pokemon_Team extends React.Component {
    constructor(props) {
        super(props);

        let pokemonTeam = []
        const pokemonCard = {
            image: BlankPokemon,
            name: "Who's that Pokemon?",
            nickname: "",
            level: 0,
            gender: "male",
            happiness: 0,
            shiny: "no",
            item: "none",
            itemInEditMode: false,
            ability: "none",
            moves: [],
            HP: 0,
            attack: 0,
            defense: 0,
            spAttack: 0,
            spDefense: 0,
            speed: 0,
            type: "Unknown"
        }

        for(let i = 0; i < 6; i++) {
            pokemonTeam.push(pokemonCard)
        }

        this.state = {
            pokemonCards : pokemonTeam,                 // Stores the data of each team member
            inEditMode: false                           // Provides the ability to edit pokemon team member stats
        }
        this.capitalize = this.capitalize.bind(this);
    }

    // When a user requests
    changeEditMode = () => {
        this.setState({
            inEditMode: !this.state.inEditMode
        })
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
                new_state[memberNum - 1].gender = "Male";

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
                new_state[i].nickname = "";
                new_state[i].level = 0;
                new_state[i].gender = "male";
                new_state[i].happiness = 0;
                new_state[i].shiny = "no";
                new_state[i].item = "none";
                new_state[i].ability = "none";
                new_state[i].moves = [];
                new_state[i].HP = 0;
                new_state[i].attack = 0;
                new_state[i].defense = 0;
                new_state[i].spAttack = 0;
                new_state[i].spDefense = 0;
                new_state[i].speed = 0;
                new_state[i].type = "Unknown";
            }
            this.setState({ pokemonCards: new_state })
        }
    }

    componentWillUnmount() {
        localStorage.setItem('teamBuilderState', JSON.stringify(this.state));
    }

    capitalize(name) {
        let firstLetter = name.charAt(0).toUpperCase()
        return (firstLetter + name.substring(1))
    }

    handleInputChange(event) {

    }

    render() {
        let pokemonCardArray = []
        let pokemonStatsArray = []
        for(let i = 0; i < 6; i++) {
            pokemonCardArray.push(
                <div className = "col-lg-2 grid-margin" id = "card-col">
                    <Pokemon_Card
                        number = {i+1}
                        image = {this.state.pokemonCards[i].image}
                        name = {this.state.pokemonCards[i].name}
                        type = {this.state.pokemonCards[i].type}
                    />
                </div>
            )

            pokemonStatsArray.push (
                <div className = "column">
                    <div id = "pokemon_stats">
                        <header>
                            <h4 id = "pokemon_stats_title">#{i+1}. {this.state.pokemonCards[i].name} | <span id = "pokemon_stats_nickname">{this.state.pokemonCards[i].nickname}</span></h4>
                            <hr color = "#ff0000"/>
                        </header>

                        <div class = "row">
                            {/* Picture on left side of stats */}
                            <div class = "column">
                                <img src = {this.state.pokemonCards[i].image} width = "75%" height = "75%"/>
                            </div>

                            {/* Stats on the right side of screen */}
                            <div class = "column">
                                <table className="stats_table">
                                    <tr id = "stats_table_header">
                                        <th>Stat</th>
                                        <th>Data</th>
                                    </tr>
                                    <tr>
                                        <td>Pokemon:</td>
                                        <td>{this.state.pokemonCards[i].name}</td>
                                    </tr>
                                    <tr>
                                        <td>Gender:</td>
                                        <td>{this.state.pokemonCards[i].gender}</td>
                                    </tr>
                                    <tr>
                                        <td>Level:</td>
                                        <td>{this.state.pokemonCards[i].level}</td>
                                    </tr>
                                    <tr>
                                        <td>Item:</td>
                                        <td>{this.state.pokemonCards[i].item}</td>
                                    </tr>
                                </table>
                            </div>
                        </div>

                        <hr/>
                    </div> 
                </div>
            )
        }

        return (
            <div>
                <div style={{width: "100%"}}>
                    <Link to = "/teambuilder/resetTeam">
                        <button variant="outline-danger" onClick = {this.resetTeam}>Reset Team</button>
                    </Link>
                    <br/>
                    <br/>

                    <div className = "row">
                        {pokemonCardArray}
                    </div>
                </div>

                <hr/>

                {/* Pokemon stats and form */}
                <div>
                    {pokemonStatsArray}
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
