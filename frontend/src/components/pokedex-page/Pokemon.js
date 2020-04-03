import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import "../../App.css"
import SearchFilter from "../SearchFilter";
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
            buttons: buttonsArray,
            currentPage: 0,
            pageSize: 36
        }
        this.fetchPokemon = this.fetchPokemon.bind(this)
        this.capitalize = this.capitalize.bind(this)
        this.handlePageClick = this.handlePageClick.bind(this)
        this.fetchOnePokemon = this.fetchOnePokemon.bind(this)
    }

    async fetchOnePokemon(id) {
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
            let url = 'https://pokebackend-461l.appspot.com/pokemoncards/' + id;
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
                                imgURL: data.frontSprite,
                                id: id,
                                name: this.capitalize(data.name)
                            }

                        return {
                            pokemon: pokeArray,
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

    // redirects user to page when button clicked
    handlePageClick(event) {
        const {id} = event.target
        this.setState({currentPage: id})
    }

    componentDidMount() {
        this.fetchPokemon();
    }

    render() {
        let pokemon = this.state.pokemon[this.state.currentPage].map(item => {
            return <PokemonBox
                imgURL={item.imgURL}
                id={item.id}
                name={item.name}
            />
        })
        let buttons = this.state.buttons.map((item, index) => {
            let className = (this.state.currentPage == index) ? "btn btn-success":"btn btn-light"

            return <button
                type="button"
                id={item.id}
                className={className}
                onClick={this.handlePageClick}> {item.id+1}
            </button>
        })

        return (
            <div className="App">
                <div className="container" style={tableabilities}>
                    <h1>Pokemon</h1>
                    <br/>
                    <br/>
                    <SearchFilter/>
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