import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom"
import React from "react";

const whitespacable = {
    whiteSpace: "pre"
}

class MovesSearchFilter extends React.Component {
    constructor() {
        super()
        this.state = ({
            name: "",
            include: "",
            type: "None",
        })

        this.filter = this.filter.bind(this)
        this.reset = this.reset.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    filter() {
        this.props.onFilter(this.state.name,
            this.state.include,
            this.state.type
            )
    }

    reset() {
        this.props.onReset()
    }

    handleChange(event) {
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }

    render() {
        return (
            <Form inline>
                <label className="mr-sm-2" htmlFor="name">Name</label>
                <FormControl type="text" name="name" onChange={this.handleChange} placeholder="Search" className="mr-sm-2 mr-5"/>
                <label className="mr-sm-2" htmlFor="inlineFormCustomSelect" style={whitespacable}>   Includes</label>
                <FormControl type="text" name="include" onChange={this.handleChange} placeholder="Search" className="mr-sm-2 mr-5"/>
                <label className="mr-sm-2" htmlFor="type" style={whitespacable}>   Type</label>
                <select className="custom-select mr-sm-2" onChange={this.handleChange} name="type">
                    <option selected>None</option>
                    <option value="Bug">Bug</option>
                    <option value="Dark">Dark</option>
                    <option value="Dragon">Dragon</option>
                    <option value="Electric">Electric</option>
                    <option value="Fairy">Fairy</option>
                    <option value="Fighting">Fighting</option>
                    <option value="Fire">Fire</option>
                    <option value="Flying">Flying</option>
                    <option value="Ghost">Ghost</option>
                    <option value="Grass">Grass</option>
                    <option value="Ground">Ground</option>
                    <option value="Ice">Ice</option>
                    <option value="Normal">Normal</option>
                    <option value="Poison">Poison</option>
                    <option value="Psychic">Psychic</option>
                    <option value="Rock">Rock</option>
                    <option value="Steel">Steel</option>
                    <option value="Water">Water</option>
                </select>

                <Button variant="outline-danger" onClick={this.reset} style={{marginLeft: "15px", marginRight: "10px"}}>Reset</Button>
                <Button variant="outline-success" onClick={this.filter}>Filter</Button>
            </Form>
        )
    }
}

export default MovesSearchFilter