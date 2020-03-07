import React from 'react'
import "../Background.css"
import Background from "../Background"
import tristan from "./tristan.jpeg"
import jaime from "./jaime.jpg"
import jimmy from "./jimmy.jpg"
import mihir from "./mihir.jpg"

import "./AboutUs_Background.css"
import "./About_App.css"

fetch('https://api.github.com/orgs/nodejs')
    .then(response => response.json())
    .then(data => {
        console.log(data) // Prints result from `response.json()` in getRequest
    })
    .catch(error => console.error(error))

const tableaboutus = {
    marginLeft: "200px",
    marginTop: "70px",
    marginRight: "100px",
}

function GetGitInfo() {
    var xhr = new XMLHttpRequest();
    let info;
    let contributions = [0, 0, 0, 0]

    // open method parameters: type of request, url/file, bool async
    xhr.open('GET', 'https://api.github.com/repos/tmcdaniel511/EE461L-Team-Project/contributors', false);
    xhr.setRequestHeader('Authorization', 'token 564ef390402388a2d945ee4f05b4321fef34a616')

    xhr.onload = function(e){
        if (xhr.readyState === 4){
            if (xhr.status === 200){
                info = JSON.parse(xhr.response)
                console.log(info);
            } else {
                console.error(xhr.statusText)
            }
        }
    }

    xhr.send()

    let totalCommits = 0;
    for(let i = 0; i < info.length; i++){
        contributions[i] = info[i].contributions;
        totalCommits += contributions[i];
    }

    var xhr2 = new XMLHttpRequest();
    let info2;

    // open method parameters: type of request, url/file, bool async
    xhr2.open('GET', 'https://api.github.com/repos/tmcdaniel511/EE461L-Team-Project/issues', false);
    xhr2.setRequestHeader('Authorization', 'token 564ef390402388a2d945ee4f05b4321fef34a616')

    xhr2.onload = function(e){
        if (xhr2.readyState === 4){
            if (xhr2.status === 200){
                info2 = JSON.parse(xhr2.response)
                console.log(info2);
            } else {
                console.error(xhr2.statusText)
            }
        }
    }

    xhr2.send()

    let numOpenIssues = info2.length;

    var xhr3 = new XMLHttpRequest();
    let info3;

    // open method parameters: type of request, url/file, bool async
    xhr3.open('GET', 'https://api.github.com/repos/tmcdaniel511/EE461L-Team-Project/issues?state=closed', false);
    xhr3.setRequestHeader('Authorization', 'token 564ef390402388a2d945ee4f05b4321fef34a616')

    xhr3.onload = function(e){
        if (xhr3.readyState === 4){
            if (xhr3.status === 200){
                info3 = JSON.parse(xhr3.response)
                console.log(info3);
            } else {
                console.error(xhr3.statusText)
            }
        }
    }

    xhr3.send()

    let numClosedIssues = 0;
    for(let i = 0; i < info3.length; i++){
        let str = info3[i].title
        console.log(str)
        if(str.includes("Issue")){
            numClosedIssues++;
        }
    }

    return (
        <div>
            Number of commits: <br></br>
            Tristan: {contributions[0]} <br></br>
            Jaime: {contributions[1]} <br></br>
            Jimmy: {contributions[2]} <br></br>
            Mihir: {contributions[3]} <br></br>
            Total commits: {totalCommits} <br></br>
            Number of Closed Issues: {numClosedIssues} <br></br>
            Number of Open Issues: {numOpenIssues} <br></br>
            Total number of Issues: {numClosedIssues + numOpenIssues} <br></br>
            Number of tests: 0 <br></br>
        </div>
    );
}

function Developer_Card(props) {
    return (
        <div class="cards">
            <img class = "card-img-top" id = "dev-card-img" src = {props.image} alt = {props.name}/>
            <div class="card-body">
                <h4 class = "dev-card-title"> {props.name}</h4>
                <p class = "card-text">Track: {props.track}</p>
            </div>
        </div>
    )
}

function AboutUs_App() {
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
                            image = {jaime}
                            name = "Jaime Tan Leon"
                            track = "Software and Academic Enrichment"
                        />
                    </div>

                    <div className="col-lg-3 grid-margin" id="card-col">
                        <Developer_Card
                            image = {tristan}
                            name = "Tristan McDaniel"
                            track = "Embedded Systems/Computer Architecture and Software"
                        />
                    </div>

                    <div className="col-lg-3 grid-margin" id="card-col">
                        <Developer_Card
                            image = {jimmy}
                            name = "Jimmy Phan"
                            track = "Data Science and Academic Enrichment"
                        />
                    </div>

                    <div className="col-lg-3 grid-margin" id="card-col">
                        <Developer_Card
                            image = {mihir}
                            name = "Mihir Shah"
                            track = "Embedded Systems/Computer Architecture and Integrated Circuits"
                        />
                    </div>
                </div>

                <br></br>

                <h4>Development Statistics</h4>
                <GetGitInfo/>
                {/*<button id = "gitButton" onClick={getGitInfo()}>Get Git Data</button>*/}
            </div>
        </div>
    )
}

export default AboutUs_App
