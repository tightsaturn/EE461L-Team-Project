
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
        this.state = {
            ability: new Array(232),
            abilityJSON: ""
        }
        this.fetchAbility = this.fetchAbility.bind(this)
        this.capitalize = this.capitalize.bind(this)
    }

    fetchAbility(){
        // fetch from mongodb
        let doneFetching = false
        let id = 1

        for(let id = 1; id < 233; id++){
            // fetch each ability and add to state
            let url = 'https://pokeapi.co/api/v2/ability/' + id;
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
                        let abilityArray = [...prevState.ability]
                        abilityArray[id] =
                            <AbilitiesBox
                                generation={this.capitalizeG(data.generation.name)}
                                description={data.effect_entries[0].short_effect}
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
                        {this.state.ability}
                    </tbody>
                </table>
            </div>
        );
    }
}
export default Abilities;