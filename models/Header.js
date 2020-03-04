import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import "../App.css"
import logo from "../images/logo4.png"
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
                <a href='#' className="navbar-brand" style={{color: "#f2c858",
                    fontFamily: "Chilanka",
                    marginLeft: "100px"}}>Recipes</a>
                <a href='#' className="navbar-brand" style={modelLink}>News</a>

                <img src={logo} className="navbar-brand" style={logoBlock}/>

                <a href='#' className="navbar-brand" style={modelLink}>Restaurants</a>
                <a href='#' className="navbar-brand" style={modelLink}>Delivery</a>
                <button className="btn-sm btn-success">Log In</button>
            </nav>

            <div class="jumbotron">Search will go here later</div>
        </div>
    )
}

export default Header