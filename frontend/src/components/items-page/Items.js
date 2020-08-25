import React from 'react';
import "../../css/page.css"
import ItemsBox from "../items-page/ItemsBox";
import ItemsSearchFilter from "./ItemsSearchFilter";


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
            itemsArray: [],
            buttons: [],
            currentPage: 0,
            pageSize: 50,
            isFiltered: false,
            numFiltered: 0
        }

        this.fetchItem = this.fetchItem.bind(this)
        this.filter = this.filter.bind(this)
        this.reset = this.reset.bind(this)
        this.capitalize = this.capitalize.bind(this)
        this.handlePageClick = this.handlePageClick.bind(this)
    }

    fetchItem(){
        // fetch from mongodb
        for(let id = 1; id < 954; id++){
            let url = 'https://togeapi.uc.r.appspot.com/itemcards/' + id;
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
                                item: itemArray,
                                numLoaded: prevState.numLoaded + 1
                            }
                        })
                    }
                })
                .catch((err) =>{
                    console.log(err)
                });
        }
    }

    filter (name, include) {
        // check if all pokemon are finished loading (alert if not)
        if(this.state.numLoaded < 953) {
            alert("Wait for all the items to finish loading first!" + this.state.numLoaded)
            return
        }

        // check if all the fields are empty
        if(name === "" && include === "") {
            this.setState({
                isFiltered: false
            })
            return
        }

        // keep a subarray for each filter option and combine at the end
        // a true entry means pokemon i fits the filter criteria (e.g. name or type1)
        let filterArray = [[], []]
        for(let i = 0; i < this.state.item.length; i++) {
            for(let j = 0; j < this.state.pageSize; j++) {
                // get pokemon and find out if it matches filter criteria
                let item = this.state.item[i][j]
                if (item === undefined) break
                console.log(item.props)
                console.log(item.props.name)
                item = item.props


                if (name !== "") {
                    if (name.toLowerCase() === item.name.toLowerCase()) {
                        filterArray[0].push(true)
                    } else filterArray[0].push(false)
                }   // pushes true if there is no entry
                else filterArray[0].push(true)

                // check if substring include is in pokemon name
                if (include !== "") {
                    if ((item.name.toLowerCase()).indexOf(include.toLowerCase()) !== -1) {
                        filterArray[1].push(true)
                    } else filterArray[1].push(false)
                } else filterArray[1].push(true)
            }
        }

        // only add pokemon to filtered list if all of the filter criteria are met
        let filteredItems = []
        for(let i = 0; i < 953; i++) {
            if(filterArray[0][i] &&
                filterArray[1][i]) {
             //   console.log(i)
                filteredItems.push(i)
            }
        }

        this.setState({
            filteredItems: filteredItems,
            isFiltered: true,
            numFiltered: filteredItems.length,
        })
    }

    reset() {
        this.setState({
            isFiltered: false,
        })
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
    render() {
        let items = this.state.isFiltered ?
            this.state.filteredItems.map((item) => {
                let pageNum = Math.floor(item / this.state.pageSize);
                let i = item % this.state.pageSize;
                // console.log(pageNum, i)
                return this.state.item[pageNum][i]
            }) : this.state.item[this.state.currentPage]

        let buttons = this.state.isFiltered ? null : this.state.buttons
        let filterMessage = this.state.isFiltered ? (this.state.numFiltered + " results found") : null

        return (
            <div className="container-fluid" id="mainContent">
                <h1 style={{fontWeight: "bold", fontSize: "2.8em"}}>Items</h1>
                <br/>
                <ItemsSearchFilter
                    onFilter={this.filter}
                    onReset={this.reset}
                />
                <h4 style={{marginTop: "10px"}}>{filterMessage}</h4>
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
                    {items}
                    </tbody>
                </table>
                <div className="navbar" style={{marginBottom: "30px"}}>
                    {buttons}
                </div>
            </div>
        );
    }
}

export default Items;