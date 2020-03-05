import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import "../App.css"
import logo from "../images/logo4.png"
import { Link } from 'react-router-dom';
import headerImg from "../images/headerImg.jpeg"


const navBar = {
    backgroundColor:"#c24e4e",
    height:"130px"
};

const modelLink = {
    color: "#f2c858",
    textAlign: "center",
    fontFamily: "Chilanka",
};

const logoBlock = {
    display: "block",
    maxHeight: "130px",
    maxWidth: "200px",
    height: "auto",
    width: "auto",
    paddingBottom: "20px"
};

const logIn = {
    fontFamily: "Calibri"
};



const Header = () => {
    return (
        <div>
            <nav className="navbar" style={navBar}>
                <Link to={"/"}> <a className="navbar-brand" style={{color: "#f2c858",
                    fontFamily: "Chilanka",
                    marginLeft: "100px"}}> Home</a> </Link>
                <Link to={"/recipes"}><a className="navbar-brand" style={modelLink} >Recipes</a></Link>
                <Link to={"/news"}> <a className="navbar-brand" style={modelLink}>News</a> </Link>

                <Link to={"/"}><img src={logo} className="navbar-brand" style={logoBlock}/></Link>
                <Link to={"/restaurants"}> <a className="navbar-brand" style={modelLink}>Restaurants</a> </Link>
                <Link to={"/movedex"}> <a className="navbar-brand" style={modelLink}>Movedex</a> </Link>
                <Link to={"/aboutus"}> <a className="navbar-brand" style={modelLink}>About Us</a> </Link>
                <button className="btn-sm btn-success">Log In</button>
            </nav>
        </div>

    )
}

export default Header
