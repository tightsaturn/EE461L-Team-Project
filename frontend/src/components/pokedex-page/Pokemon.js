import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import "../../App.css"
import PokemonSearchFilter from "./PokemonSearchFilter";
import PokemonBox from "./PokemonBox";

const tableabilities = {
    marginLeft: "400px",
    marginTop: "15px",
    marginRight: "100px",
}

class Pokemon extends React.Component {
    constructor(){
        super();

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
            pokemon: pokeArray,
            filteredPokemon: [],
            buttons: buttonsArray,
            currentPage: 0,
            pageSize: 36,
            numLoaded: 0,   // counts how many pokemon loaded to see when fetching finishes
            isFiltered: false,
            numFiltered: 0  // shows number of results for filter
        }
        this.fetchPokemon = this.fetchPokemon.bind(this)
        this.capitalize = this.capitalize.bind(this)
        this.filter = this.filter.bind(this)
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
        for(let id = 1; id < 808; id++){
            // fetch each pokemon and add to state
            let url = 'https://pokeapi.co/api/v2/pokemon/' + id;
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
                                imgURL: data.sprites.front_default,
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
                .catch((err) =>{
                    console.log(err)
                });
        }
    }

    filter (name, include, type1, type2) {
        // check if all pokemon are finished loading (alert if not)
        if(this.state.numLoaded < 807) {
            alert("Wait for all the pokemon to finish loading first!")
            return
        }

        // check if all the fields are empty
        if(name === "" && include === "" && type1 === "None" && type2 === "None") {
            this.setState({
                isFiltered: false
            })
            return
        }

        // keep a subarray for each filter option and combine at the end
        // a true entry means pokemon i fits the filter criteria (e.g. name or type1)
        let filterArray = [[], [], [], []]
        for(let i = 0; i < this.state.pokemon.length; i++) {
            for(let j = 0; j < this.state.pageSize; j++) {
                // get pokemon and find out if it matches filter criteria
                let pokeJSON = {...this.state.pokemon[i][j]}
                if(pokeJSON.name === undefined) break

                // console.log(pokeJSON.name)

                if(name !== ""){
                    if(name.toLowerCase() === pokeJSON.name.toLowerCase()) {
                        filterArray[0].push(true)
                    } else filterArray[0].push(false)
                }   // pushes true if there is no entry
                else filterArray[0].push(true)

                // check if substring include is in pokemon name
                if(include !== "") {
                    if((pokeJSON.name.toLowerCase()).indexOf(include.toLowerCase()) !== -1) {
                        filterArray[1].push(true)
                    } else filterArray[1].push(false)
                }
                else filterArray[1].push(true)

                if(pokeJSON.types.length === 2) {
                    if(type1 !== "None") {
                        if(pokeJSON.types[0].type.name === type1.toLowerCase() || pokeJSON.types[1].type.name === type1.toLowerCase()) {
                            filterArray[2].push(true)
                        } else filterArray[2].push(false)
                    }
                    else filterArray[2].push(true)

                    if(type2 !== "None") {
                        if(pokeJSON.types[0].type.name === type2.toLowerCase() || pokeJSON.types[1].type.name === type2.toLowerCase()) {
                            filterArray[3].push(true)
                        } else filterArray[3].push(false)
                    }
                    else filterArray[3].push(true)
                } else {
                    if(type1 !== "None" && type2 !== "None") {
                        // if filter specifies 2 types but pokemon only has one (the pokemon does not get added)
                        filterArray[2].push(false)
                        filterArray[3].push(false)
                    } else {
                        if(type1 !== "None") {
                            if(pokeJSON.types[0].type.name === type1.toLowerCase()) {
                                filterArray[2].push(true)
                            } else filterArray[2].push(false)
                        }
                        else filterArray[2].push(true)

                        if(type2 !== "None") {
                            if(pokeJSON.types[0].type.name === type2.toLowerCase()) {
                                filterArray[3].push(true)
                            } else filterArray[3].push(false)
                        }
                        else filterArray[3].push(true)
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
        let pokemon = this.state.isFiltered ?
            // item holds id of pokemon to be rendered
            this.state.filteredPokemon.map(item => {
                let pageNum = Math.floor((item)/this.state.pageSize);
                let index = (item)%this.state.pageSize;
                let pokemon = this.state.pokemon[pageNum][index]

                console.log(pokemon.name)

                return <PokemonBox
                    imgURL={pokemon.imgURL}
                    id={pokemon.id}
                    name={pokemon.name}
                />
            }) :
            this.state.pokemon[this.state.currentPage].map(item => {
                return <PokemonBox
                    imgURL={item.imgURL}
                    id={item.id}
                    name={item.name}
                />
            })
        let buttons = this.state.isFiltered ? null : this.state.buttons.map((item, index) => {
            let className = (this.state.currentPage == index) ? "btn btn-success":"btn btn-light"

            return <button
                type="button"
                id={item.id}
                className={className}
                onClick={this.handlePageClick}> {item.id+1}
            </button>
        })

        let filterMessage = this.state.isFiltered ? (this.state.numFiltered + " results found") : null

        return (
            <div className="App">
                <div className="container" style={tableabilities}>
                    <h1>Pokemon</h1>
                    <br/>
                    <br/>
                    <PokemonSearchFilter
                        onFilter={this.filter}
                        onReset={this.reset}
                    />
                    <h3 style={{marginTop: "15px"}}>{filterMessage}</h3>
                    <div className="row mt-5">
                        {pokemon}
                    </div>
                    <div className="navbar" style={{marginBottom: "30px"}}>
                        {buttons}
                    </div>
                </div>
            </div>
        );
    }
}

export default Pokemon;