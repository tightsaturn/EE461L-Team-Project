import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import "../../App.css"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Table from 'react-bootstrap/Table';
import {Link} from "react-router-dom";
import PokemonBox from "./PokemonBox";

const tableabilities = {
    marginTop: "70px",
    paddingLeft: "200px",
    paddingRight: "120px"
};

class PokemonInfo extends React.Component {
    constructor(){
        super();
        this.state = {
            pokemon: {},
        }
        this.capitalize = this.capitalize.bind(this)
    }

    componentDidMount() {
        let id = this.props.match.params.id
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
                this.setState({ pokemon: data})
                console.log(data)
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
            <div className="container-fluid" style={tableabilities} align={"center"}>
                <div className="card">
                    <div className="col-md-5 p-lg-5 mx-auto my-5">
                        <h1 id="pname" className="display-4 font-weight-normal">{this.capitalize(this.state.pokemon.name)}</h1>
                        <p id="pinfo" className="lead font-weight-normal"></p>
                        <Link to={"/pokemon/" + id + "/location"}>
                            <a className="btn btn-outline-secondary" href="#">Location</a>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default PokemonInfo;