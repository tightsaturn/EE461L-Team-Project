import React from "react";
import "../../css/page.css"


class AbilitiesInfo extends React.Component {
    constructor(){
        super();
        this.state = {
            name: "",
            effect: "",
            generation:"",
            pokemonArray:[]
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
        let id = this.props.match.params.ability

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

                    <div className="col-8">
                        <table className="table">
                            <thead className="thead-light">
                            <tr>
                                <th scope="col">Effect Changes</th>
                            </tr>
                            <tr>
                                <th scope="col">Pokemons with this Ability</th>
                            </tr>
                            {this.state.pokemonArray.map(pokemon => (
                                <li key={pokemon}>{(pokemon.pokemon.name[0].toUpperCase() + pokemon.pokemon.name.slice(1))}</li>
                            ))}
                            </thead>
                            <tbody>

                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        );
    }
}

export default AbilitiesInfo;