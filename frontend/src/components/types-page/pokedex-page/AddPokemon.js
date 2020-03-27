import React from 'react';
import {Link} from "react-router-dom";
import SearchFitler from "../SearchFilter";
import {Button} from "react-bootstrap";

const tablepokemon = {
    marginLeft: "200px",
    marginTop: "70px",
    marginRight: "100px",
}

const AddPokemon = () => {
    return (

        <div style={tablepokemon}>
            <h1>Pokemon</h1>
            <br/>
            <SearchFitler/>
            <br/>
            <table className="table">
                <thead className="thead-dark">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Pokemon</th>
                    <th scope="col">Type</th>
                    <th scope="col">Picture</th>
                    <th scope="col">Add</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <th scope="row">001</th>
                    <td><Link to={"/pokemon/info"}>Bulbasaur</Link></td>
                    <td>Grass and Poison</td>
                    <td>X</td>
                    <td><Link to = "/teambuilder"><Button variant="outline-info">+ Add</Button></Link></td>
                </tr>
                <tr>
                    <th scope="row">002</th>
                    <td><Link to={"/pokemon/info"}>Ivysaur</Link></td>
                    <td>Grass and Poison</td>
                    <td>X</td>
                    <td><Link to = "/teambuilder"><Button variant="outline-info">+ Add</Button></Link></td>
                </tr>
                <tr>
                    <th scope="row">003</th>
                    <td><Link to={"/pokemon/info"}>Venusaur</Link></td>
                    <td>Grass and Poison</td>
                    <td>X</td>
                    <td><Link to = "/teambuilder"><Button variant="outline-info">+ Add</Button></Link></td>
                </tr>
                <tr>
                    <th scope="row">...</th>
                    <td>...</td>
                    <td>...</td>
                    <td>...</td>
                    <td><Link to = "/teambuilder"><Button variant="outline-info">+ Add</Button></Link></td>
                </tr>
                <tr>
                    <th scope="row">007</th>
                    <td><Link to={"/pokemon/info"}>Squirtle</Link></td>
                    <td>Water</td>
                    <td>X</td>
                    <td><Link to = "/teambuilder"><Button variant="outline-info">+ Add</Button></Link></td>
                </tr>
                <tr>
                    <th scope="row">#</th>
                    <td><Link to={"/pokemon/info"}>Pokemon Name</Link></td>
                    <td>Type</td>
                    <td>X</td>
                    <td><Link to = "/teambuilder"><Button variant="outline-info">+ Add</Button></Link></td>
                </tr>
                </tbody>
            </table>
        </div>
    );
}

export default AddPokemon;