import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import "../../App.css"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Table from 'react-bootstrap/Table';
import {Link} from "react-router-dom";

const tableabilities = {
    marginTop: "70px",
    paddingLeft: "200px",
    paddingRight: "120px"
}

const PokemonInfo = (props) => {
    let ability = props.match.params.ability;

    // fetch from database
    return (
        <div className="container-fluid" style ={tableabilities} >
        <div className="card" align={"center"}>
            <div className="col-md-5 p-lg-5 mx-auto my-5">
                <h1 id = "pname"className="display-4 font-weight-normal">{ability}</h1>
                <p id = "pinfo" className="lead font-weight-normal">Some more ability Info</p>
            </div>
        </div>
        </div>
    );
}

export default PokemonInfo;