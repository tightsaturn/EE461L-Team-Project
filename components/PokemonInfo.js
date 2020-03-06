import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import "../App.css"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Table from 'react-bootstrap/Table';
import {Link} from "react-router-dom";
import pokemonData from './pokemonData.js';

const tableabilities = {
    marginTop: "70px",
    paddingLeft: "200px",
    paddingRight: "120px"
};

const PokemonInfo = () => {
    return (
        <div className="container-fluid" style ={tableabilities} align={"center"}>
            <div className="card">
            <div className="col-md-5 p-lg-5 mx-auto my-5">
                <h1 id = "pname"className="display-4 font-weight-normal">Pokemon Name</h1>
                <p id = "pinfo" className="lead font-weight-normal">Some more Info</p>
                <div className="pokemon"></div>
                <Link to={"/pokemon/location"}>
                    <a className="btn btn-outline-secondary" href="#">Location</a>
                </Link>
            </div>
            </div>
            <div class ="pokemon"></div>
            <script src={pokemonData.js}></script>
        </div>
    );
};

export default PokemonInfo;