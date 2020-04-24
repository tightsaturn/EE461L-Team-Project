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
        })

        this.filter = this.filter.bind(this)
        this.reset = this.reset.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    filter() {
        this.props.onFilter(this.state.name, this.state.include)
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
                <Button variant="outline-danger" onClick={this.reset} style={{marginLeft: "15px", marginRight: "10px"}}>Reset</Button>
                <Button variant="outline-success" onClick={this.filter}>Filter</Button>
            </Form>
        )
    }
}

export default AbilitiesSearchFilter