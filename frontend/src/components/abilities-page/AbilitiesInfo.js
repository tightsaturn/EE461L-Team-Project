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
            doneRendering: false
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
                console.log(data)
                this.setState({
                    id: data.id,
                    name: data.name,
                    pokemonArray: data.pokemon,
                    generation: data.generation[0].name,
                    effect: data.effect[0].effect,
                })

            })
            .catch((err) =>{
                console.log(err)
            });
    }

    capitalize(name) {
        name = String(name)
        let firstLetter = name.charAt(0).toUpperCase()
        return (firstLetter + name.substring(1))
    }

    render() {
        var borderColor, pokemonWithThisAbility;
        if (!this.state.doneRendering) {
            // let id = this.props.match.params.ability
            borderColor = this.state.color == "white" ? "black": this.state.color
            /* create tables by mapping each move to a row */
            pokemonWithThisAbility = this.state.pokemonArray.map(pokemon => {

                const id = pokemon.pokemon.url.substring(34)
                let pokemon_moves = [];

                //let url = 'https://pokebackend-461l.appspot.com/pokemon/' + id + '/moves_list';
                let url = 'http://localhost:5000/pokemon/' + id + 'moves_list';
                fetch(url)
                    .then((response) => {
                        return response.json();
                    })
                    .then(data => {
                        // get a list of all of the moves of the current pokemon
                        for (var i in data[0].moves) {
                            console.log(data[0].moves[i].move.name);
                            pokemon_moves.push(
                                <div class = "dropdown">
                                    <Link to={"/pokemon/" + id}>
                                        {capitalize(pokemon.pokemon.name)}
                                    </Link>
                                    <div class = "dropdown-content">
                                        <a href = "/">{data[0].moves[i].move.name}</a>
                                    </div>
                                </div>    

                            );
                        }

                        console.log(pokemon_moves);
                    })
                    .catch((err) => {
                        console.log(err)
                    });

                // find id of move (pos 31 is where the id is located in string)
                return (
                    <tr>
                        <td>
                            {pokemon_moves}
                        </td>
                    </tr>
                )
            });

            this.setState({
                doneRendering: true
            });
        }

        return (
            <div className="container-fluid" id="mainContent">
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
                                <a href="#" className="card-link">Card link</a>
                                <a href="#" className="card-link">Another link</a>
                            </div>
                        </div>
                    </div>

                    <div className="col-6">
                        <div id="typesTable">
                            <h2 style={{paddingBottom: "20px"}}>Pokemon with this Ability</h2>
                            <table className="table table-hover" style={{border: "solid 3px " + borderColor}}>
                                <thead className="thead-dark">
                                <tr>
                                    <th scope="col">Name</th>
                                </tr>
                                </thead>
                                <tbody>
                                {pokemonWithThisAbility}
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