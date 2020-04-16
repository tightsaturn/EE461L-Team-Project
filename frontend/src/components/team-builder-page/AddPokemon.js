import React, { Component } from 'react';
import {Link} from "react-router-dom";
import PokemonSearchFilter from "./PokemonSearchFilter";
import {Button} from "react-bootstrap";
import "../../css/page.css"

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
            filteredPokemon: [],
            pokemonDisplayed: pokeArray,
            buttons: buttonsArray,
            numLoaded: 0,   // counts how many pokemon loaded to see when fetching finishes
            isFiltered: false,
            numFiltered: 0  // shows number of results for filter
        };

        this.capitalize = this.capitalize.bind(this)
        this.fetchPokemon = this.fetchPokemon.bind(this)
        this.handlePageClick = this.handlePageClick.bind(this)
        this.filter = this.filter.bind(this)
        this.reset = this.reset.bind(this)
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
                            types: data.types,
                            image: data.sprites.front_default,
                            memberNum: this.props.match.params.memberNum
                        }

                        return {
                            pokemonDisplayed: pokeArray,
                            numLoaded: prevState.numLoaded + 1
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

    filter (name, include, type1, type2) {
        // check if all pokemon are finished loading (alert if not)
        if (this.state.numLoaded < 807) {
            alert("Wait for all the pokemon to finish loading first!")
            return
        }

        // check if all the fields are empty
        if (name === "" && include === "" && type1 === "None" && type2 === "None") {
            this.setState({
                isFiltered: false
            })
            return
        }

        // keep a subarray for each filter option and combine at the end
        // a true entry means pokemon i fits the filter criteria (e.g. name or type1)
        let filterArray = [[], [], [], []]
        for (let i = 0; i < this.state.pokemonDisplayed.length; i++) {
            for (let j = 0; j < this.state.pokemonPerPage; j++) {
                // get pokemon and find out if it matches filter criteria
                let pokeJSON = {...this.state.pokemonDisplayed[i][j]}
                if (pokeJSON.name === undefined) break

                // console.log(pokeJSON.name)

                if (name !== "") {
                    if (name.toLowerCase() === pokeJSON.name.toLowerCase()) {
                        filterArray[0].push(true)
                    } else filterArray[0].push(false)
                }   // pushes true if there is no entry
                else filterArray[0].push(true)

                // check if substring include is in pokemon name
                if (include !== "") {
                    if ((pokeJSON.name.toLowerCase()).indexOf(include.toLowerCase()) !== -1) {
                        filterArray[1].push(true)
                    } else filterArray[1].push(false)
                } else filterArray[1].push(true)

                if (pokeJSON.types.length === 2) {
                    if (type1 !== "None") {
                        if (pokeJSON.types[0].type.name === type1.toLowerCase() || pokeJSON.types[1].type.name === type1.toLowerCase()) {
                            filterArray[2].push(true)
                        } else filterArray[2].push(false)
                    } else filterArray[2].push(true)

                    if (type2 !== "None") {
                        if (pokeJSON.types[0].type.name === type2.toLowerCase() || pokeJSON.types[1].type.name === type2.toLowerCase()) {
                            filterArray[3].push(true)
                        } else filterArray[3].push(false)
                    } else filterArray[3].push(true)
                } else {
                    if (type1 !== "None" && type2 !== "None") {
                        // if filter specifies 2 types but pokemon only has one (the pokemon does not get added)
                        filterArray[2].push(false)
                        filterArray[3].push(false)
                    } else {
                        if (type1 !== "None") {
                            if (pokeJSON.types[0].type.name === type1.toLowerCase()) {
                                filterArray[2].push(true)
                            } else filterArray[2].push(false)
                        } else filterArray[2].push(true)

                        if (type2 !== "None") {
                            if (pokeJSON.types[0].type.name === type2.toLowerCase()) {
                                filterArray[3].push(true)
                            } else filterArray[3].push(false)
                        } else filterArray[3].push(true)
                    }
                }
            }
        }

        // only add pokemon to filtered list if all of the filter criteria are met
        let filteredPokemon = []
        for(let i = 0; i < 807; i++) {
            if(filterArray[0][i] &&
                filterArray[1][i] &&
                filterArray[2][i] &&
                filterArray[3][i]) {
                filteredPokemon.push(i)
            }
        }

        this.setState({
            filteredPokemon: filteredPokemon,
            isFiltered: true,
            numFiltered: filteredPokemon.length
        })
    }

    reset() {
        this.setState({
            isFiltered: false
        })
    }
    
    render() {
        let pokemon = this.state.isFiltered ?
            // item holds id of pokemon to be rendered
            this.state.filteredPokemon.map(item => {
                let pageNum = Math.floor((item)/this.state.pokemonPerPage);
                let index = (item)%this.state.pokemonPerPage;
                let pokemon = this.state.pokemonDisplayed[pageNum][index]

                return <PokemonRow
                    id={pokemon.id}
                    name={this.capitalize(pokemon.name)}
                    type={pokemon.type}
                    image={pokemon.image}
                    memberNum={pokemon.memberNum}
                />
            }) :
        this.state.pokemonDisplayed[this.state.currentPage].map((item) => {
            return <PokemonRow
                id={item.id}
                name={this.capitalize(item.name)}
                type={item.type}
                image={item.image}
                memberNum={item.memberNum} />
        })
        let buttons = (this.state.isFiltered) ? null : this.state.buttons.map((item, index) => {
            let className = (this.state.currentPage == index) ? "btn btn-success":"btn btn-light"

            return <button
                type="button"
                id={item.id}
                className={className}
                onClick={this.handlePageClick}> {item.id+1}
            </button>
        })

        let filterMessage = this.state.isFiltered ? (this.state.numFiltered + " results found") : null
        let pageMessage = this.state.isFiltered ? null : "Go to Page:"

        return (
            <div className="container-fluid" id="infoContent">
                <div>
                    <h1>Pokemon</h1>
                    <br/>
                    <PokemonSearchFilter
                        onFilter={this.filter}
                        onReset={this.reset}
                    />
                    <br/>
                    <h3 style={{marginTop: "15px"}}>{filterMessage}</h3>
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

                    <p>{pageMessage}</p>
                    <div className="navbar" style={{marginBottom: "30px"}}>
                        {buttons}
                    </div>
                </div>
            </div>
            
        );
    }    
}

export default AddPokemon;