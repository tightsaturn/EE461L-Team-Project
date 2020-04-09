import React from 'react'
import "../Background.css"
import Developer_Card from "./Developer_Card";
import Background from "../Background"
import tristan from "./css/tristan.jpeg"
import jaime from "./css/jaime.jpg"
import jimmy from "./css/jimmy.jpg"
import mihir from "./css/mihir.jpg"

import "./css/AboutUs_Background.css"
import "./css/About_App.css"

const tableaboutus = {
    marginLeft: "200px",
    marginTop: "70px",
    marginRight: "100px",
}

class AboutUs_App extends React.Component {
    constructor() {
        super();
        this.state = {
            totalNumCommits: 0,
            numCommits: [0, 0, 0, 0],
            totalNumIssues: 0,
            numIssues: [0, 0]
        }
    }

    componentDidMount() {
        // get the data from the API call
        fetch('https://api.github.com/repos/tmcdaniel511/EE461L-Team-Project/contributors')
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error("failed to get response")
                }
            })
            .then(data => {
                // get number of commits and update state
                let numberCommits = [0, 0, 0, 0]
                let totalCommits = 0

                for (let i = 0; i < 4; i++) {
                    numberCommits[i] = data[i].contributions
                    totalCommits += data[i].contributions
                }

                this.setState({
                    numCommits: numberCommits,
                    totalNumCommits: totalCommits
                })
            });

        fetch('https://api.github.com/repos/tmcdaniel511/EE461L-Team-Project/issues')
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error("failed to get response")
                }
            })
            .then(data => {
                // get number of issues and update state
                this.setState(prevState => {
                    return {
                        ...prevState,
                        totalNumIssues: prevState.totalNumIssues + data.length,
                        numIssues: [data.length, prevState.numIssues[1]]
                    }
                })
            });

        fetch('https://api.github.com/repos/tmcdaniel511/EE461L-Team-Project/issues?state=closed')
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error("failed to get response")
                }
            })
            .then(data => {
                // get number of issues and update state
                let numClosedIssues = 0
                for(let i = 0; i < data.length; i++){
                    if((data[i].title).includes("Issue")){
                        numClosedIssues++
                    }
                }

                this.setState(prevState => {
                    return {
                        ...prevState,
                        totalNumIssues: prevState.totalNumIssues + numClosedIssues,
                        numIssues: [prevState.numIssues[0], numClosedIssues]
                    }
                })
            });
    }

    render() {
        return (
            <div>
                <Background/>

                <div style={tableaboutus}>
                    <h1>About</h1>
                    <br></br>
                    <h4>Website Description</h4>
                    <p>This website will provide the necessary information
                        needed by any Pokemon trainer. Everything from the listing
                        of all Pokemon to a listing of each one's
                        characteristics can be found. Become the best trainer
                        by learning how to fully utilize items and form
                        the ultimate team. Welcome to a new realm of
                        possibilities.</p>
                    <br></br>

                    <p>In creating this website, we hoped to spread the joy
                        of the worldwide phenomenon of Pokemon to more people. The
                        site's intended purpose is to expose a user of any experience
                        level to the vast world of Pokemon by providing a wiki-like
                        reference site. Users can learn about the unique characteristics
                        of each Pokemon to inform them to make smart decisions in
                        battle and to allow them to find their next big trophy. Users
                        may utilize the team builder tool to mock-up their ideal team
                        and align their expectations towards the abilities of such team.
                        Along with this, users may explore the vast library of items
                        available to learn more about what they just picked-up in game
                        or to find the next holy grail for them to pursue.</p>

                    <br></br>

                    <p>Ultimately, this website is for users of any age. As long
                        as the user has the faintest interest in pocket monsters, we hope
                        that this website will prove to be a useful utility for them.</p>

                    <br></br>

                    <h4>About the Developers</h4>
                    <div className="row">
                        <div className="col-lg-3 grid-margin" id="card-col">
                            <Developer_Card
                                image={jaime}
                                name="Jaime Tan Leon"
                                track="Software and Academic Enrichment"
                                res="Responsibilities: Abilities and Items Pages"
                            />
                        </div>

                        <div className="col-lg-3 grid-margin" id="card-col">
                            <Developer_Card
                                image={tristan}
                                name="Tristan McDaniel"
                                track="Embedded Systems/Computer Architecture and Software"
                                res="Responsibilities: Team Builder and About Us Pages"
                            />
                        </div>

                        <div className="col-lg-3 grid-margin" id="card-col">
                            <Developer_Card
                                image={jimmy}
                                name="Jimmy Phan"
                                track="Data Science and Academic Enrichment"
                                res="Responsibilities: Pokedex and Moves Pages"
                            />
                        </div>

                        <div className="col-lg-3 grid-margin" id="card-col">
                            <Developer_Card
                                image={mihir}
                                name="Mihir Shah"
                                track="Embedded Systems/Computer Architecture and Integrated Circuits"
                                res="Responsibilities: Feedback Page and Login Functionality"
                            />
                        </div>
                    </div>

                    <br></br>

                    <h4>Development Statistics</h4>

                    <div>
                        Number of commits: <br></br>
                        Tristan: {this.state.numCommits[0]} <br></br>
                        Jaime: {this.state.numCommits[1]} <br></br>
                        Jimmy: {this.state.numCommits[2]} <br></br>
                        Mihir: {this.state.numCommits[3]} <br></br>
                        Total commits: {this.state.totalNumCommits} <br></br>
                        Number of Closed Issues: {this.state.numIssues[0]} <br></br>
                        Number of Open Issues: {this.state.numIssues[1]} <br></br>
                        Total number of Issues: {this.state.totalNumIssues} <br></br>
                        Number of tests: 0 <br></br>
                    </div>

                    <br/>
                    <h4>Data Sources</h4>
                    <a href={"https://pokeapi.co/"}>https://pokeapi.co</a>/- Python Script into Mongodb
                    <br/>
                    <a href={"https://api.github.com/"}>https://api.github.com/ </a> - Fetching from URL using
                    <br/>
                    <br/>
                    <h4>Tools</h4>
                    <p> Implementation of the front-end was completed through JavaScript and React. React provided 
                        enhanced abilities than those offered by vanilla JavaScript and HTML in which we often took
                        advantage of the grid functionalities and formatting that it offers. Bootstrap was also utilized
                        in order to provide nicer elements such as buttons. Compilation of the JavaScript files was
                        conducted through NodeJS.</p>
                    <br/>

                    <p> During the development of phase 1, our team attempted to implement styling functionality from MaterialUI when
                        trying to create grids and AG Grid when trying to implement tables. Ultimately, our team decided
                        against the use of these resources in order to have coherency with web pages created by other team
                        members using the tools provided by React. </p>
                    <br/>

                    <p> For the developement of phase 2, we did not make any changes to the tools used for the front-end due to the
                        fact that react provided all of the necessary resources to create our webpages.</p>
                    <br/>

                    <p> Implementation of the back-end was completed through JavaScript, Mongoose, Express, and cors. Mongoose provided
                        the necessary resources for accessing our MongoDB database while Express provided a meaningful functions for
                        routing requests to the backend and was used in conjunction with the Express middleware cors. Overall, Express 
                        allowed us to route URL calls to the backend for certain functionality in which most calls fetched data from the 
                        database. For fetching information from our database, Mongoose proved to be very capable in which
                        it handled the links to each collection and provided functions for getting and updating information in our database.
                        Through Mongoose, we created a model for each of our collections, which was based on a schema for the types of data in
                        the collection. With the model, we could then call Mongoose-provided functions for interfacing with the database.</p>
                    <br/>    

                    <p> In order to implement API calls to GitHub, we utilized AJAX such that data concerning the repository
                        use could be dynamically displayed on the about page. To collect and store data from the various
                        APIs that we will utilize for the project, we utilized Python scripts and MongoDB respectively. React
                        Router was later implemented to link web pages and provide a flow among each site.</p>
                    <br/>    

                    <p> Testing was implemented through Selenium to test the UI, Postman to test the back-end, and Enzyme to test our
                        React code.</p>
                    <br/>    

                    <p> Development by each member of the team was conducted in WebStorm by JetBrains and Visual Studio Code. The app was
                        ultimately deployed in Google Cloud Platform.
                    </p>
                    <br/>
                    <h4>Github</h4>
                    <a href={"https://github.com/tmcdaniel511/EE461L-Team-Project"}>Our Github Page</a>
                    <br/>
                    <br/>
                </div>
            </div>
        )
    }
}

export default AboutUs_App
