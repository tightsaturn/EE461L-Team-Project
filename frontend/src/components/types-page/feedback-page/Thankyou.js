import React from "react"


const header = {
    marginTop: "70px",
    paddingLeft: "200px",
    paddingRight: "120px"
}

function Thankyou(){
    return(
        <div className={"container-fluid"} style={header}>
            <h1>Thank you for your feedback!</h1>
        </div>
    )
}

export default Thankyou