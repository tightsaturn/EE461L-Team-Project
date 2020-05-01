import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import "../../css/page.css"
import React from "react";

const whitespacable = {
    whiteSpace: "pre"
}

class PokemonSearchFilter extends React.Component {
    constructor() {
        super()
        this.state = ({
            name: "",
            include: "",
            type1: "None",
            type2: "None",
            sortBy: "Ascending id"
        })
    }

    filter = () => {
        this.props.onFilter(
            this.state.include,
            this.state.type1,
            this.state.type2,
            this.props.this
        )
    }

    search = () => {
        this.props.onSearch(this.state.name, this.props.this)
    }

    sort = () => {
        this.props.onSort(this.state.sortBy, this.props.this)
    }

    reset = () => {
        this.props.onReset(this.props.this)
    }

    handleChange = (event) => {
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }

    render() {
        return (
            <Form inline>
                <div className="row col-12 filterRow">
                    <FormControl type="text" name="name" onChange={this.handleChange} placeholder="Name" className="mr-sm-2 mr-5"/>
                    <Button variant="outline-success" onClick={this.search}>Search</Button>
                    <label className="mr-sm-2" htmlFor="sortBy" style={whitespacable}>    Sort By</label>
                    <select className="custom-select mr-sm-2" onChange={this.handleChange} name="sortBy">
                        <option value="ascID">Ascending id</option>
                        <option value="descID">Descending id</option>
                        <option value="ascAZ">Ascending (a-z)</option>
                        <option value="descZA">Descending (z-a)</option>
                    </select>
                    <Button variant="outline-success" onClick={this.sort}>Sort</Button>
                </div>
                <div className="row col-12 filterRow">
                    <label className="mr-sm-2" htmlFor="inlineFormCustomSelect">Includes</label>
                    <FormControl type="text" name="include" onChange={this.handleChange} placeholder="Search" className="mr-sm-2 mr-5"/>
                    <label className="mr-sm-2" htmlFor="type1" style={whitespacable}>  Type 1</label>
                    <select className="custom-select mr-sm-2" onChange={this.handleChange} name="type1">
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
                    <label className="mr-sm-2" htmlFor="type2" style={whitespacable}> Type 2</label>
                    <select className="custom-select mr-sm-2" onChange={this.handleChange} name="type2">
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
                </div>
            </Form>
        )
    }
}

export default PokemonSearchFilter