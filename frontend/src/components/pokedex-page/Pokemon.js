import React from "react"
// import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import "../../App.css"
import Button from 'react-bootstrap/Button';
import {Link} from "react-router-dom";
import SearchFilter from "../SearchFilter";
import PokemonBox from "./PokemonBox";

const tableabilities = {
    marginLeft: "400px",
    marginTop: "15px",
    marginRight: "100px",
}

class Pokemon extends React.Component {
    constructor(){
        super();
        this.state = {
            pokemon: new Array(807),
            pokemonJSON: ""
        }
        this.fetchPokemon = this.fetchPokemon.bind(this)
        this.capitalize = this.capitalize.bind(this)
    }

    fetchPokemon(){
        // fetch from mongodb
        let doneFetching = false
        let id = 1

        for(let id = 1; id < 808; id++){
            // fetch each pokemon and add to state
            let url = 'https://pokeapi.co/api/v2/pokemon/' + id;
            fetch(url)
                .then((response) => {
                    if(response.ok){
                        return response.json();
                    } else {
                        throw new Error("failed to get response");
                    }
                })
                .then(data => {
                    // get number of commits and update state
                    console.log(data);
                    this.setState(prevState => {
                        let pokeArray = [...prevState.pokemon]
                        pokeArray[id] =
                            <PokemonBox
                                imgURL={data.sprites.front_default}
                                id={id}
                                name={this.capitalize(data.name)}
                            />;

                        return {
                            pokemon: pokeArray
                        }
                    })
                })
                .catch((err) =>{
                    console.log(err)
                });
        }
    }

    capitalize(name) {
        let firstLetter = name.charAt(0).toUpperCase()
        return (firstLetter + name.substring(1))
    }

    componentDidMount() {
       this.fetchPokemon();
    }

    render() {
        return (
            <div className="App">
                <div className="container" style={tableabilities}>
                    <h1>Pokemon</h1>
                    <br/>
                    <br/>
                    <SearchFilter/>
                    <div className="row mt-5">
                        {this.state.pokemon}
                    </div>
                </div>
            </div>

        );
    }
}

export default Pokemon;