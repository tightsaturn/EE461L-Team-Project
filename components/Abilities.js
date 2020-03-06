
import React from 'react';
import {Link} from "react-router-dom";

const tableabilities = {
    marginLeft: "200px",
    marginTop: "70px",
    marginRight: "100px",
}

const Abilities = () => {
    return (

        <div style={tableabilities}>
            <h1>Abilities</h1>
            <br/>
            <table className="table">
                <thead className="thead-dark">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Effect</th>
                    <th scope="col">Generation</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <th scope="row">001</th>
                    <Link to={"/abilities/info"}>
                        <a><td>Stench</td></a>
                    </Link>
                    <td>By releasing stench when attacking, this Pokémon may cause the target to flinch.	</td>
                    <td>III</td>
                </tr>
                <tr>
                    <th scope="row">002</th>
                    <Link to={"/abilities/info"}>
                        <td>Drizzle</td>
                    </Link>
                    <td>The Pokémon makes it rain when it enters a battle.	</td>
                    <td>III</td>
                </tr>
                <tr>
                    <th scope="row">003</th>
                    <Link to={"/abilities/info"}>
                    <td>Speed Boost</td>
                    </Link>
                    <td>Its Speed stat is boosted every turn.</td>
                    <td>III</td>
                </tr>
                <tr>
                    <th scope="row">#</th>
                    <Link to={"/abilities/info"}>
                        <td>Ability Name</td>
                    </Link>
                    <td>Effect Description</td>
                    <td>From what Generation</td>
                </tr>
                <tr>
                    <th scope="row">...</th>
                    <td>...</td>
                    <td>...</td>
                    <td>...</td>
                </tr>
                </tbody>
            </table>
        </div>
    );
}
export default Abilities;