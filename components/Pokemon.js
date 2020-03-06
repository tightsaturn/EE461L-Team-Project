import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import "../App.css"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Table from 'react-bootstrap/Table';
import {Link} from "react-router-dom";
import Header from "./Header";
import pokemonData from './pokemonData.js';

const tableabilities = {
    marginLeft: "200px",
    marginTop: "70px",
    marginRight: "100px",
}

const Pokemon = () => {
    return (
        <div className="App">
            <header>
                <div class="float-right">
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-success">Search</Button>
                </Form>
                </div>
            </header>
            <div className="container" style={tableabilities}>
                <div className="row mt-5">
                    <div className="col-lg-4 mb-4 grid-margin">
                        <div className="card h-100 ">
                            <h4 className="card-header"> Bulbasaur #1</h4>
                            <div className="card-body">
                                <p className="card-text">Type: Grass/Poison</p>
                            </div>
                            <div className="card-footer">
                                <Link to={"/pokemon/info"}>
                                    <Button on variant="btn btn-danger">

                                        <script src={pokemonData.js}>
                                        </script>Learn More</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 mb-4 grid-margin">
                        <div className="card h-100">
                            <h4 className="card-header"> Pokemon #</h4>
                            <div className="card-body">
                                <p className="card-text"> Pokemon Info</p>
                            </div>
                            <div className="card-footer">
                                <Link to={"/pokemon/info"}>
                                    <Button variant="btn btn-danger">Learn More</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 mb-4 grid-margin">
                        <div className="card h-100">
                            <h4 className="card-header"> Pokemon #</h4>
                            <div className="card-body">
                                <p className="card-text"> Pokemon Info</p>
                            </div>
                            <div className="card-footer">
                                <Link to={"/pokemon/info"}>
                                    <Button variant="btn btn-danger">Learn More</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 mb-4 grid-margin">
                        <div className="card h-100">
                            <h4 className="card-header"> Pokemon #</h4>
                            <div className="card-body">
                                <p className="card-text"> Pokemon Info</p>
                            </div>
                            <div className="card-footer">
                                <Link to={"/pokemon/info"}>
                                    <Button variant="btn btn-danger">Learn More</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 mb-4 grid-margin">
                        <div className="card h-100">
                            <h4 className="card-header"> Pokemon #</h4>
                            <div className="card-body">
                                <p className="card-text"> Pokemon Info</p>
                            </div>
                            <div className="card-footer">
                                <Link to={"/pokemon/info"}>
                                    <Button variant="btn btn-danger">Learn More</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 mb-4 grid-margin">
                        <div className="card h-100">
                            <h4 className="card-header"> Pokemon #</h4>
                            <div className="card-body">
                                <p className="card-text"> Pokemon Info</p>
                            </div>
                            <div className="card-footer">
                                <Link to={"/pokemon/info"}>
                                    <Button variant="btn btn-danger">Learn More</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 mb-4 grid-margin">
                        <div className="card h-100">
                            <h4 className="card-header"> Pokemon #</h4>
                            <div className="card-body">
                                <p className="card-text"> Pokemon Info</p>
                            </div>
                            <div className="card-footer">
                                <Link to={"/pokemon/info"}>
                                    <Button variant="btn btn-danger">Learn More</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 mb-4 grid-margin">
                        <div className="card h-100">
                            <h4 className="card-header"> Pokemon #</h4>
                            <div className="card-body">
                                <p className="card-text"> Pokemon Info</p>
                            </div>
                            <div className="card-footer">
                                <Link to={"/pokemon/info"}>
                                    <Button variant="btn btn-danger">Learn More</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 mb-4 grid-margin">
                        <div className="card h-100">
                            <h4 className="card-header"> Pokemon #</h4>
                            <div className="card-body">
                                <p className="card-text"> Pokemon Info</p>
                            </div>
                            <div className="card-footer">
                                <Link to={"/pokemon/info"}>
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