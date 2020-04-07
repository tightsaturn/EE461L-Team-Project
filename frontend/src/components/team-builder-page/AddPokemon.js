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
        <td>{props.type}</td>
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
        // initialize 2d array for pagination
        let pokeArray = []
        let buttonsArray = []
        for(let i = 0; i < 50; i++){
            pokeArray.push([])
        }
        for(let i = 0; i < 23; i++){
            buttonsArray.push({})
        }

        this.state = {
            pokemonPerPage: 36,
            currentPage: 0,
            pokemonDisplayed: pokeArray,
            buttons: buttonsArray
        };

        this.capitalize = this.capitalize.bind(this)
        this.fetchPokemon = this.fetchPokemon.bind(this)
        this.handlePageClick = this.handlePageClick.bind(this)
    }

    fetchPokemon() {
        // Fetch each pokemon and add to the state
        // NOTE: Assumes there are only 807 pokemon in database
        for (let id = 1; id < 808; id++) {
            // fetch each pokemon and add to state
            let url = 'https://pokeapi.co/api/v2/pokemon/' + id;
            //let url = 'https://pokebackend-461l.appspot.com/pokemon/' + id;
            fetch(url)
                .then((response) => {
                    return response.json();
                })
                .then(data => {
                    let pageNum = Math.floor((id-1)/this.state.pokemonPerPage);
                    let index = (id-1) % this.state.pokemonPerPage;

                    // add a button for every new page
                    if(index === 0) this.setState(prevState => {
                        let buttonArray = [...prevState.buttons]
                        buttonArray[pageNum] = {
                            type: "button",
                            id: pageNum,
                        }

                        return {
                            buttons: buttonArray
                        }
                    })

                    this.setState(prevState => {
                        let pokeArray = [...prevState.pokemonDisplayed]

                        var type = "";
                        for (let i = 0; i < data.types.length; i++) {
                            type += this.capitalize(data.types[i].type.name) + "\n";
                        }

                        pokeArray[pageNum][index] = {
                            id: id,
                            name: data.name,
                            type: type,
                            image: data.sprites.front_default,
                            memberNum: this.props.match.params.memberNum
                        }

                        return {
                            pokemonDisplayed: pokeArray,
                        }
                    })
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }
    
    componentDidMount() {
        console.log("Team member being changed: " + this.props.match.params.memberNum)
        this.fetchPokemon();
    }

    capitalize(name) {
        let firstLetter = name.charAt(0).toUpperCase()
        return (firstLetter + name.substring(1))
    }

    // redirects user to page when button clicked
    handlePageClick(event) {
        const {id} = event.target
        this.setState({
            currentPage: id
        })
    }
    
    render() {
        let pokemon = this.state.pokemonDisplayed[this.state.currentPage].map((item) => {
            return <PokemonRow
                id={item.id}
                name={item.name}
                type={item.type}
                image={item.image}
                memberNum={item.memberNum} />
        })
        let buttons = this.state.buttons.map((item, index) => {
            let className = (this.state.currentPage == index) ? "btn btn-success":"btn btn-light"

            return <button
                type="button"
                id={item.id}
                className={className}
                onClick={this.handlePageClick}> {item.id+1}
            </button>
        })

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
                            {pokemon}
                        </tbody>
                    </table>

                    <br></br>
                    <br></br>

                    <p>Go to Page:</p>
                    <div className="navbar" style={{marginBottom: "30px"}}>
                        {buttons}
                    </div>
                </div>
            </div>
            
        );
    }    
}

export default AddPokemon;