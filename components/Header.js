import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import "../App.css"
import logo from "../images/logo.jpg"
import { Link } from 'react-router-dom';
import headerImg from "../images/headerImg.jpeg"


const navBar = {
    backgroundColor: "black",
    height:"130px"
};

const modelLink = {
    marginBottom: "10px",
    color: "yellow",
    textAlign: "center",
    fontFamily: "Chilanka",
};

const logoBlock = {
    display: "block",
    maxHeight: "120px",
    maxWidth: "200px",
    height: "auto",
    width: "auto",
    paddingBottom: "20px"
};

const logIn = {
    marginBottom: "10px",
    fontFamily: "Calibri"
};



const Header = () => {
    return (
        <div>
            <nav className="navbar" style={navBar}>
                <Link to={"/pokemon"}><a className="navbar-brand" style={modelLink}>Pokedex</a></Link>
                <Link to={"/moves"}> <a className="navbar-brand" style={modelLink}>Moves</a> </Link>
                <Link to={"/abilities"}> <a className="navbar-brand" style={modelLink}>Abilities</a> </Link>

                <Link to={"/"}><img src={logo} className="navbar-brand" style={logoBlock}/></Link>
                <Link to={"/teambuilder"}> <a className="navbar-brand" style={modelLink}>Team Builder</a> </Link>
                <Link to={"/items"}> <a className="navbar-brand" style={modelLink}>Items</a> </Link>
                <Link to={"/aboutus"}> <a className="navbar-brand" style={modelLink}>About Us</a> </Link>
                <button className="btn-sm btn-success" style={logIn}>Log In</button>
            </nav>
        </div>

    )
};

export default Header
