import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import "../../App.css"
import Button from 'react-bootstrap/Button';
import {Link} from "react-router-dom";
import SearchFitler from "../SearchFilter";

const tableabilities = {
    marginLeft: "400px",
    marginTop: "15px",
    marginRight: "100px",
}

const Pokemon = () => {
    return (
        <div className="App">
            <div className="container" style={tableabilities}>
                <h1>Pokemon</h1>
                <br/>
                <br/>
           <SearchFitler />
                <div className="row mt-5">
                    <div className="col-lg-4 mb-4 grid-margin">
                        <div className="card h-100 ">
                            <h4 className="card-header"> #001 Bulbasaur </h4>
                            <div className="card-body">
                                <p className="card-text">Type: Grass/Poison</p>
                            </div>
                            <div className="card-footer">
                                <Link to={"/pokemon/bulbasaur"}>
                                    <Button on variant="btn btn-danger">Learn more</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 mb-4 grid-margin">
                        <div className="card h-100">
                            <h4 className="card-header"> # Pokemon </h4>
                            <div className="card-body">
                                <p className="card-text"> Pokemon Info</p>
                            </div>
                            <div className="card-footer">
                                <Link to={"/pokemon/pokemon name"}>
                                    <Button variant="btn btn-danger">Learn More</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 mb-4 grid-margin">
                        <div className="card h-100">
                            <h4 className="card-header"> # Pokemon </h4>
                            <div className="card-body">
                                <p className="card-text"> Pokemon Info</p>
                            </div>
                            <div className="card-footer">
                                <Link to={"/pokemon/pokemon name"}>
                                    <Button variant="btn btn-danger">Learn More</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 mb-4 grid-margin">
                        <div className="card h-100">
                            <h4 className="card-header"> # Pokemon </h4>
                            <div className="card-body">
                                <p className="card-text"> Pokemon Info</p>
                            </div>
                            <div className="card-footer">
                                <Link to={"/pokemon/pokemon name"}>
                                    <Button variant="btn btn-danger">Learn More</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 mb-4 grid-margin">
                        <div className="card h-100">
                            <h4 className="card-header"> # Pokemon </h4>
                            <div className="card-body">
                                <p className="card-text"> Pokemon Info</p>
                            </div>
                            <div className="card-footer">
                                <Link to={"/pokemon/pokemon name"}>
                                    <Button variant="btn btn-danger">Learn More</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 mb-4 grid-margin">
                        <div className="card h-100">
                            <h4 className="card-header"> # Pokemon </h4>
                            <div className="card-body">
                                <p className="card-text"> Pokemon Info</p>
                            </div>
                            <div className="card-footer">
                                <Link to={"/pokemon/pokemon name"}>
                                    <Button variant="btn btn-danger">Learn More</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 mb-4 grid-margin">
                        <div className="card h-100">
                            <h4 className="card-header"> # Pokemon </h4>
                            <div className="card-body">
                                <p className="card-text"> Pokemon Info</p>
                            </div>
                            <div className="card-footer">
                                <Link to={"/pokemon/pokemon name"}>
                                    <Button variant="btn btn-danger">Learn More</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 mb-4 grid-margin">
                        <div className="card h-100">
                            <h4 className="card-header"> # Pokemon </h4>
                            <div className="card-body">
                                <p className="card-text"> Pokemon Info</p>
                            </div>
                            <div className="card-footer">
                                <Link to={"/pokemon/pokemon name"}>
                                    <Button variant="btn btn-danger">Learn More</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 mb-4 grid-margin">
                        <div className="card h-100">
                            <h4 className="card-header"> # Pokemon </h4>
                            <div className="card-body">
                                <p className="card-text"> Pokemon Info</p>
                            </div>
                            <div className="card-footer">
                                <Link to={"/pokemon/pokemon name"}>
                                    <Button variant="btn btn-danger">Learn More</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Pokemon;