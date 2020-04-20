import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import "../../App.css"
import "../../css/page.css"
import MovesSearchFilter from "./MovesSearchFilter";
import MovesBox from "./MovesBox";


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
            filteredMoves: [],
            buttons: buttonsArray,
            currentPage: 0,
            pageSize: 48,
            numLoaded: 0,   // counts how many pokemon loaded to see when fetching finishes
            isFiltered: false,
            numFiltered: 0,  // shows number of results for filter
        }

        this.fetchMove = this.fetchMove.bind(this)
        this.capitalize = this.capitalize.bind(this)
        this.filter = this.filter.bind(this)
        this.reset = this.reset.bind(this)
        this.handlePageClick = this.handlePageClick.bind(this)
        this.fetchOneMove = this.fetchOneMove.bind(this)
    }

    fetchOneMove = async (id) => {
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
        for(let id = 1; id < 726; id++){
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

    filter (name, include, type1, type2) {
        // check if all pokemon are finished loading (alert if not)
        if(this.state.numLoaded < 726) {
            alert("Wait for all the pokemon to finish loading first!")
            return
        }

        // check if all the fields are empty
        if(name === "" && include === "" && type1 === "None" && type2 === "None") {
            this.setState({
                isFiltered: false,
            })
        }
    }

    reset() {
        this.setState({
            isFiltered: false,
            backgroundHeight: "750%"
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
        let moves =
            this.state.move[this.state.currentPage].map(item => {
                return <MovesBox
                    type={item.type}
                    id={item.id}
                    name={item.name}
                    effect={item.effect}
                />
            })
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