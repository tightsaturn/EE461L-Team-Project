import React from 'react';
import {Link} from "react-router-dom";
import SearchFitler from "./SearchFilter";

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
            <SearchFitler/>
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
                        <a><td>Pound</td></a>
                    </Link>
                    <td>Inflicts regular damage with no additional effect.</td>
                    <td>Normal</td>
                </tr>
                <tr>
                    <th scope="row">002</th>
                    <Link to={"/moves/info"}>
                        <td>Karate-Chop</td>
                    </Link>
                    <td>Inflicts regular damage. User's critical hit rate is one level higher when using this move.</td>
                    <td>Normal</td>
                </tr>
                <tr>
                    <th scope="row">003</th>
                    <Link to={"/moves/info"}>
                        <td>Double-Slap</td>
                    </Link>
                    <td>Inflicts regular damage. Hits 2–5 times in one turn. Has a 3/8 chance each to hit 2 or 3 times, and a 1/8 chance each to hit 4 or 5 times. Averages to 3 hits per use.</td>
                    <td>Normal</td>
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