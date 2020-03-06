import React from 'react';
import {Link} from "react-router-dom";
import SearchFitler from "./SearchFilter";

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
            <SearchFitler/>
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
                        <td>Master-Ball</td>
                    </Link>
                    <td>Used in battle : Catches a wild Pokémon without fail. If used in a trainer battle, nothing happens and the ball is lost.</td>
                    <td>X</td>
                </tr>
                <tr>
                    <th scope="row">002</th>
                    <Link to={"/items/info"}>
                        <td>Ultra-Ball</td>
                    </Link>
                    <td>Used in battle : Attempts to catch a wild Pokémon, using a catch rate of 2×. If used in a trainer battle, nothing happens and the ball is lost.</td>
                    <td>X</td>
                </tr>
                <tr>
                    <th scope="row">003</th>
                    <Link to={"/items/info"}>
                        <td>Great-Ball</td>
                    </Link>
                    <td>Used in battle : Attempts to catch a wild Pokémon, using a catch rate of 1.5×. If used in a trainer battle, nothing happens and the ball is lost.</td>
                    <td>X</td>
                </tr>
                <tr>
                    <th scope="row">#</th>
                    <Link to={"/items/info"}>
                        <td>Move Name</td>
                    </Link>
                    <td>Move Description</td>
                    <td>X</td>
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