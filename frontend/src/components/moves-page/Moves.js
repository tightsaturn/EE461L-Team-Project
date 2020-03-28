import React from 'react';
import {Link} from "react-router-dom";
import SearchFitler from "../SearchFilter";
import MovesBox from "../moves-page/MovesBox";

const tablemoves = {
    marginLeft: "200px",
    marginTop: "70px",
    marginRight: "100px",
}

class Moves extends React.Component {
    constructor(){
        super();
        this.state = {
            move: new Array(727),
            moveJSON: ""
        }

        this.fetchMove = this.fetchMove.bind(this)
        this.capitalize = this.capitalize.bind(this)
    }

    fetchMove(){
        // fetch from mongodb
        let doneFetching = false
        let id = 1

        for(let id = 1; id < 726; id++){
            // fetch each move and add to state
            let url = 'https://pokeapi.co/api/v2/move/' + id;
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
                        let moveArray = [...prevState.move]
                        moveArray[id] =
                            <MovesBox
                                type={this.capitalize(data.type.name)}
                                effect={data.effect_entries[0].effect}
                                name={this.capitalize(data.name)}
                                id={data.id}
                            />;

                        return {
                            move: moveArray
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
        this.fetchMove();
    }

    render()
    {
        return (

            <div style={tablemoves}>
                <h1>Moves</h1>
                <br/>
                <SearchFitler/>
                <br/>
                <table className="table">
                    <thead className="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Effect</th>
                        <th scope="col">Type</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.move}
                    </tbody>
                </table>
            </div>
        );
    }
}
export default Moves;