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

function printType(props) {
    console.log(props.type);
}

const PokemonRow = props => (
    <tr>
        <td>{props.id}</td>
        <td>{props.name}</td>
        <td>Insert Type Here</td>
        <td>
            <img src = {props.image} alt = {props.name}/>
        </td>
        <td>
            <Link to = {"/teambuilder/change/" + props.memberNum + "/" + props.id}>
                <Button variant="outline-info">+ Add</Button>
            </Link>
        </td>
    </tr>
)

class AddPokemon extends React.Component {
    constructor(props) {
        super(props);

        // initialize 2D array that will map all of the pokemon to a page, the outside
        // array will be all of the page numbers and the inner arrays will hold all of
        // the pokemon corresponding to the respective page
        let pokeArray = [];
        for (let i = 0; i < 50; i++) {          // NOTE: only supports up to 50 pages for now
            pokeArray.push([]);
        }

        this.state = {
            pokemonPerPage: 30,
            currentPage: 0,
            pokemonDisplayed: pokeArray,
            pageButtons: []
        };

        this.fetchPokemon = this.fetchPokemon.bind(this)
        this.handlePageClick = this.handlePageClick.bind(this)
    }

    fetchPokemon() {
        // Fetch each pokemon and add to the state
        // NOTE: Assumes there are only 807 pokemon in database
        for (let id = 1; id < 808; id++) {
            // fetch each pokemon and add to state
            let url = 'https://pokeapi.co/api/v2/pokemon/' + id;
            //let url = 'https://pokebackend-461l.appspot.com/pokemon' + id;
            fetch(url)
                .then((response) => {
                    if(response.ok){
                        return response.json();
                    } else {
                        throw new Error("failed to get response");
                    }
                })
                .then(data => {
                    let pageNum = Math.floor((id-1)/this.state.pokemonPerPage);
                    let index = (id-1) % this.state.pokemonPerPage;

                    // add a button for every new page
                    if(index == 0) this.setState(prevState => {
                        let buttonArray = [...prevState.pageButtons]
                        buttonArray[pageNum] =
                            <button type="button" id={pageNum} className="btn btn-light" onClick={this.handlePageClick}>
                                {pageNum+1}
                            </button>

                        return {
                            pageButtons: buttonArray
                        }
                    })

                    this.setState(prevState => {
                        let pokeArray = [...prevState.pokemonDisplayed]
                        pokeArray[pageNum][index] =
                            <PokemonRow
                                id = {id}
                                name = {data.name}
                                type = {data.types}
                                image = {data.sprites.front_default}
                                memberNum = {this.props.match.params.memberNum}
                            />;

                        return {
                            pokemon: pokeArray,
                        }
                    })
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }
    
    componentDidMount() {
        // axios.get('http://localhost:5000/pokemon/' + this.state.currStartPokemon + '/' + this.state.currEndPokemon)
        //     .then(response => {
        //         console.log(response.data)
        //         this.setState({ pokemonDisplayed: response.data })
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     })

        // axios.get('http://localhost:5000/pokemon/1')
        //     .then(response => {
        //         console.log(response.data)
        //         this.setState({ pokemonDisplayed: response.data })
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     })

        console.log("Team member being changed: " + this.props.match.params.memberNum)
        this.fetchPokemon();
    }

    // pokemonDisplayedList() {
    //     return this.state.pokemonDisplayed.map(currentpokemon => {
    //         return <Pokemon pokemon={currentpokemon} key={currentpokemon._id}/>;
    //     })
    // }

    // redirects user to page when button clicked
    handlePageClick(event) {
        const {id} = event.target
        this.setState({
            currentPage: id
        })
    }
    
    render() {
        return (
            <div className = "App">
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
                            {this.state.pokemonDisplayed[this.state.currentPage]}
                        </tbody>
                    </table>

                    <br></br>
                    <br></br>

                    <p>Go to Page:</p>
                    <div className = "row mt-2">
                        {this.state.pageButtons} 
                    </div>
                </div>
            </div>
            
        );
    }    
}

export default AddPokemon;