import React from 'react';
import "../../css/page.css"
import SearchFitler from "../SearchFilter";
import ItemsBox from "../items-page/ItemsBox";


class Items extends React.Component{
    constructor(){
        super();
        // initialize 2d array for pagination
        let itemsArray = []
        for(let i = 0; i < 100; i++){
            itemsArray.push([])
        }

        this.state = {
            item:  itemsArray,
            buttons: [],
            currentPage: 0,
            pageSize: 30
        }

        this.fetchItem = this.fetchItem.bind(this)
        this.capitalize = this.capitalize.bind(this)
        this.handlePageClick = this.handlePageClick.bind(this)
    }

    fetchItem(){
        // fetch from mongodb
        for(let id = 1; id < 954; id++){
            let url = 'https://pokebackend-461l.appspot.com/itemcards/' + id;
            fetch(url)
                .then((response) => {
                    if(response.ok){
                        return response.json();
                    } else {
                        throw new Error("failed to get response");
                    }
                })
                .then(data => {
                    if(data != null) {
                        // get page number and update state
                        let pageNum = Math.floor((id - 1) / this.state.pageSize);
                        let index = (id - 1) % this.state.pageSize;

                        // add a button for every new page
                        if (index == 0) this.setState(prevState => {
                            let buttonArray = [...prevState.buttons]
                            buttonArray[pageNum] =
                                <button type="button" id={pageNum} className="btn btn-light"
                                        onClick={this.handlePageClick}>
                                    {pageNum + 1}
                                </button>

                            return {
                                buttons: buttonArray
                            }
                        })

                        this.setState(prevState => {
                            let itemArray = [...prevState.item]
                            itemArray[pageNum][index] =
                                <ItemsBox
                                    picture={data.sprite}
                                    effect={data.effect[0].effect}
                                    name={this.capitalize(data.name)}
                                    id={data.id}
                                />;

                            return {
                                item: itemArray
                            }
                        })
                    }
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

    handlePageClick(event) {
        const {id} = event.target
        this.setState({
            currentPage: id
        })
    }

    componentDidMount() {
        this.fetchItem();
    }
    render()
    {
        return (

            <div className="container-fluid" id="mainContent">
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
                    {this.state.item[this.state.currentPage]}
                    </tbody>
                </table>
                <div className="navbar" style={{marginBottom: "30px"}}>
                    {this.state.buttons}
                </div>
            </div>
        );
    }
}

export default Items;