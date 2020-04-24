import React from "react";
import "../../css/page.css"
import {Link} from "react-router-dom";
import {capitalize} from "../componentFunctions";


class AbilitiesInfo extends React.Component {
    constructor(){
        super();
        this.state = {
            name: "",
            effect: "",
            generation:"",
            pokemonArray:[],
            moves: [],
            numMovesLoaded: 0
        }

        this.capitalize = this.capitalize.bind(this)
    }

    componentDidMount() {
        let id = this.props.match.params.ability
        let url = 'https://pokebackend-461l.appspot.com/abilities/' + id;

        fetch(url)
            .then((response) => {
                return response.json();
            })
            .then(data => {
                let movArray = []
                for(let i = 0; i < data.pokemon.length; i++) {
                    movArray.push(0)
                }

                this.setState({
                    id: data.id,
                    name: data.name,
                    pokemonArray: data.pokemon,
                    generation: data.generation[0].name,
                    effect: data.effect[0].effect,
                    moves: movArray
                })

                // get moves for each pokemon with ability
                for(let i = 0; i < data.pokemon.length; i++) {
                    let id = data.pokemon[i].pokemon.url.substring(34)

                    let url2 = 'https://pokebackend-461l.appspot.com/pokemon/' + id
                    fetch(url2)
                        .then(response => { return response.json() })
                        .then(data => {
                            this.setState(prevState => {
                                let movesArray = [...prevState.moves]
                                if(data == undefined) {
                                    movesArray[i] = {}
                                } else { movesArray[i] = data.moves }

                                return {
                                    moves: movesArray,
                                    numMovesLoaded: prevState.numMovesLoaded + 1
                                }
                            })
                        })
                        .catch(err => { console.log(err) })

                }

            })
            .catch((err) =>{ console.log(err) });
    }

    capitalize(name) {
        name = String(name)
        let firstLetter = name.charAt(0).toUpperCase()
        return (firstLetter + name.substring(1))
    }

    render() {
        let id = this.props.match.params.ability
        /* create tables by mapping each move to a row */
        let pokemonRow = (this.state.numMovesLoaded == this.state.pokemonArray.length) ?
            this.state.pokemonArray.map((pokemon, index) => {
                // find id of move (pos 31 is where the id is located in string)
                const id = pokemon.pokemon.url.substring(34)
                let moves = this.state.moves[index];
                let Moves = []

                // display moves in three columns of dropdown menu
                for(let i = 2; i < moves.length; i+=3) {
                    Moves.push(
                        <div>
                            <Link to={'/moves/' + moves[i].move.name}>
                                {this.capitalize(moves[i].move.name)}
                            </Link>
                            <Link to={'/moves/' + moves[i-1].move.name}>
                                {this.capitalize(moves[i-1].move.name)}
                            </Link>
                            <Link to={'/moves/' + moves[i-2].move.name}>
                                {this.capitalize(moves[i-2].move.name)}
                            </Link>
                        </div>
                    )
                }

                // find how many are left over if not none
                let n = moves.length
                if(moves.length % 3 == 2) {
                    // two more to display
                    Moves.push(
                        <div>
                            <Link to={'/moves/' + moves[n-1].move.name}>
                                {this.capitalize(moves[n-1].move.name)}
                            </Link>
                            <Link to={'/moves/' + moves[n-2].move.name}>
                                {this.capitalize(moves[n-2].move.name)}
                            </Link>
                        </div>
                    )
                }

                if(moves.length % 3 == 1) {
                    // one more to display
                    Moves.push(
                        <Link to={'/moves/' + moves[n-1].move.name}>
                            {this.capitalize(moves[n-1].move.name)}
                        </Link>
                    )
                }

                return (
                    <tr>
                        <td>
                            <Link to={"/pokemon/" + id}>
                                {capitalize(pokemon.pokemon.name)}
                            </Link>
                        </td>
                        <td>
                            <div className="dropdown2">
                                <button className="dropbtn2"></button>
                                <div className="dropdown-content2">
                                    {Moves}
                                </div>
                            </div>
                        </td>
                    </tr>
                )
            }) : null

        return (
            <div className="container-fluid" id="infoContent">
                <div className="row">
                    <div className="col-4">
                        <div className="card">
                            <div className="card-body">
                                <h1 className="card-text">{this.capitalize(this.state.name)} <br/>
                                </h1>
                            </div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    {(this.state.generation.charAt(0).toUpperCase() +
                                    this.state.generation.substring(1,11)+
                                    this.state.generation.substring(11).toUpperCase())}</li>
                                <li className="list-group-item">Effect:  {this.capitalize(this.state.effect)}</li>
                            </ul>
                            <div className="card-body">
                                <div>Pokemon Count: {this.state.pokemonArray.length}</div>
                            </div>
                        </div>
                    </div>

                    <div className="col-5">
                        <div id="typesTable">
                            <h2 style={{paddingBottom: "20px"}}>Pokemon with this Ability</h2>
                            <table className="table table-hover">
                                <thead className="thead-dark">
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Moves</th>
                                </tr>
                                </thead>
                                <tbody>
                                    {pokemonRow}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default AbilitiesInfo;