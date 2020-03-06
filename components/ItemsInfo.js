import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import "../App.css"

const tableabilities = {
    marginTop: "70px",
    paddingLeft: "200px",
    paddingRight: "120px"
}

const ItemsInfo = (props) => {
    let item = props.match.params.item;

    // fetch from database
    return (
        <div className="container-fluid" style ={tableabilities} >
            <div className="card" align={"center"}>
                <div className="col-md-5 p-lg-5 mx-auto my-5">
                    <h1 id = "pname"className="display-4 font-weight-normal">{item}</h1>
                    <p id = "pinfo" className="lead font-weight-normal">Some more Item Info</p>
                </div>
            </div>
        </div>
    );
}

export default ItemsInfo;