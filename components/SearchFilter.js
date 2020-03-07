import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import React from "react";

const SearchFitler = (props) => {
    return (
        <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2 mr-5"/>
            <Button variant="outline-success">Search</Button>
            <FormControl type="text" placeholder="Filter" className="mr-sm-2 ml-5"/>
            <Button variant="outline-success">Filter</Button>
        </Form>
    )
}

export default SearchFitler