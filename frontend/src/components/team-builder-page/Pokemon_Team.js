import React from "react";
import {Link} from "react-router-dom";
import { Button } from 'react-bootstrap';
import EditIcon from '@material-ui/icons/Edit';
import './css/Pokemon_Team.css';
import BlankPokemon from './css/BlankPokemon.png';
import axios from 'axios';
import { Card } from 'react-bootstrap';
import Table from 'react-bootstrap/Table'
import Popover from 'react-bootstrap/Popover'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'

// Acts as a template for the default team when either
// the component is constructed for the first time or
// the user decides to press "Reset Team" button
const blankCard = {
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

// ***************** Pokemon_Card() *********************
// Provides a template for each of the cards at the top
// of the team builder page that display basic info for
// each team member.
// input: object that contains the following
//          * image: front-sprite of the pokemon
//          * number: assigned number to pokemon (ranges from 1 to 6)
//          * name: official name of the pokemon
//          * type: string of all of the pokemon's types concatinated
// output: card that is rendered to display with all data filled-in
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

        // Construct initial team full of default (i.e. blank) team members
        for(let i = 0; i < 6; i++) {
            pokemonTeam.push(blankCard)
        }

        this.state = {
            pokemonCards : pokemonTeam,                 // Stores the data of each team member
        }
        this.resetTeam = this.resetTeam.bind(this);
        this.saveState = this.saveState.bind(this);
        this.capitalize = this.capitalize.bind(this);
        this.changeNickname = this.changeNickname.bind(this);
        this.submitNickname = this.submitNickname.bind(this);
        this.changeAbility = this.changeAbility.bind(this);
        this.submitAbility = this.submitAbility.bind(this);
        this.changeMove = this.changeMove.bind(this);
        this.submitMove = this.submitMove.bind(this);
    }

    // ***************** saveState() *********************
    // Saves the current state of this component to the
    // user's local storage in their web browser.
    saveState() {
        localStorage.setItem('teamBuilderState_v2', JSON.stringify(this.state));
    }

    // ***************** UNSAFE_componentWillMount() *********************
    // Called anytime the page is going to be mounted (displayed). Checks
    // if the user has ever used team builder before by checking for saved
    // data of previous teams in local storage. If so, set the component
    // state to reflect this data.
    UNSAFE_componentWillMount() {
        const savedState = JSON.parse(localStorage.getItem('teamBuilderState_v2'));
        this.setState(savedState)
    }

    // ***************** componentDidMount() *********************
    // Called anytime the page has been mounted. Checks URL to see
    // if any action needs to be taken.
    componentDidMount() {
        let path = window.location.pathname.split('/');

        // Condition 1: .../change/<member_num>/<pokemon_id>
        //      Path contains the command for changing a team member
        //      to a certain pokemon.
        //      URL input:
        //          member_num: team member number that will be changed (range: 1 to 6)
        //          pokemon_id: pokeapi id corresponding to pokemon that member_num will be changed to
        if (path.length == 5 && path[2].localeCompare("change") == 0) {
            let memberNum = Number(path[3]);
            let pokemonId = Number(path[4]);

            this.changeTeamMember(pokemonId, memberNum);
        }

        // Condition 2: .../resetTeam
        //      Path contains the command for reseting the team back to the
        //      default pokemon (i.e. blank team)
        else if (path.length == 3 && path[2].localeCompare("resetTeam") == 0) {
            this.resetTeam();
        }
    }

    // ***************** resetTeam() *********************
    // Resets the pokemon team back to the default team 
    // (i.e. blank)
    resetTeam() {
        localStorage.clear();
        let new_state = this.state.pokemonCards.slice();

        for (let i = 0; i < 6; i++) {
            new_state[i] = blankCard;
        }

        this.setState({ pokemonCards: new_state });
    }

    // ***************** changeTeamMember() *********************
    // Replaces a specified team member with a different pokemon
    // input:
    //      pokemonId: pokeapi id of incoming pokemon being added
    //      memberNum: team member number of pokemon to replace
    changeTeamMember(pokemonId, memberNum) {
        axios.get('https://pokeapi.co/api/v2/pokemon/' + pokemonId)
            .then(response => {
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
                new_state[memberNum - 1].gender = "Male";
                for (let i = 0; i < response.data.types.length; i++) {
                    type += response.data.types[i].type.name + "\n";
                }
                new_state[memberNum - 1].type = type;
                this.setState({ pokemonCards: new_state });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    // ***************** componentWillUnmount() *********************
    // Called anytime the page will no longer be displayed. Saves the
    // state of the team.
    componentWillUnmount() {
        this.saveState();
    }

    // ***************** capitalize() *********************
    // Capitalizes the first letter of the input string
    // input:
    //      name: string to capitalize first character
    // output: name with first character capitalized
    capitalize(name) {
        let firstLetter = name.charAt(0).toUpperCase();
        return (firstLetter + name.substring(1));
    }

    // ***************** changeNickname() *********************
    // Called everytime a user updates the value of the textbox
    // field of the nickname pop-up. Updates a buffer with user input.
    // input:
    //      memberNum: team member number of pokemon to change nickname
    //      nickname: new nickname to assign to pokemon
    changeNickname(memberNum, nickname) {
        var new_state = this.state.pokemonCards.slice();
        new_state[memberNum].nickname_buffer = nickname;
        this.setState({
            pokemonCards: new_state
        });
    }

    // ***************** submitNickname() *********************
    // Called when a user clicks save on the nickname pop-up.
    // Actually changes the pokemon's nickname to the buffer
    // value.
    // input:
    //      memberNum: team member numer of pokemon to change nickname
    //      event: button press event 
    submitNickname(memberNum, event) {
        var new_state = this.state.pokemonCards.slice();
        new_state[memberNum].nickname = new_state[memberNum].nickname_buffer;
        this.setState({
            pokemonCards: new_state
        });

        event.preventDefault();
    }

    // ***************** changeAbility() *********************
    // Called everytime a user updates the value of the dropdown
    // field of the ability pop-up. Updates a buffer with user input.
    // input:
    //      memberNum: team member number of pokemon to change ability
    //      ability: new ability to assign to pokemon
    changeAbility(memberNum, ability) {
        var new_state = this.state.pokemonCards.slice();
        new_state[memberNum].ability_buffer = ability;
        this.setState({
            pokemonCards: new_state
        });
    }

    // ***************** submitAbility() *********************
    // Called when a user clicks save on the ability pop-up.
    // Actually changes the pokemon's ability to the buffer
    // value.
    // input:
    //      memberNum: team member numer of pokemon to change ability
    //      event: button press event 
    submitAbility(memberNum,event) {
        var new_state = this.state.pokemonCards.slice();
        new_state[memberNum].ability = new_state[memberNum].ability_buffer;
        this.setState({
            pokemonCards: new_state
        });

        event.preventDefault();
    }

    // ***************** changeMove() *********************
    // Called everytime a user updates the value of the dropdown
    // field of the move pop-up. Updates a buffer with user input.
    // input:
    //      memberNum: team member number of pokemon to change move
    //      move: new move to assign to pokemon
    changeMove(memberNum, move) {
        var new_state = this.state.pokemonCards.slice();
        new_state[memberNum].moves_buffer = move;
        this.setState({
            pokemonCards: new_state
        });
    }

    // ***************** submitMove() *********************
    // Called when a user clicks save on the move pop-up.
    // Actually changes the pokemon's move to the buffer
    // value.
    // input:
    //      memberNum: team member numer of pokemon to change move
    //      move_index: dictates which of the four moves a pokemon can perform gets changed
    //      event: button press event 
    submitMove(memberNum,move_index, event) {
        var new_state = this.state.pokemonCards.slice();
        new_state[memberNum].moves[move_index] = new_state[memberNum].moves_buffer;
        this.setState({
            pokemonCards: new_state
        });

        event.preventDefault();
    }

     // ***************** changeItem() *********************
    // Called everytime a user updates the value of the dropdown
    // field of the item pop-up. Updates a buffer with user input.
    // input:
    //      memberNum: team member number of pokemon to change item
    //      item: new item to assign to pokemon
    changeItem(memberNum, item) {
        var new_state = this.state.pokemonCards.slice();
        new_state[memberNum].items_buffer = item;
        this.setState({
            pokemonCards: new_state
        });
    }

    // ***************** submitItem() *********************
    // Called when a user clicks save on the item pop-up.
    // Actually changes the pokemon's item to the buffer
    // value.
    // input:
    //      memberNum: team member numer of pokemon to change item
    //      event: button press event
    submitItem(memberNum, event) {
        var new_state = this.state.pokemonCards.slice();
        new_state[memberNum].item = new_state[memberNum].items_buffer;
        this.setState({
            pokemonCards: new_state
        });

        event.preventDefault();
    }

    // ***************** render() *********************
    // Called each time team builder page is going to be
    // rendered.
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
                                        </tr>
                                        <tr>
                                            <td>Level:</td>
                                            <td>{this.state.pokemonCards[i].level}</td>
                                            <br/>
                                        </tr>
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
                    <Button variant = "outline-success" onClick = {this.saveState}>Save Team</Button>
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
