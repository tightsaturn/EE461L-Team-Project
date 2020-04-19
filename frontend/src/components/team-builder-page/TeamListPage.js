import React from 'react';
import "../../css/page.css"
import { Card } from 'react-bootstrap';

class TeamList extends React.Component {
    constructor(props) {
        super(props);
    }
    
    componentDidMount() {

    }

    render() {
        return (
            <div className="container-fluid" style={{textAlign: "justify"}}>
                <div className = "container-fluid" id = "titleContent">
                    <h1>Team Builder</h1>
                    <h4>List of Your Teams</h4>
                </div>

                <div className = "container-fluid" id = "mainContentv2">
                    <Card>
                        <Card.Title>Name of Team</Card.Title>

                        <Card.Img variant = "middle" src = "https://www.tattoofun.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/s/q/squirtle_sm.jpg" />

                        <Card.Body>
                            <Card.Text>Name of Pokemon</Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        )
    }
}

export default TeamList