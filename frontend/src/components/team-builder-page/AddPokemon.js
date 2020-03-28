import React, { Component } from 'react';
import {Link} from "react-router-dom";
import SearchFitler from "../SearchFilter";
import {Button} from "react-bootstrap";
import axios from 'axios'

const tablepokemon = {
    marginLeft: "200px",
    marginTop: "70px",
    marginRight: "100px",
}

const Pokemon = props => (
    <tr>
        <td>{props.pokemon.id}</td>
        <td>{props.pokemon.name}</td>
        <td>Insert type here</td>
        <td>{props.pokemon.sprites.front_default}</td>
        <td>
            <Link to = "/teambuilder">
                <Button variant="outline-info">+ Add</Button>
            </Link>
        </td>
    </tr>
)

class AddPokemon extends React.Component {
    constructor() {
        super();
        this.state = {
            pokemonPerPage: 50,
            currStartPokemon: 1,
            currEndPokemon: 2,
            pokemonDisplayed: [],
        };
    }
    
    componentDidMount() {
        axios.get('http://localhost:5000/pokemon/' + this.state.currStartPokemon + '/' + this.state.currEndPokemon)
            .then(response => {
                console.log(response.data)
                this.setState({ pokemonDisplayed: response.data })
            })
            .catch((error) => {
                console.log(error);
            })

        // axios.get('http://localhost:5000/pokemon/1')
        //     .then(response => {
        //         console.log(response.data)
        //         this.setState({ pokemonDisplayed: response.data })
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     })
    }

    componentDidUpdate() {
        
    }

    pokemonDisplayedList() {
        return this.state.pokemonDisplayed.map(currentpokemon => {
            return <Pokemon pokemon={currentpokemon} key={currentpokemon._id}/>;
        })
    }
    
    render() {
        return (
            <div style={tablepokemon}>
                <h1>Pokemon</h1>
                <br/>
                <SearchFitler/>
                <br/>
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Pokemon</th>
                            <th scope="col">Type</th>
                            <th scope="col">Picture</th>
                            <th scope="col">Add</th>
                        </tr>
                    </thead>

                    <tbody>
                        { this.pokemonDisplayedList() }
                    </tbody>
                </table>
            </div>
        );
    }    
}

export default AddPokemon;