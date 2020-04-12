import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import "../../App.css"
import MovesBox from "../moves-page/MovesBox";

const container = {
    marginTop: "70px",
    paddingLeft: "200px",
    paddingRight: "120px",
};

class PokemonInfo extends React.Component {
    constructor(){
        super();
        this.state = {
            name: "",
            imgURL: "",
            moves: [],
            types: []
        }

        this.capitalize = this.capitalize.bind(this)
    }

    componentDidMount() {
        let id = this.props.match.params.id
        let url = 'https://pokebackend-461l.appspot.com/pokemon/' + id;

        fetch(url)
            .then((response) => {
                return response.json();
            })
            .then(data => {
                console.log(data)
                let movesArray = []
                let typesArray = []

                let type2 = data.types.length == 2 ? data.types[1].type.name : ""
                typesArray.push(type2)
                typesArray.push(data.types[0].type.name)

                this.setState({
                    name: data.name,
                    imgURL: data.frontSprite,
                    moves: data.moves,
                    types: typesArray
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
        let id = this.props.match.params.id

        return (
            <div className="container-fluid" style={container} >
                <div className="row">
                    <div className="col-4">
                        <div className="card" style={{width: "25rem", marginLeft: "30px"}}>
                            <img className="card-img-top" src={this.state.imgURL} alt="Card image cap"/>
                                <div className="card-body">
                                    <h5 className="card-title"># {id}</h5>
                                    <p className="card-text">{this.capitalize(this.state.name)} <br/>
                                        description here
                                    </p>
                                </div>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">Types: {this.capitalize(this.state.types[0])} {this.capitalize(this.state.types[1])}</li>
                                    <li className="list-group-item"></li>
                                    <li className="list-group-item"></li>
                                </ul>
                                <div className="card-body">
                                    <a href="#" className="card-link">Card link</a>
                                    <a href="#" className="card-link">Another link</a>
                                </div>
                        </div>
                    </div>

                    <div className="col-8">
                        <table className="table">
                            <thead className="thead-light">
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Level Learned</th>
                                <th scope="col">Type</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.moves.map(move => (
                                <ul key={move}>{(move.move.name[0].toUpperCase() + move.move.name.slice(1)) + "----------------------------------------" +(move.version_group_details[0].level_learned_at)} </ul>
                            ))}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        );
    }
}

export default PokemonInfo;