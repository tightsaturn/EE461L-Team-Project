import React from 'react';
import "../../css/page.css"
import AbilitiesSearchFilter from "./AbilitiesSearchFilter";
import AbilitiesBox from "./AbilitiesBox";



class Abilities extends React.Component {
    constructor(){
        super();
        // initialize 2d array for pagination
        let abilitiesArray = []
        let buttonsArray = []
        for(let i = 0; i < 30; i++){
            abilitiesArray.push([])
        }

        this.state = {
            ability:  abilitiesArray,
            numAbilities: 232,
            filteredAbilities: [],
            sortedPokemon: [],
            buttons: buttonsArray,
            currentPage: 0,
            pageSize: 48,
            numLoaded: 0,   // counts how many pokemon loaded to see when fetching finishes
            isFiltered: false,
            numFiltered: 0,  // shows number of results for filter
        }

        this.fetchAbility = this.fetchAbility.bind(this)
        this.capitalize = this.capitalize.bind(this)
        this.search = this.search.bind(this)
        this.filter = this.filter.bind(this)
        this.sort = this.sort.bind(this)
        this.reset = this.reset.bind(this)
        this.handlePageClick = this.handlePageClick.bind(this)
        this.fetchOneAbility = this.fetchOneAbility.bind(this)
    }

    fetchOneAbility = async (id) => {
        let url = 'https://pokebackend-461l.appspot.com/abilitycards/' + id;
        await fetch(url)
            .then((response) => {
                return response.json();
            })
            .then(data => {
                // get page number and update state
                let pageNum = Math.floor((id-1)/this.state.pageSize);
                let index = (id-1)%this.state.pageSize;

                this.setState(prevState => {
                    let abilityArray = [...prevState.ability]
                    abilityArray[pageNum][index] =
                        <AbilitiesBox
                            generation={this.capitalizeG(data.generation[0].name)}
                            description={data.effect[0].short_effect}
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

    fetchAbility(){
        for(let id = 1; id <= this.state.numAbilities; id++){
            // fetch each ability and add to state
            let url = 'https://pokebackend-461l.appspot.com/abilitycards/' + id;
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
                        let abilityArray = [...prevState.ability]
                        abilityArray[pageNum][index] = {
                            generation: this.capitalizeG(data.generation[0].name),
                            description: data.effect[0].short_effect,
                            name: this.capitalize(data.name),
                            id: data.id,
                        }

                        return {
                            ability: abilityArray,
                            numLoaded: prevState.numLoaded + 1
                        }
                    })
                })
                .catch((err) =>{
                    console.log(err)
                });
        }
    }

    search(name) {
        if(this.state.numLoaded < this.state.numAbilities) {
            alert("Wait for all the abilities to finish loading first!")
            return
        }

        if(name === "") {
            this.setState({
                isFiltered: false,
            })
            return
        }

        let id = null
        for(let i = 0; i < this.state.ability.length; i++) {
            for (let j = 0; j < this.state.pageSize; j++) {
                let abilityJSON = {...this.state.ability[i][j]}
                if (abilityJSON.name === undefined) break
                if(abilityJSON.name.toLowerCase() == name.toLowerCase()){
                    id = abilityJSON.id - 1
                    break
                }
            }
        }

        if(id == null) return

        this.setState({
            filteredAbilities: [id],
            isFiltered: true,
            numFiltered: 1
        })
    }

    filter (include, gen) {
        // check if all pokemon are finished loading (alert if not)
        if(this.state.numLoaded < this.state.numAbilities) {
            alert("Wait for all the abilities to finish loading first!" + this.state.numLoaded)
            return
        }

        // check if all the fields are empty
        if(include === "" && gen === "") {
            this.setState({
                isFiltered: false
            })
            return
        }

        console.log("include " + include + " gen " + gen)

        // keep a subarray for each filter option and combine at the end
        // a true entry means pokemon i fits the filter criteria (e.g. name or type1)
        let filterArray = [[], []]
        for(let i = 0; i < this.state.ability.length; i++) {
            for(let j = 0; j < this.state.pageSize; j++) {
                // get pokemon and find out if it matches filter criteria
                let abilityJSON = {...this.state.ability[i][j]}
                if (abilityJSON.name === undefined) break

                // check if substring include is in pokemon name
                if (include !== "") {
                    if ((abilityJSON.name.toLowerCase()).indexOf(include.toLowerCase()) !== -1) {
                        filterArray[0].push(true)
                    } else filterArray[0].push(false)
                } else filterArray[0].push(true)

                if(gen !== "") {
                    if((abilityJSON.generation.substring(11) === gen)){
                        filterArray[1].push(true)
                    } else filterArray[1].push(false)
                } else filterArray[1].push(true)
            }
        }

        // only add pokemon to filtered list if all of the filter criteria are met
        let filteredAbilities = []
        for(let i = 0; i < this.state.numAbilities; i++) {
            if(filterArray[0][i] &&
                filterArray[1][i]) {
                filteredAbilities.push(i)
            }
        }

        this.setState({
            filteredAbilities: filteredAbilities,
            isFiltered: true,
            numFiltered: filteredAbilities.length,
        })
    }

    sort(sortBy) {
        console.log(sortBy)
        if(this.state.numLoaded < this.state.numAbilities) {
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

                for(let k = 0; k < this.state.numAbilities; k++) {
                    let i = Math.floor(k /this.state.pageSize);
                    let j = k%this.state.pageSize;
                    sortedArr[k] = this.state.ability[i][j]
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
                    sortedAbilities: sorted,
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

                for(let k = 0; k < this.state.numAbilities; k++) {
                    let i = Math.floor(k /this.state.pageSize);
                    let j = k%this.state.pageSize;
                    sortedAr[k] = this.state.ability[i][j]
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
                    sortedAbilities: sort,
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

    capitalizeG(generation) {
        let firstLetter = generation.charAt(0).toUpperCase()
        let romanGeneration = generation.substring(11).toUpperCase()
        return (firstLetter + generation.substring(1,11) + romanGeneration)
    }

    componentDidMount() {
        this.setState({
            isFiltered: false
        })
        this.fetchAbility();
    }

    render()
    {
        let abilities = []
        if(this.state.isFiltered) {
            abilities =
                this.state.filteredAbilities.map(item => {
                    let pageNum = Math.floor((item) / this.state.pageSize);
                    let index = (item) % this.state.pageSize;
                    let ability = this.state.ability[pageNum][index]

                    return <AbilitiesBox
                        generation={ability.generation}
                        id={ability.id}
                        name={ability.name}
                        description={ability.description}
                    />
                })
        }else if(this.state.isSorted){
            abilities =
                this.state.sortedAbilities[this.state.currentPage].map(item => {
                    return <AbilitiesBox
                        generation={item.generation}
                        id={item.id}
                        name={item.name}
                        description={item.description}
                    />
                })
        } else {
            abilities = this.state.ability[this.state.currentPage].map(item => {
                return <AbilitiesBox
                    generation={item.generation}
                    id={item.id}
                    name={item.name}
                    description={item.description}
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
                <h1 style={{fontWeight: "bold", fontSize: "2.8em"}}>Abilities</h1>
                <br/>
                <br/>
                <AbilitiesSearchFilter
                    onSearch={this.search}
                    onSort={this.sort}
                    onFilter={this.filter}
                    onReset={this.reset}
                />
                <h4 style={{marginTop: "10px"}}>{filterMessage}</h4>
                <div className="row mt-5">
                    {abilities}
                </div>
                <div className="navbar" style={{ marginTop: "10px", marginBottom: "30px"}}>
                    {buttons}
                </div>
            </div>
        );
    }
}
export default Abilities;