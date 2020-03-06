import React from 'react';
import {Link} from "react-router-dom";

const tablemoves = {
    marginLeft: "200px",
    marginTop: "70px",
    marginRight: "100px",
}

const Moves = () => {
    return (

        <div style={tablemoves}>
            <h1>Moves</h1>
            <br/>
            <table className="table">
                <thead className="thead-dark">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Effect</th>
                    <th scope="col">Type</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <th scope="row">001</th>
                    <Link to={"/moves/info"}>
                        <a><td>Stench</td></a>
                    </Link>
                    <td>By releasing stench when attacking, this Pokémon may cause the target to flinch.	</td>
                    <td>III</td>
                </tr>
                <tr>
                    <th scope="row">002</th>
                    <Link to={"/moves/info"}>
                        <td>Drizzle</td>
                    </Link>
                    <td>The Pokémon makes it rain when it enters a battle.	</td>
                    <td>III</td>
                </tr>
                <tr>
                    <th scope="row">003</th>
                    <Link to={"/moves/info"}>
                        <td>Speed Boost</td>
                    </Link>
                    <td>Its Speed stat is boosted every turn.</td>
                    <td>III</td>
                </tr>
                <tr>
                    <th scope="row">#</th>
                    <Link to={"/moves/info"}>
                        <td>Move Name</td>
                    </Link>
                    <td>Move Description</td>
                    <td></td>
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
export default Moves;