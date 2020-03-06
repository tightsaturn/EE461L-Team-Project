import React from 'react';
import {Link} from "react-router-dom";

const tableitems = {
    marginLeft: "200px",
    marginTop: "70px",
    marginRight: "100px",
}

const Items = () => {
    return (

        <div style={tableitems}>
            <h1>Items</h1>
            <br/>
            <table className="table">
                <thead className="thead-dark">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Item</th>
                    <th scope="col">Effect</th>
                    <th scope="col">Picture</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <th scope="row">001</th>
                    <Link to={"/items/info"}>
                    </Link>
                    <td>By releasing stench when attacking, this Pokémon may cause the target to flinch.	</td>
                    <td>III</td>
                </tr>
                <tr>
                    <th scope="row">002</th>
                    <Link to={"/items/info"}>
                        <td>Drizzle</td>
                    </Link>
                    <td>The Pokémon makes it rain when it enters a battle.	</td>
                    <td>III</td>
                </tr>
                <tr>
                    <th scope="row">003</th>
                    <Link to={"/items/info"}>
                        <td>Speed Boost</td>
                    </Link>
                    <td>Its Speed stat is boosted every turn.</td>
                    <td>III</td>
                </tr>
                <tr>
                    <th scope="row">#</th>
                    <Link to={"/items/info"}>
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

export default Items;