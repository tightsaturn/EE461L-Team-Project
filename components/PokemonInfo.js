import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import "../App.css"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Table from 'react-bootstrap/Table';
import {Link} from "react-router-dom";
import pokemonData from './pokemonData.js';

const PokemonInfo = () => {
    return (
        <div className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light">
            <div className="col-md-5 p-lg-5 mx-auto my-5">
                <h1 id = "pname"className="display-4 font-weight-normal">Pokemon Name</h1>
                <p id = "pinfo" className="lead font-weight-normal">Some more Info</p>
                <Link to={"/pokemon/location"}>
                    <a className="btn btn-outline-secondary" href="#">Location</a>
                </Link>
            </div>

            <div class ="pokemon"></div>
            <script src={pokemonData.js}></script>
        </div>
    );
}

export default PokemonInfo;