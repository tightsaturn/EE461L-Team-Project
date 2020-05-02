import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import "../../css/page.css"
import {Link} from "react-router-dom";

class MovesInfo extends React.Component {
    constructor(){
        super();
        this.state = {
            name: "",
            damage_class: "",
            effect: "",
            generation:"",
            accuracy: "",
            power: "",
            pp: "",
            type: "",
            pokemonArray:[],
            pokemonIDArray:[],
            abilities: [],
            numAbilitiesLoaded: 0
        }

        this.capitalize = this.capitalize.bind(this)
    }

    componentDidMount() {
        let moveName = this.props.match.params.move
        let url = 'https://pokebackend-461l.appspot.com/moves/name/' + moveName.toLowerCase();

        fetch(url)
            .then((response) => {
                return response.json();
            })
            .then(data => {
                this.setState({
                    name: data.name,
                    damage_class: data.damage_class[0].name,
                    effect: data.effect[0].effect,
                    generation:data.generation[0].name,
                    accuracy: data.accuracy,
                    power: data.power,
                    pp: data.pp,
                    type: data.type[0].name
                })

            })
            .catch((err) =>{
                console.log(err)
            });

        let url2 = 'https://pokebackend-461l.appspot.com/moves2/' + moveName.toLowerCase()
        fetch(url2)
            .then((response) => {
                return response.json();
            })
            .then(data => {
                let abilArray = []
                for(let i = 0; i < data.pokemon.length; i++) {
                    abilArray.push(0)
                }

                this.setState({
                    pokemonArray: data.pokemon,
                    pokemonIDArray: data.pokeID
                })

                // get abilities for all pokemon
                for(let i = 0; i < data.pokemon.length; i++) {
                    let url3 = 'https://pokebackend-461l.appspot.com/pokemon/' + data.pokeID[i]
                    fetch(url3)
                        .then(response => { return response.json() })
                        .then(data => {
                            this.setState(prevState => {
                                let abilitiesArray = [...prevState.abilities]
                                abilitiesArray[i] = data.abilities

                                return {
                                    abilities: abilitiesArray,
                                    numAbilitiesLoaded: prevState.numAbilitiesLoaded + 1
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
        let id = this.props.match.params.move
        let borderColor = this.state.color == "white" ? "black": this.state.color
        let pokemonRows = (this.state.numAbilitiesLoaded == this.state.pokemonArray.length) ?
            this.state.pokemonArray.map((pokemon, index) => {
                let pokeID = this.state.pokemonIDArray[index];
                let abilities = []

                let abils = this.state.abilities[index]
                for(let i = 0; i < abils.length; i++) {
                    abilities.push(
                        <Link to={'/abilities/' + abils[i].ability[0].url.substring(34)}>
                            {this.capitalize(abils[i].ability[0].name)}
                        </Link>
                    )
                }

                return (
                    <tr>
                        <td>
                            <Link to={"/pokemon/" + pokeID}>
                                {(pokemon)}
                            </Link>
                        </td>
                        <td>
                            <div className="dropdown">
                                <button className="dropbtn"></button>
                                <div className="dropdown-content">
                                    {abilities}
                                </div>
                            </div>
                        </td>
                    </tr>
                )
            }) : null
        let type = this.state.type.charAt(0).toLowerCase() + this.state.type.substring(1)
        return (

            <div className="container-fluid" id="infoContent">
                <div className="row">
                    <div className="col-4">
                        <div className="card">
                            <div className="card-body">
                                <h1 className="card-text">{this.capitalize(this.state.name)} <br/>
                                </h1>
                                <h3>{(this.state.generation.charAt(0).toUpperCase() +
                                    this.state.generation.substring(1,11)+
                                    this.state.generation.substring(11).toUpperCase())}</h3>
                            </div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item"> Type:  <Link to={"/types/" + type}>{this.state.type.charAt(0).toUpperCase() + this.state.type.substring(1)} </Link> </li>
                                <li className="list-group-item">Category: {this.state.damage_class.charAt(0).toUpperCase() + this.state.damage_class.substring(1)}</li>
                                <li className="list-group-item">PP: {this.state.pp}</li>
                                <li className="list-group-item">Accuracy {this.state.accuracy}</li>
                                <li className="list-group-item">Effect: {this.state.effect}</li>
                            </ul>
                        </div>
                    </div>

                    <div className="col-1"></div>

                    <div className="col-6">
                        <div id="typesTable">
                            <table className="table table-hover" style={{border: "solid 3px " + borderColor}}>
                                <thead className="thead-dark">
                                <tr>
                                    <th scope="col">Pokemon with this Move</th>
                                    <th scope="col">Abilities</th>
                                </tr>
                                </thead>
                                <tbody>
                                {pokemonRows}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default MovesInfo;