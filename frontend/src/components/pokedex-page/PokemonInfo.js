import React from "react"
import { Link } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css'
import "../../App.css"
import "../../css/page.css"
import "../../css/info.css"
import { capitalize, colourNameToHex } from "../componentFunctions";
import {lighten} from "@material-ui/core";

class PokemonInfo extends React.Component {
    constructor(){
        super();
        this.state = {
            name: "",
            imgURL: "",
            moves: [],
            types: [],
            abilities: [],
            stats: [],
            color: ""
        }
    }

    componentDidMount() {
        let id = this.props.match.params.id
        let context = this.context

        fetch('https://togeapi.uc.r.appspot.com/pokemon/' + id)
            .then(response => { return response.json() })
            .then(data => {
                let typesArray = []

                let type2 = data.types.length == 2 ? data.types[1].type.name : ""
                typesArray.push(data.types[0].type.name)
                typesArray.push(type2)

                this.setState({
                    name: data.name,
                    imgURL: data.frontSprite,
                    moves: data.moves,
                    types: typesArray,
                    abilities: data.abilities,
                    stats: data.stats
                })
            })
            .catch((err) =>{ console.log(err) });

        fetch('https://pokeapi.co/api/v2/pokemon-species/' + id)
            .then(response => { return response.json() })
            .then(data => {
                console.log(data);
                this.setState({ color: data.color.name})
            })
            .catch((err) =>{ console.log(err) });
    }


    render() {
        let id = this.props.match.params.id
        let colorHex = colourNameToHex(this.state.color)
        if(colorHex == false) colorHex = "#000000"
        let borderColor = this.state.color == "white" ? "black": this.state.color

        let type1 = this.state.types[0] ? require(`../../images/Types/${capitalize(this.state.types[0])}.png`) : ""
        let type2 = this.state.types[1] ? require(`../../images/Types/${capitalize(this.state.types[1])}.png`) : ""
        let typeImg2 = type2 ? <img src={type2} alt="type 2" className="typeImg"/> : null

        /* create tables by mapping each move to a row */
        let moves = this.state.moves.map(move => {
            // find id of move (pos 31 is where the id is located in string)
            const moveName = move.move.name
            return (
                <tr>
                    <td>
                        <Link to={"/moves/" + moveName}>
                            {capitalize(move.move.name)}
                        </Link>
                    </td>
                    <td>{move.version_group_details[0].level_learned_at}</td>
                </tr>
            )
        })

        let abilities = this.state.abilities.map((ability, index) => {
            const id = ability.ability[0].url.substring(34)
            return (
                <div>- <Link to={"/abilities/" + id}>{capitalize(ability.ability[0].name)}</Link></div>
            )
        })

        return (
            <div className="container-fluid" id="infoContent" style={{backgroundColor: lighten(colorHex, 0.5)}}>
                <div className="row">
                    <div className="col-5">
                        <div className="card" id="infoCard" style={{border: "solid 3px " + borderColor}}>
                            <img className="card-img-top" src={this.state.imgURL} alt="Card image cap"/>
                            <div className="card-body">
                                <h6 className="card-title" id="id"># {id}</h6>
                                <p className="card-text" id="name">
                                    {capitalize(this.state.name)}
                                </p>
                                <p className="card-text" id="types">
                                    <Link to={"/types/" + this.state.types[0]}>
                                        <img src={type1} alt="type 1" className="typeImg"/>
                                    </Link>
                                    <Link to={"/types/" + this.state.types[1]}>
                                        {typeImg2}
                                    </Link>
                                </p>
                                <p className="card-text" id="abilities">
                                    Abilities: <br/>
                                    {abilities}
                                </p>
                            </div>

                        </div>
                    </div>

                    <div className="col-1"></div>

                    <div className="col-6">
                        <div id="typesTable">
                            <h2 style={{paddingBottom: "20px"}}>Moves</h2>
                            <table className="table table-hover" style={{border: "solid 3px " + borderColor}}>
                                <thead className="thead-dark">
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Level Learned</th>
                                </tr>
                                </thead>
                                <tbody>
                                    {moves}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PokemonInfo;