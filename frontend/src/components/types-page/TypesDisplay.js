import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import "../../css/page.css"
import {Link} from "react-router-dom";


class TypesDisplay extends React.Component {
    constructor(){
        super();
        this.state = {
            pokemonArray:[],
            movesArray:[],
            name: "",
            imgURL: ""
        }

        this.capitalize = this.capitalize.bind(this)
    }

    componentDidMount() {
        let id = this.props.match.params.type
        let url = 'https://pokebackend-461l.appspot.com/types/' + id;

        fetch(url)
            .then((response) => {
                return response.json();
            })
            .then(data => {
                console.log(data)
                this.setState({
                    name: data.name,
                    pokemonArray: data.pokemon,
                    movesArray: data.moves,
                })

            })
            .catch((err) =>{
                console.log(err)
            });
    }

    capitalize(name) {
        name = String(name)
        let firstLetter = name.charAt(0).toUpperCase()
        return (firstLetter + name.substring(1))
    }

    render() {
        let id = this.props.match.params.type
        let pokemonWithThisType = this.state.pokemonArray.map(pokemon => {
            let id = pokemon.pokemon.url.substring(34);
            if(parseInt(id) <= 807) {
                return (
                    <tr>
                        <td>
                            <Link to={"/pokemon/" + id}>
                                {(this.capitalize(pokemon.pokemon.name))}
                            </Link>
                        </td>
                    </tr>
                );
            }
        })
        return (
            <div className="container-fluid" id="mainContent">
                <h1>{this.capitalize(id)} Pokemon</h1>
                <table className="table">
                    <thead className="thead-dark">
                    <tr>
                        <th scope="col">Name</th>
                    </tr>
                    </thead>
                    <tbody>
                    {pokemonWithThisType}
                    </tbody>
                </table>
                <div className="navbar" style={{marginBottom: "30px"}}>
                    {this.state.buttons}
                </div>
            </div>
        );
    }
}

export default TypesDisplay;