import React from 'react';
import {Link} from "react-router-dom";
import SearchFitler from "../SearchFilter";
import ItemsBox from "../items-page/ItemsBox";

const tableitems = {
    marginLeft: "200px",
    marginTop: "70px",
    marginRight: "100px",
}

class Items extends React.Component{
    constructor(){
        super();
        this.state = {
            item: new Array(953),
            itemJSON: ""
        }
        this.fetchItem = this.fetchItem.bind(this)
        this.capitalize = this.capitalize.bind(this)
    }

    fetchItem(){
        // fetch from mongodb
        let doneFetching = false
        let id = 1

        for(let id = 1; id < 954; id++){
            // fetch each item and add to state
            let url = 'https://pokeapi.co/api/v2/item/' + id;
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
                        let itemArray = [...prevState.item]
                        itemArray[id] =
                            <ItemsBox
                                picture={data.sprites.default}
                                effect={data.effect_entries[0].short_effect}
                                name={this.capitalize(data.name)}
                                id = {data.id}
                            />;

                        return {
                            item: itemArray
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
        this.fetchItem();
    }
    render()
    {
        return (

            <div style={tableitems}>
                <h1>Items</h1>
                <br/>
                <SearchFitler/>
                <br/>
                <table className="table">
                    <thead className="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Item</th>
                        <th scope="col">Effect</th>
                        <th scope="col">Picture</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.item}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Items;