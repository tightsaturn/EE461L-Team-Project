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
        // initialize 2d array for pagination
        let movesArray = []
        for(let i = 0; i < 75; i++){
            movesArray.push([])
        }

        this.state = {
            move:  movesArray,
            buttons: [],
            currentPage: 0,
            pageSize: 10
        }

        this.fetchMove = this.fetchMove.bind(this)
        this.capitalize = this.capitalize.bind(this)
        this.handlePageClick = this.handlePageClick.bind(this)
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
                    let pageNum = Math.floor((id-1)/10);
                    let index = (id-1)%10;

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

                    // get number of commits and update state
                    console.log(data);
                    this.setState(prevState => {
                        let moveArray = [...prevState.move]
                        moveArray[pageNum][index] =
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

    handlePageClick(event) {
        const {id} = event.target
        this.setState({
            currentPage: id
        })
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
                    {this.state.move[this.state.currentPage]}
                    </tbody>
                </table>
                <div className="row mt-2">
                    {this.state.buttons}
                </div>
            </div>
        );
    }
}
export default Moves;