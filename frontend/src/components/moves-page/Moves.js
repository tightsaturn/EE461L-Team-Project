import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import "../../App.css"
import "../../css/page.css"
import MovesSearchFilter from "./MovesSearchFilter";
import MovesBox from "./MovesBox";
import PokemonBox from "../pokedex-page/PokemonBox";
import AbilitiesBox from "../abilities-page/AbilitiesBox";


class Moves extends React.Component {
    constructor(){
        super();

        // initialize 2d array for pagination
        let movesArray = []
        let buttonsArray = []
        for(let i = 0; i < 75; i++){
            movesArray.push([])
        }

        this.state = {
            move:  movesArray,
            numMoves: 728,
            filteredMoves: [],
            sortedPokemon: [],
            buttons: buttonsArray,
            currentPage: 0,
            pageSize: 48,
            numLoaded: 0,   // counts how many moves loaded to see when fetching finishes
            isFiltered: false,
            numFiltered: 0,  // shows number of results for filter
            isSorted: false,
        }

        this.fetchMove = this.fetchMove.bind(this)
        this.capitalize = this.capitalize.bind(this)
        this.search = this.search.bind(this)
        this.filter = this.filter.bind(this)
        this.sort = this.sort.bind(this)
        this.reset = this.reset.bind(this)
        this.handlePageClick = this.handlePageClick.bind(this)
        this.fetchOneMove = this.fetchOneMove.bind(this)
    }

    fetchOneMove = async (id) => {
        let url = 'https://pokebackend-461l.appspot.com/movecards/' + id;
        await fetch(url)
            .then((response) => {
                return response.json();
            })
            .then(data => {
                // get page number and update state
                let pageNum = Math.floor((id-1)/this.state.pageSize);
                let index = (id-1)%this.state.pageSize;

                this.setState(prevState => {
                    let movesArray = [...prevState.move]
                    movesArray[pageNum][index] =
                        <MovesBox
                            type={this.capitalize(data.type[0].name)}
                            effect={data.effect[0].effect}
                            name={this.capitalize(data.name)}
                            id={data.id}
                        />;

                    return {
                        move: movesArray,
                    }
                })
            })
            .catch((err) =>{
                console.log(err)
            });
    }

    fetchMove(){
        // fetch each pokemon and add to state
        for(let id = 1; id <= this.state.numMoves; id++){
            let url = 'https://pokebackend-461l.appspot.com/movecards/' + id;
            fetch(url)
                .then((response) => {
                    if(response.ok){ return response.json(); }
                })
                .then(data => {
                    // get page number and update state
                    let pageNum = Math.floor((id-1)/this.state.pageSize);
                    let index = (id-1)%this.state.pageSize;

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
                        let movesArray = [...prevState.move]
                        movesArray[pageNum][index] = {
                            type: this.capitalize(data.type[0].name),
                            effect: data.effect[0].effect,
                            name: this.capitalize(data.name),
                            id: data.id
                        }

                        return {
                            move: movesArray,
                            numLoaded: prevState.numLoaded + 1
                        }
                    })
                })
                .catch((err) =>{ console.log(err) });
        }
    }

    search(name) {
        if(this.state.numLoaded < this.state.numMoves) {
            alert("Wait for all the moves to finish loading first!")
            return
        }

        if(name === "") {
            this.setState({
                isFiltered: false,
            })
            return
        }

        let id = null
        for(let i = 0; i < this.state.move.length; i++) {
            for (let j = 0; j < this.state.pageSize; j++) {
                let moveJSON = {...this.state.move[i][j]}
                if (moveJSON.name === undefined) break
                if(moveJSON.name.toLowerCase() == name.toLowerCase()){
                    id = moveJSON.id - 1
                    break
                }
            }
        }

        if(id == null) return

        this.setState({
            filteredMoves: [id],
            isFiltered: true,
            numFiltered: 1
        })
    }

    filter (include, type) {
        // check if all pokemon are finished loading (alert if not)
        if(this.state.numLoaded < this.state.numMoves) {
            alert("Wait for all the moves to finish loading first!" + this.state.numLoaded)
            return
        }

        // check if all the fields are empty
        if(include === "" && type === "None") {
            this.setState({
                isFiltered: false
            })
            return
        }

        // keep a subarray for each filter option and combine at the end
        // a true entry means move i fits the filter criteria (e.g. name or type1)
        let filterArray = [[], []]
        for(let i = 0; i < this.state.move.length; i++) {
            for(let j = 0; j < this.state.pageSize; j++) {
                // get pokemon and find out if it matches filter criteria
                let moveJSON = {...this.state.move[i][j]}
                if(moveJSON.name === undefined) break

                // check if substring include is in pokemon name
                if(include !== "") {
                    if((moveJSON.name.toLowerCase()).indexOf(include.toLowerCase()) !== -1) {
                        filterArray[0].push(true)
                    } else filterArray[0].push(false)
                }
                else filterArray[0].push(true)

                if(type !== "None") {
                    if(moveJSON.type.toLowerCase() == type.toLowerCase()) {
                        filterArray[1].push(true)
                    } else filterArray[1].push(false)
                }
                else filterArray[1].push(true)
            }
        }

        // only add pokemon to filtered list if all of the filter criteria are met
        let filteredMoves = []
        for(let i = 0; i < this.state.numMoves; i++) {
            if(filterArray[0][i] &&
                filterArray[1][i]){
                filteredMoves.push(i)
            }
        }

        this.setState({
            filteredMoves: filteredMoves,
            isFiltered: true,
            numFiltered: filteredMoves.length,
        })
    }

    sort(sortBy) {
        console.log(sortBy)
        if(this.state.numLoaded < this.state.numMoves) {
            alert("Wait for all the pokemon to finish loading first!")
            return
        }

        if(sortBy === "None") {
            this.setState({
                isSorted: false
            })
            return
        }

        switch(sortBy) {
            case("ascAZ"):
                let sortedArr = []
                let sorted = []
                for(let i = 0; i < 50; i++) {
                    sorted.push([])
                }

                for(let k = 0; k < this.state.numMoves; k++) {
                    let i = Math.floor(k /this.state.pageSize);
                    let j = k%this.state.pageSize;
                    sortedArr[k] = this.state.move[i][j]
                }

                console.log(sortedArr)
                sortedArr.sort((a, b) => {
                    return a.name > b.name ? 1 : -1
                })

                console.log(sortedArr)
                for(let k = 0; k < sortedArr.length; k++) {
                    let i = Math.floor(k /this.state.pageSize);
                    let j = k%this.state.pageSize;
                    sorted[i][j] = sortedArr[k]
                }

                this.setState({
                    sortedMoves: sorted,
                    isFiltered: false,
                    isSorted: true
                })
                break
            case("descZA"):
                let sortedAr = []
                let sort = []
                for(let i = 0; i < 50; i++) {
                    sort.push([])
                }

                for(let k = 0; k < this.state.numMoves; k++) {
                    let i = Math.floor(k /this.state.pageSize);
                    let j = k%this.state.pageSize;
                    sortedAr[k] = this.state.move[i][j]
                }

                sortedAr.sort((a, b) => {
                    return a.name < b.name ? 1 : -1
                })

                for(let k = 0; k < sortedAr.length; k++) {
                    let i = Math.floor(k /this.state.pageSize);
                    let j = k%this.state.pageSize;
                    sort[i][j] = sortedAr[k]
                }

                this.setState({
                    sortedMoves: sort,
                    isFiltered: false,
                    isSorted: true
                })
                break
            default:
                console.log("error: should not be here")
                console.log("sorted by is: " + sortBy)
        }
    }

    reset() {
        this.setState({
            isFiltered: false,
            isSorted: false
        })
    }

    // redirects user to page when button clicked
    handlePageClick(event) {
        const {id} = event.target
        this.setState({currentPage: id})
    }

    capitalize(name) {
        let firstLetter = name.charAt(0).toUpperCase()
        return (firstLetter + name.substring(1))
    }


    componentDidMount() {
        this.setState({
            isFiltered: false
        })
        this.fetchMove();
    }

    render() {
        // conditional rendering with filtering
        let moves = []
        if(this.state.isFiltered) {
            moves =
                this.state.filteredMoves.map(item => {
                    let pageNum = Math.floor((item) / this.state.pageSize);
                    let index = (item) % this.state.pageSize;
                    let move = this.state.move[pageNum][index]

                    return <MovesBox
                        type={move.type}
                        id={move.id}
                        name={move.name}
                        effect={move.effect}
                    />
                })
        }else if(this.state.isSorted){
            moves =
                this.state.sortedMoves[this.state.currentPage].map(item => {
                    return <MovesBox
                        type={item.type}
                        id={item.id}
                        name={item.name}
                        effect={item.effect}
                    />
            })
        } else {
            moves = this.state.move[this.state.currentPage].map(item => {
                return <MovesBox
                    type={item.type}
                    id={item.id}
                    name={item.name}
                    effect={item.effect}
                />
            })
        }

        let buttons = this.state.isFiltered ? null : this.state.buttons.map((item, index) => {
            let className = (this.state.currentPage == index) ? "btn btn-success":"btn btn-light"
            if(item == undefined) return undefined
            return <button
                type="button"
                id={item.id}
                className={className}
                onClick={this.handlePageClick}> {item.id+1}
            </button>
        })

        let filterMessage = this.state.isFiltered ? (this.state.numFiltered + " results found") : null

        return (
            <div className="container-fluid" id="mainContent">
                <h1 style={{fontWeight: "bold", fontSize: "2.8em"}}>Moves</h1>
                <br/>
                <br/>
                <MovesSearchFilter
                    onSearch={this.search}
                    onSort={this.sort}
                    onFilter={this.filter}
                    onReset={this.reset}
                />
                <h4 style={{marginTop: "10px"}}>{filterMessage}</h4>
                <div className="row mt-5">
                    {moves}
                </div>
                <div className="navbar" style={{ marginTop: "10px", marginBottom: "30px"}}>
                    {buttons}
                </div>
            </div>
        );
    }
}

export default Moves;