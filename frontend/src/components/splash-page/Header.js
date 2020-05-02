import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import "../../App.css"
import logo from "../../images/logo.jpg"
import { Link } from 'react-router-dom';

const navBar = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height:"12vh",
    marginBottom: "12%",
    backgroundColor: "black",
    overflowX: "hidden",
    overflowY: "hidden",
    zIndex: 1
};

const modelLink = {
    marginBottom: "10px",
    color: "white",
    textAlign: "center",
    fontFamily: "Chilanka"
};

const logoBlock = {
    display: "block",
    maxHeight: "12vh",
    maxWidth: "200px",
    height: "auto",
    width: "auto",
    paddingBottom: "20px"
};

const Header = () => {
    return (
        <div>
            <div className="navbar" style={navBar}>
                <Link to={"/pokemon"}><a className="navbar-brand" style={modelLink}>Pokedex</a></Link>
                <Link to={"/moves"}> <a className="navbar-brand" style={modelLink}>Moves</a> </Link>
                <Link to={"/abilities"}> <a className="navbar-brand" style={modelLink}>Abilities</a> </Link>
                <Link to={"/items"}> <a className="navbar-brand" style={modelLink}>Items</a> </Link>

                <Link to={"/"}><img src={logo} className="navbar-brand" style={logoBlock}/></Link>
                <Link to={"/types"}> <a className="navbar-brand" style={modelLink}>Types</a> </Link>
                <Link to={"/teambuil" +
                "der"}> <a className="navbar-brand" style={modelLink}>Team Builder</a> </Link>
                <Link to={"/aboutus"}> <a className="navbar-brand" style={modelLink}>About Us</a> </Link>
                <Link to={"/feedback"}> <a className="navbar-brand" style={modelLink}>Feedback</a> </Link>
            </div>
        </div>
    )
};

export default Header
