import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom"
import React from "react";

const whitespacable = {
    whiteSpace: "pre"
}

class AbilitiesSearchFilter extends React.Component {
    constructor() {
        super()
        this.state = ({
            name: "",
            include: "",
            type: "None",
            sortBy: "None"
        })

        this.search = this.search.bind(this)
        this.filter = this.filter.bind(this)
        this.sort = this.sort.bind(this)
        this.reset = this.reset.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    filter() {
        this.props.onFilter(
            this.state.include,
            this.state.type
        )
    }

    search() {
        this.props.onSearch(this.state.name)
    }

    sort() {
        this.props.onSort(this.state.sortBy)
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
                <div className="row col-12 filterRow">
                    <FormControl type="text" name="name" onChange={this.handleChange} placeholder="Name" className="mr-sm-2 mr-5"/>
                    <Button variant="outline-success" onClick={this.search}>Search</Button>
                    <label className="mr-sm-2" htmlFor="sortBy" style={whitespacable}>    Sort By</label>
                    <select className="custom-select mr-sm-2" onChange={this.handleChange} name="sortBy">
                        <option selected>None</option>
                        <option value="ascAZ">Ascending (a-z)</option>
                        <option value="descZA">Descending (z-a)</option>
                    </select>
                    <Button variant="outline-success" onClick={this.sort}>Sort</Button>
                </div>
                <div className="row col-12 filterRow">
                    <label className="mr-sm-2" htmlFor="inlineFormCustomSelect">Includes</label>
                    <FormControl type="text" name="include" onChange={this.handleChange} placeholder="Search" className="mr-sm-2 mr-5"/>
                    <label className="mr-sm-2" htmlFor="type1" style={whitespacable}>  Generation</label>
                    <select className="custom-select mr-sm-2" onChange={this.handleChange} name="gen">
                        <option selected>None</option>
                        <option value="Bug">III</option>
                        <option value="Dark">VI</option>
                        <option value="Dragon">V</option>
                        <option value="Electric">VI</option>
                        <option value="Fairy">VII</option>
                    </select>
                    <Button variant="outline-danger" onClick={this.reset} style={{marginLeft: "15px", marginRight: "10px"}}>Reset</Button>
                    <Button variant="outline-success" onClick={this.filter}>Filter</Button>
                </div>
            </Form>
        )
    }
}

export default AbilitiesSearchFilter