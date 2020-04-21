import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import "../../css/page.css"
import {Link} from "react-router-dom";

const tableabilities = {
    marginTop: "70px",
    paddingLeft: "200px",
    paddingRight: "120px",
};

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
            pokemonIDArray:[]
        }

        this.capitalize = this.capitalize.bind(this)
    }

    componentDidMount() {
        let moveName = this.props.match.params.move
        console.log(moveName)
        let url = 'https://pokebackend-461l.appspot.com/moves/name/' + moveName.toLowerCase();

        fetch(url)
            .then((response) => {
                return response.json();
            })
            .then(data => {
                console.log(data)
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
        console.log(moveName)
        fetch(url2)
            .then((response) => {
                return response.json();
            })
            .then(data => {
                console.log(data)
                this.setState({
                    pokemonArray: data.pokemon,
                    pokemonIDArray: data.pokeID
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
        let id = this.props.match.params.move
        let borderColor = this.state.color == "white" ? "black": this.state.color
        let pokemonWithThisMove = this.state.pokemonArray.map((pokemon, index) => {
            let pokeID = this.state.pokemonIDArray[index];
                return (
                    <tr>
                        <td>
                            <Link to={"/pokemon/" + pokeID}>
                                {(pokemon)}
                            </Link>
                        </td>
                    </tr>
                )
        })
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
                                <li className="list-group-item">Type: {this.state.type.charAt(0).toUpperCase() + this.state.type.substring(1)} </li>
                                <li className="list-group-item">Category: {this.state.damage_class.charAt(0).toUpperCase() + this.state.damage_class.substring(1)}</li>
                                <li className="list-group-item">PP: {this.state.pp}</li>
                                <li className="list-group-item">Accuracy {this.state.accuracy}</li>
                                <li className="list-group-item">Effect: {this.state.effect}</li>
                            </ul>
                            <div className="card-body">
                                <a href="#" className="card-link">Card link</a>
                                <a href="#" className="card-link">Another link</a>
                            </div>
                        </div>
                    </div>

                    <div className="col-6">
                        <div id="typesTable">
                            <table className="table table-hover" style={{border: "solid 3px " + borderColor}}>
                                <thead className="thead-dark">
                                <tr>
                                    <th scope="col">Pokemon with this Move</th>
                                </tr>
                                </thead>
                                <tbody>
                                {pokemonWithThisMove}
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