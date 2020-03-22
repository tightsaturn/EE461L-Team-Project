import React from "react";
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";

const header = {
    marginTop: "70px",
    paddingLeft: "200px",
    paddingRight: "120px"
}

const Feedback = (props) => {
    return (
        <div className="container-fluid" style={header}>
            <div className="row-cols-2">
                <div>
                    <h2>Feedback</h2>
                    <p>
                        Please provide your feedback below:
                    </p>
                </div>
                <div>
                <form>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">Email address</label>
                        <input type="email" className="form-control" id="exampleFormControlInput1"
                               placeholder="name@example.com"></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlTextarea1">Feedback</label>
                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="6"></textarea>
                    </div>
                </form>
                    <Link to = "/feedback/thankyou">
                        <Button variant="outline-success">Submit</Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Feedback;