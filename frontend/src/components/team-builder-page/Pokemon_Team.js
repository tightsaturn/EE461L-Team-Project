import React from "react";
import {Link} from "react-router-dom";
import { Button } from 'react-bootstrap';
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check'
import ClearIcon from '@material-ui/icons/Clear'
import './css/Pokemon_Team.css';
import BlankPokemon from './css/BlankPokemon.png';
import axios from 'axios';
import { Card } from 'react-bootstrap';
import { Chip, Icon, Select } from '@material-ui/core' ;
import { Avatar } from "@material-ui/core";
import Table from 'react-bootstrap/Table'
import Popover from 'react-bootstrap/Popover'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'


function Pokemon_Card(props) {
    return (
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
            nickname_buffer: "",
            level: 100,
            gender: "male",
            happiness: 255,
            shiny: "no",
            item: "none",
            item_buffer: "",
            available_items: [],
            itemInEditMode: false,
            ability: "none",
            ability_buffer: "",
            available_abilities: [],
            moves: [],
            moves_buffer: "",
            available_moves: [],
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
        }
        this.resetTeam = this.resetTeam.bind(this);
        this.capitalize = this.capitalize.bind(this);
        this.changeNickname = this.changeNickname.bind(this);
        this.submitNickname = this.submitNickname.bind(this);
        this.changeAbility = this.changeAbility.bind(this);
        this.submitAbility = this.submitAbility.bind(this);
        this.changeMove = this.changeMove.bind(this);
        this.submitMove = this.submitMove.bind(this);
    }

    UNSAFE_componentWillMount() {
        const savedState = JSON.parse(localStorage.getItem('teamBuilderState'));
        this.setState(savedState)

        // fix bug with local state not having attributes
        /*this.setState({
            pokemonCards: this.state.pokemonCards.map((item, index) =>
                index < 6 ? { ...item, available_abilities: [] } : item,
            )
        })*/
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
                new_state[memberNum - 1].available_abilities = [];

                for (let i = 0; i < response.data.abilities.length; i++) {
                    new_state[memberNum - 1].available_abilities.push(response.data.abilities[i].ability.name);
                }

                new_state[memberNum - 1].available_moves = [];

                for (let i = 0; i < response.data.moves.length; i++) {
                    new_state[memberNum - 1].available_moves.push(response.data.moves[i].move.name);
                }

                new_state[memberNum - 1].available_items = [];

                // for (let i = 0; i < response.data.items.length; i++) {
                //     new_state[memberNum - 1].available_items.push(response.data.moves[i].item.name);
                // }

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
                new_state[i].level = 100;
                new_state[i].gender = "male";
                new_state[i].happiness = 0;
                new_state[i].shiny = "no";
                new_state[i].item = "none";
                new_state[i].ability = "none";
                new_state[i].available_abilities = [];
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

    resetTeam() {
        localStorage.clear();
        console.log("Resetting pokemon team");
        let new_state = this.state.pokemonCards.slice();
        for (let i = 0; i < 6; i++) {
            new_state[i].image = BlankPokemon;
            new_state[i].name = "Who's that Pokemon?";
            new_state[i].type = "Unknown";
            new_state[i].available_abilities = [];
            new_state[i].available_moves = [];
        }
        this.setState({ pokemonCards: new_state }) 
    }

    capitalize(name) {
        let firstLetter = name.charAt(0).toUpperCase();
        return (firstLetter + name.substring(1));
    }

    changeNickname(i, nickname) {
        var new_state = this.state.pokemonCards.slice();
        new_state[i].nickname_buffer = nickname;
        this.setState({
            pokemonCards: new_state
        });
        console.log(this.state.pokemonCards[i]);
        //this.refs.nickname_overlay.hide();
    }

    submitNickname(i, event) {
        //let i = 1;
        var new_state = this.state.pokemonCards.slice();
        new_state[i].nickname = new_state[i].nickname_buffer;
        this.setState({
            pokemonCards: new_state
        });
        console.log(this.state.pokemonCards[i]);
        event.preventDefault();
    }

    changeAbility(i, ability) {
        var new_state = this.state.pokemonCards.slice();
        new_state[i].ability_buffer = ability;
        this.setState({
            pokemonCards: new_state
        });
        console.log(this.state.pokemonCards[i]);
        //this.refs.nickname_overlay.hide();
    }

    submitAbility(i,event) {
        //let i = 1;
        var new_state = this.state.pokemonCards.slice();
        new_state[i].ability = new_state[i].ability_buffer;
        this.setState({
            pokemonCards: new_state
        });
        console.log(this.state.pokemonCards[i]);
        event.preventDefault();
    }

    changeMove(i, move) {
        var new_state = this.state.pokemonCards.slice();
        new_state[i].moves_buffer = move;
        this.setState({
            pokemonCards: new_state
        });
        console.log(this.state.pokemonCards[i]);
        //this.refs.nickname_overlay.hide();
    }

    submitMove(i,move_index, event) {
        //let i = 1;
        var new_state = this.state.pokemonCards.slice();
        new_state[i].moves[move_index] = new_state[i].moves_buffer;
        this.setState({
            pokemonCards: new_state
        });
        console.log(this.state.pokemonCards[i]);
        event.preventDefault();
    }

    changeItem(i, item) {
        var new_state = this.state.pokemonCards.slice();
        new_state[i].items_buffer = item;
        this.setState({
            pokemonCards: new_state
        });
        console.log(this.state.pokemonCards[i]);
        //this.refs.nickname_overlay.hide();
    }

    submitItem(i, event) {
        //let i = 1;
        var new_state = this.state.pokemonCards.slice();
        new_state[i].item = new_state[i].items_buffer;
        this.setState({
            pokemonCards: new_state
        });
        console.log(this.state.pokemonCards[i]);
        event.preventDefault();
    }

    render() {
        let pokemonCardArray = []
        let pokemonStatsArray = []

        for(let i = 0; i < 6; i++) {
            let move_index = 0;

            const nickname_popover = (
                <Popover id = "nickname_popover">
                    <Popover.Title as = "h3">Change Nickname</Popover.Title>
                    <Popover.Content>
                        <form onSubmit = {(e) => {this.submitNickname(i, e)}}>
                            <input type = "text" name = "nickname" onChange = {(e) => this.changeNickname(i, e.target.value)}/>
                            <input type = "submit" value = "Submit"/>
                        </form>
                    </Popover.Content>
                </Popover>
            );

            const ability_popover = (
                <Popover id = "ability_popover">
                    <Popover.Title as = "h3">Change Ability</Popover.Title>
                    <Popover.Content>
                        <form onSubmit = {(e) => {this.submitAbility(i, e)}}>
                            <select onChange = {(e) => this.changeAbility(i, e.target.value)}>
                                {this.state.pokemonCards[i].available_abilities.map((x, y) => <option key = {y}>{x}</option>)}
                            </select>
                            <input type = "submit" value = "Submit"/>
                        </form>
                    </Popover.Content>
                </Popover>
            );

            const moves0_popover = (
                <Popover id = "moves_popover">
                    <Popover.Title as = "h3">Change Move</Popover.Title>
                    <Popover.Content>
                        <form onSubmit = {(e) => {this.submitMove(i, 0, e)}}>
                            <select onChange = {(e) => this.changeMove(i, e.target.value)}>
                                {this.state.pokemonCards[i].available_moves.map((x, y) => <option key = {y}>{x}</option>)}
                            </select>
                            <input type = "submit" value = "Submit"/>
                        </form>
                    </Popover.Content>
                </Popover>
            );

            const moves1_popover = (
                <Popover id = "moves_popover">
                    <Popover.Title as = "h3">Change Move</Popover.Title>
                    <Popover.Content>
                        <form onSubmit = {(e) => {this.submitMove(i, 1, e)}}>
                            <select onChange = {(e) => this.changeMove(i, e.target.value)}>
                                {this.state.pokemonCards[i].available_moves.map((x, y) => <option key = {y}>{x}</option>)}
                            </select>
                            <input type = "submit" value = "Submit"/>
                        </form>
                    </Popover.Content>
                </Popover>
            );

            const moves2_popover = (
                <Popover id = "moves_popover">
                    <Popover.Title as = "h3">Change Move</Popover.Title>
                    <Popover.Content>
                        <form onSubmit = {(e) => {this.submitMove(i, 2, e)}}>
                            <select onChange = {(e) => this.changeMove(i, e.target.value)}>
                                {this.state.pokemonCards[i].available_moves.map((x, y) => <option key = {y}>{x}</option>)}
                            </select>
                            <input type = "submit" value = "Submit"/>
                        </form>
                    </Popover.Content>
                </Popover>
            );

            const moves3_popover = (
                <Popover id = "moves_popover">
                    <Popover.Title as = "h3">Change Move</Popover.Title>
                    <Popover.Content>
                        <form onSubmit = {(e) => {this.submitMove(i, 3, e)}}>
                            <select onChange = {(e) => this.changeMove(i, e.target.value)}>
                                {this.state.pokemonCards[i].available_moves.map((x, y) => <option key = {y}>{x}</option>)}
                            </select>
                            <input type = "submit" value = "Submit"/>
                        </form>
                    </Popover.Content>
                </Popover>
            );

            const item_popover = (
                <Popover id = "moves_popover">
                    <Popover.Title as = "h3">Change Item</Popover.Title>
                    <Popover.Content>
                        <form onSubmit = {(e) => {this.submitItem(i, e)}}>
                            <select onChange = {(e) => this.changeItem(i, e.target.value)}>
                                {this.state.pokemonCards[i].available_items.map((x, y) => <option key = {y}>{x}</option>)}
                            </select>
                            <input type = "submit" value = "Submit"/>
                        </form>
                    </Popover.Content>
                </Popover>
            );

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
                                <Table striped bordered hover className="stats_table">
                                    <thead>
                                        <tr>
                                            <th>Stat</th>
                                            <th>Data</th>
                                            <th>Edit</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Nickname:</td>
                                            <td>{this.state.pokemonCards[i].nickname}</td>
                                            <OverlayTrigger trigger = "click" placement = "left" overlay = {nickname_popover} ref = "nickname_overlay">
                                                <EditIcon/>
                                            </OverlayTrigger>
                                        </tr>
                                        <tr>
                                            <td>Gender:</td>
                                            <td>{this.state.pokemonCards[i].gender}</td>
                                            <br/>
                                            {/* <EditIcon/> */}
                                        </tr>
                                        <tr>
                                            <td>Level:</td>
                                            <td>{this.state.pokemonCards[i].level}</td>
                                            <br/>
                                            {/* <EditIcon/> */}
                                        </tr>
                                        {/* <tr>
                                            <td>Item:</td>
                                            <td>{this.state.pokemonCards[i].item}</td>
                                            <OverlayTrigger trigger = "click" placement = "left" overlay = {item_popover} ref = "item_overlay">
                                                <EditIcon/>
                                            </OverlayTrigger>
                                        </tr> */}
                                        <tr>
                                            <td>Ability:</td>
                                            <td>{this.state.pokemonCards[i].ability}</td>
                                            <OverlayTrigger trigger = "click" placement = "left" overlay = {ability_popover} ref = "ability_overlay">
                                                <EditIcon/>
                                            </OverlayTrigger>
                                        </tr>
                                        <tr>
                                            <td rowSpan = "4">Moves:</td>
                                            <td>{this.state.pokemonCards[i].moves[0]}</td>
                                            <OverlayTrigger trigger = "click" placement = "left" overlay = {moves0_popover}>
                                                <EditIcon/>
                                            </OverlayTrigger>
                                        </tr>
                                        <tr>
                                            <td>{this.state.pokemonCards[i].moves[1]}</td>
                                            <OverlayTrigger trigger = "click" placement = "left" overlay = {moves1_popover}>
                                                <EditIcon/>
                                            </OverlayTrigger>
                                        </tr>
                                        <tr>
                                            <td>{this.state.pokemonCards[i].moves[2]}</td>
                                            <OverlayTrigger trigger = "click" placement = "left" overlay = {moves2_popover}>
                                                <EditIcon/>
                                            </OverlayTrigger>
                                        </tr>
                                        <tr>
                                            <td>{this.state.pokemonCards[i].moves[3]}</td>
                                            <OverlayTrigger trigger = "click" placement = "left" overlay = {moves3_popover}>
                                                <EditIcon/>
                                            </OverlayTrigger>
                                        </tr>
                                    </tbody>
                                </Table>
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
                        <Button variant="outline-danger" onClick = {this.resetTeam}>Reset Team</Button>
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
