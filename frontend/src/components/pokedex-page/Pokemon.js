import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import "../../App.css"
import "../../css/page.css"
import PokemonSearchFilter from "./PokemonSearchFilter";
import PokemonBox from "./PokemonBox";


class Pokemon extends React.Component {
    constructor(){
        super();

        // initialize 2d array for pagination
        let pokeArray = []
        let buttonsArray = []
        for(let i = 0; i < 50; i++){
            pokeArray.push([])
        }

        this.state = {
            pokemon: pokeArray,
            numPokemon: 807,
            filteredPokemon: [],
            sortedPokemon: [],
            buttons: buttonsArray,
            currentPage: 0,
            pageSize: 40,
            numLoaded: 0,   // counts how many pokemon loaded to see when fetching finishes
            isFiltered: false,
            numFiltered: 0,  // shows number of results for filter
            isSorted: false,
        }
        this.fetchPokemon = this.fetchPokemon.bind(this)
        this.capitalize = this.capitalize.bind(this)
        this.search = this.search.bind(this)
        this.filter = this.filter.bind(this)
        this.sort = this.sort.bind(this)
        this.reset = this.reset.bind(this)
        this.handlePageClick = this.handlePageClick.bind(this)
        this.fetchOnePokemon = this.fetchOnePokemon.bind(this)
    }

    fetchOnePokemon = async (id) => {
        let url = 'https://pokebackend-461l.appspot.com/pokemoncards/' + id;
        await fetch(url)
            .then((response) => {
                return response.json();
            })
            .then(data => {
                // get page number and update state
                let pageNum = Math.floor((id-1)/this.state.pageSize);
                let index = (id-1)%this.state.pageSize;

                this.setState(prevState => {
                    let pokeArray = [...prevState.pokemon]
                    pokeArray[pageNum][index] =
                        <PokemonBox
                            imgURL={data.frontSprite}
                            id={id}
                            name={this.capitalize(data.name)}
                        />;

                    return {
                        pokemon: pokeArray,
                    }
                })
            })
            .catch((err) =>{
                console.log(err)
            });
    }

    fetchPokemon(){
        // fetch each pokemon and add to state
        for(let id = 1; id <= this.state.numPokemon; id++){
            let url = 'https://pokebackend-461l.appspot.com/pokemoncards/' + id;
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
                        let pokeArray = [...prevState.pokemon]
                        pokeArray[pageNum][index] = {
                            imgURL: data.frontSprite,
                            id: id,
                            name: this.capitalize(data.name),
                            types: data.types
                        }

                        return {
                            pokemon: pokeArray,
                            numLoaded: prevState.numLoaded + 1
                        }
                    })
                })
                .catch((err) =>{ console.log(err) });
        }
    }

    search(name) {
        if(this.state.numLoaded < this.state.numPokemon) {
            alert("Wait for all the pokemon to finish loading first!")
            return
        }

        if(name === "") {
            this.setState({
                isFiltered: false,
            })
            return
        }

        let id = null
        for(let i = 0; i < this.state.pokemon.length; i++) {
            for (let j = 0; j < this.state.pageSize; j++) {
                let pokeJSON = {...this.state.pokemon[i][j]}
                if (pokeJSON.name === undefined) break
                if(pokeJSON.name.toLowerCase() == name.toLowerCase()){
                    id = pokeJSON.id - 1
                    break
                }
            }
        }

        if(id == null) return

        this.setState({
            filteredPokemon: [id],
            isFiltered: true,
            numFiltered: 1
        })
    }

    filter (include, type1, type2) {
        // check if all pokemon are finished loading (alert if not)
        if(this.state.numLoaded < this.state.numPokemon) {
            alert("Wait for all the pokemon to finish loading first!")
            return
        }

        // check if all the fields are empty
        if(include === "" && type1 === "None" && type2 === "None") {
            this.setState({
                isFiltered: false,
            })
            return
        }

        // keep a subarray for each filter option and combine at the end
        // a true entry means pokemon i fits the filter criteria (e.g. name or type1)
        let filterArray = [[], [], []]
        for(let i = 0; i < this.state.pokemon.length; i++) {
            for(let j = 0; j < this.state.pageSize; j++) {
                // get pokemon and find out if it matches filter criteria
                let pokeJSON = {...this.state.pokemon[i][j]}
                if(pokeJSON.name === undefined) break

                // check if substring include is in pokemon name
                if(include !== "") {
                    if((pokeJSON.name.toLowerCase()).indexOf(include.toLowerCase()) !== -1) {
                        filterArray[0].push(true)
                    } else filterArray[0].push(false)
                }
                else filterArray[0].push(true)

                if(pokeJSON.types.length === 2) {
                    if(type1 !== "None") {
                        if(pokeJSON.types[0].type.name === type1.toLowerCase() || pokeJSON.types[1].type.name === type1.toLowerCase()) {
                            filterArray[1].push(true)
                        } else filterArray[1].push(false)
                    }
                    else filterArray[1].push(true)

                    if(type2 !== "None") {
                        if(pokeJSON.types[0].type.name === type2.toLowerCase() || pokeJSON.types[1].type.name === type2.toLowerCase()) {
                            filterArray[2].push(true)
                        } else filterArray[2].push(false)
                    }
                    else filterArray[2].push(true)
                } else {
                    if(type1 !== "None" && type2 !== "None") {
                        // if filter specifies 2 types but pokemon only has one (the pokemon does not get added)
                        filterArray[1].push(false)
                        filterArray[2].push(false)
                    } else {
                        if(type1 !== "None") {
                            if(pokeJSON.types[0].type.name === type1.toLowerCase()) {
                                filterArray[1].push(true)
                            } else filterArray[1].push(false)
                        }
                        else filterArray[1].push(true)

                        if(type2 !== "None") {
                            if(pokeJSON.types[0].type.name === type2.toLowerCase()) {
                                filterArray[2].push(true)
                            } else filterArray[2].push(false)
                        }
                        else filterArray[2].push(true)
                    }
                }
            }
        }

        // only add pokemon to filtered list if all of the filter criteria are met
        let filteredPokemon = []
        for(let i = 0; i < this.state.numPokemon; i++) {
            if(filterArray[0][i] &&
                filterArray[1][i] &&
                filterArray[2][i]) {
                filteredPokemon.push(i)
            }
        }

        this.setState({
            filteredPokemon: filteredPokemon,
            isFiltered: true,
            numFiltered: filteredPokemon.length,
        })
    }

    sort(sortBy) {
        console.log(sortBy)
        if(this.state.numLoaded < this.state.numPokemon) {
            alert("Wait for all the pokemon to finish loading first!")
            return
        }

        switch(sortBy) {
            case("ascID"):
                this.setState({
                    isFiltered: false,
                    isSorted: false
                })
                break
            case("descID"):
                // reverse pokemon array (gets last pokemon and places it to front of sorted array)
                let sortedArray = []
                for(let i = 0; i < 50; i++) {
                    sortedArray.push([])
                }

                for(let k = 0; k < this.state.numPokemon; k++) {
                    let i = Math.floor(k /this.state.pageSize);
                    let j = k%this.state.pageSize;
                    let descI = Math.floor((this.state.numPokemon-k-1)/this.state.pageSize);
                    let descJ = (this.state.numPokemon-k-1)%this.state.pageSize;

                    // console.log(i, j, descI, descJ)
                    // console.log(this.state.pokemon[i][j], this.state.pokemon[descI][descJ])

                    sortedArray[i][j] = this.state.pokemon[descI][descJ]
                }

                this.setState({
                    sortedPokemon: sortedArray,
                    isFiltered: false,
                    isSorted: true
                })
                break
            case("ascAZ"):
                let sortedArr = []
                let sorted = []
                for(let i = 0; i < 50; i++) {
                    sorted.push([])
                }

                for(let k = 0; k < this.state.numPokemon; k++) {
                    let i = Math.floor(k /this.state.pageSize);
                    let j = k%this.state.pageSize;
                    sortedArr[k] = this.state.pokemon[i][j]
                }

                sortedArr.sort((a, b) => {
                    return a.name > b.name ? 1 : -1
                })

                for(let k = 0; k < sortedArr.length; k++) {
                    let i = Math.floor(k /this.state.pageSize);
                    let j = k%this.state.pageSize;
                    sorted[i][j] = sortedArr[k]
                }

                this.setState({
                    sortedPokemon: sorted,
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

                for(let k = 0; k < this.state.numPokemon; k++) {
                    let i = Math.floor(k /this.state.pageSize);
                    let j = k%this.state.pageSize;
                    sortedAr[k] = this.state.pokemon[i][j]
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
                    sortedPokemon: sort,
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
        this.fetchPokemon();
    }

    render() {
        // conditional rendering with filtering
        let pokemon = []
        if(this.state.isFiltered) {
            pokemon =
                this.state.filteredPokemon.map(item => {
                    let pageNum = Math.floor((item)/this.state.pageSize);
                    let index = (item)%this.state.pageSize;
                    let pokemon = this.state.pokemon[pageNum][index]

                    return <PokemonBox
                        imgURL={pokemon.imgURL}
                        id={pokemon.id}
                        name={pokemon.name}
                    />
                })
        } else if(this.state.isSorted) {
            pokemon =
                this.state.sortedPokemon[this.state.currentPage].map(item => {
                    return <PokemonBox
                        imgURL={item.imgURL}
                        id={item.id}
                        name={item.name}
                    />
                })
        } else {
            pokemon = this.state.pokemon[this.state.currentPage].map(item => {
                return <PokemonBox
                    imgURL={item.imgURL}
                    id={item.id}
                    name={item.name}
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
                <h1 style={{fontWeight: "bold", fontSize: "2.8em"}}>Pokemon</h1>
                <br/>
                <br/>
                <PokemonSearchFilter
                    onSearch={this.search}
                    onSort={this.sort}
                    onFilter={this.filter}
                    onReset={this.reset}
                />
                <h4 style={{marginTop: "10px"}}>{filterMessage}</h4>
                <div className="row mt-5">
                    {pokemon}
                </div>
                <div className="navbar" style={{ marginTop: "10px", marginBottom: "30px"}}>
                    {buttons}
                </div>
            </div>
        );
    }
}

export default Pokemon;