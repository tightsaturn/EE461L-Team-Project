
import React from 'react';
import {Link} from "react-router-dom";
import SearchFilter from "../SearchFilter";
import AbilitiesBox from "./AbilitiesBox";
import PokemonBox from "../pokedex-page/PokemonBox";

const tableabilities = {
    marginLeft: "200px",
    marginTop: "70px",
    marginRight: "100px",
}

class Abilities extends React.Component {
    constructor(){
        super();
        // initialize 2d array for pagination
        let abilitiesArray = []
        for(let i = 0; i < 30; i++){
            abilitiesArray.push([])
        }

        this.state = {
            ability: abilitiesArray,
            buttons: [],
            currentPage: 0,
            pageSize: 30
        }

        this.fetchAbility = this.fetchAbility.bind(this)
        this.capitalize = this.capitalize.bind(this)
        this.handlePageClick = this.handlePageClick.bind(this)
        this.fetchOneAbility = this.fetchOneAbility.bind(this)
    }

    async fetchOneAbility(id){
        let url = 'https://pokebackend-461l.appspot.com/abilitycards/' + id;
        await fetch(url)
            .then((response) => {
                return response.json();
            })
            .then(data => {
                // get page number and update state
                let pageNum = Math.floor((id-1)/this.state.pageSize);
                let index = (id-1)%this.state.pageSize;

                this.setState(prevState => {
                    let abilityArray = [...prevState.ability]
                    abilityArray[pageNum][index] =
                        <AbilitiesBox
                            generation={this.capitalizeG(data.generation[0].name)}
                            description={data.effect[0].short_effect}
                            name={this.capitalize(data.name)}
                            id={data.id}
                        />;

                    return {
                        ability: abilityArray
                    }
                })
            })
            .catch((err) =>{
                console.log(err)
            });
    }

    fetchAbility(){
        for(let id = 1; id < 233; id++){
            // fetch each ability and add to state
            let url = 'https://pokebackend-461l.appspot.com/abilitycards/' + id;
            fetch(url)
                .then((response) => {
                    if(response.ok){
                        return response.json();
                    } else {
                        throw new Error("failed to get response");
                    }
                })
                .then(data => {
                    // get page number and update state
                    let pageNum = Math.floor((id-1)/this.state.pageSize);
                    let index = (id-1)%this.state.pageSize;

                    // add a button for every new page
                    if(index == 0) this.setState(prevState => {
                        let buttonArray = [...prevState.buttons]
                        buttonArray[pageNum] =
                            <button type="button" id={pageNum} className="btn btn-light" onClick={this.handlePageClick}>
                                {pageNum+1}
                            </button>

                        return {
                            buttons: buttonArray
                        }
                    })


                    this.setState(prevState => {
                        let abilityArray = [...prevState.ability]
                        abilityArray[pageNum][index] =
                            <AbilitiesBox
                                generation={this.capitalizeG(data.generation[0].name)}
                                description={data.effect[0].short_effect}
                                name={this.capitalize(data.name)}
                                id={data.id}
                            />;

                        return {
                            ability: abilityArray
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

    capitalizeG(generation) {
        let firstLetter = generation.charAt(0).toUpperCase()
        let romanGeneration = generation.substring(11).toUpperCase()
        return (firstLetter + generation.substring(1,11) + romanGeneration)
    }

    handlePageClick(event) {
        const {id} = event.target
        this.setState({
            currentPage: id
        })
    }

    componentDidMount() {
        this.fetchAbility();
    }

    render()
    {
        return (
            <div style={tableabilities}>
                <h1>Abilities</h1>
                <br/>
                <SearchFilter/>
                <br/>
                <table className="table">
                    <thead className="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Effect</th>
                        <th scope="col">Generation</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.ability[this.state.currentPage]}
                    </tbody>
                </table>
                <div className="navbar" style={{marginBottom: "30px"}}>
                    {this.state.buttons}
                </div>
            </div>
        );
    }
}
export default Abilities;