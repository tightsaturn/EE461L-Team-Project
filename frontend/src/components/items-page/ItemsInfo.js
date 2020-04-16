import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import "../../App.css"
import "../../css/page.css"

class ItemsInfo extends React.Component {
    constructor(){
        super();
        this.state = {
            name: "",
            attributesArray: [],
            effect: "",
            category:"",
            sprite: "",
            cost: "",
        }

        this.capitalize = this.capitalize.bind(this)
    }

    componentDidMount() {
        let id = this.props.match.params.item
        let url = 'https://pokebackend-461l.appspot.com/items/' + id;

        fetch(url)
            .then((response) => {
                return response.json();
            })
            .then(data => {
                console.log(data)
                this.setState({
                    name: data.name,
                    attributesArray: data.attributes,
                    effect: data.effect[0].effect,
                    category: data.category[0].name,
                    sprite: data.sprite,
                    cost: data.cost,
                })

            })
            .catch((err) =>{
                console.log(err)
            });
    }

    capitalize(name) {
        name = String(name)
        let firstLetter = name.charAt(0).toUpperCase()
        return (firstLetter + name.substring(1))
    }

    render() {
        let id = this.props.match.params.item

        return (
            <div className="container-fluid" id="infoContent">
                <div className="row">
                    <div className="col-4">
                        <div className="card">
                            <div className="card-body">
                                <h1 className="card-text">{this.capitalize(this.state.name)} <br/>
                                </h1>
                            </div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item"></li>
                                <li className="list-group-item">Category: {this.state.category.charAt(0).toUpperCase() + this.state.category.substring(1)}</li>
                                <li className="list-group-item">Cost: {this.state.cost}</li>
                                <li className="list-group-item">Effect: {this.state.effect}</li>
                            </ul>
                        </div>
                    </div>

                    <div className="col-8">
                        <table className="table">
                            <thead className="thead-light">
                            <tr>
                                <th scope="col">Attributes</th>
                            </tr>
                            {this.state.attributesArray.map(attributes => (
                                <li key={attributes}>{(attributes.name[0].toUpperCase() + attributes.name.slice(1))}</li>
                            ))}
                            </thead>
                            <tbody>

                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        );
    }
}

export default ItemsInfo;