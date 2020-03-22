import React from 'react'
import "../Background.css"
import Developer_Card from "./Developer_Card";
import Background from "../Background"
import tristan from "./tristan.jpeg"
import jaime from "./jaime.jpg"
import jimmy from "./jimmy.jpg"
import mihir from "./mihir.jpg"

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
                                res="Created the format of our models and worked to format all the elements in our website"
                            />
                        </div>

                        <div className="col-lg-3 grid-margin" id="card-col">
                            <Developer_Card
                                image={tristan}
                                name="Tristan McDaniel"
                                track="Embedded Systems/Computer Architecture and Software"
                                res="Focused on Team Builder and About Us Page - Worked on Github API"
                            />
                        </div>

                        <div className="col-lg-3 grid-margin" id="card-col">
                            <Developer_Card
                                image={jimmy}
                                name="Jimmy Phan"
                                track="Data Science and Academic Enrichment"
                                res="Styled and fixed formatting issues and wrote React code for dynamic components"
                            />
                        </div>

                        <div className="col-lg-3 grid-margin" id="card-col">
                            <Developer_Card
                                image={mihir}
                                name="Mihir Shah"
                                track="Embedded Systems/Computer Architecture and Integrated Circuits"
                                res="Moves Page, Location Page - Formatting on Report and UML"
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
                    <p>Implementation of the front-end this phase of the project was completed through JavaScript and React.
                        React provided enhanced abilities than those offered by vanilla JavaScript and HTML that often took
                        the form of grids and formatting. Bootstrap was also utilized in order to provide nicer elements
                        such as buttons. Compilation of the JavaScript files was conducted through NodeJS.

                        During development, our team attempted to implement styling functionality from MaterialUI when
                        trying to create grids and AG Grid when trying to implement tables. Ultimately, our team decided
                        against the use of these resources in order to have coherency with web pages created by other team
                        members using the tools provided by React.

                        In order to implement API calls to GitHub, we utilized AJAX such that data concerning the repository
                        use could be dynamically displayed on the about page. To collect and store data from the various
                        APIs that we will utilize for the project, we utilize Python scripts and MongoDB respectively. React
                        Router was later implemented to link web pages and provide a flow among each site.

                        Development by each member of the team was conducted in WebStorm by JetBrains. The app was
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
