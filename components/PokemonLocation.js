import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import "../App.css"
import bulby from "../images/bulbasaur.png"
import {Link} from "react-router-dom";
import pokemonData from "./pokemonData";

const tablelocations = {
    marginTop: "70px",
    paddingLeft: "200px",
    paddingRight: "120px",
};

const pokemonBlock = {
    display: "block",
    maxHeight: "130px",
    maxWidth: "200px",
    height: "auto",
    width: "auto",
    paddingBottom: "20px",
    marginRight: "auto",
    marginLeft: "auto"
};

const PokemonLocation = () => {
    return (
        <div style={tablelocations}>
                <h1 align={"center"}> #001 Bulbasaur <img src={bulby} style={pokemonBlock}/> </h1>

            <br/>
            <table className="table">
                <thead className="thead-dark">
                <tr>
                    <th>Locations</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                        <a><td>Cannot be found in the wild</td></a>
                </tr>
                </tbody>
            </table>
        </div>
    );
};

export default PokemonLocation;