/* Wrapper component for all the models */
import React, {Component, Fragment} from "react"

class DataFetcher extends Component {
    constructor(props) {
        super();

        // initialize 2d array for pagination
        let instanceArray = []
        for (let i = 0; i < 50; i++) {
            instanceArray.push([]);
        }

        this.state = {
            instances: instanceArray,   // holds all the instances (doesn't change)
            filteredInstances: [],
            sortedInstances: [],
            numDisplayed: 0,
            numInstances: props.numInstances,
            buttons: [],
            currentPage: 0,
            pageSize: props.pageSize,
            numLoaded: 0,   // counts how many instances loaded to see when fetching finishes
            isFiltered: false,
            numFiltered: 0,
            isSorted: false
        }
    }

    componentDidMount() {
        // fetch each instance and add to state
        for(let id = 1; id <= this.state.numInstances; id++){
            let url = this.props.url + id;
            fetch(url)
                .then((response) => { if(response.ok){ return response.json(); } })
                .then(data => { this.props.fetchToState(data, id, this) })
                .catch((err) =>{ console.log(err) });
        }
    }

    // redirects user to page when button clicked
    handlePageClick = (event) => {
        const {id} = event.target
        this.setState({currentPage: id})
    }

    getInstances = () => {
        if (this.state.isFiltered) {
            return this.state.filteredInstances.map(item => {
                    let pageNum = Math.floor((item) / this.props.pageSize);
                    let index = (item) % this.props.pageSize;

                    let instance = this.state.instances[pageNum][index]
                    return this.props.instanceBox(instance)
            })
        } else if (this.state.isSorted) {
            console.log("sorting")
            return this.state.sortedInstances[this.state.currentPage].map(item => {
                return this.props.instanceBox(item)
            })
        } else {
            return this.state.instances[this.state.currentPage].map(item => {
                return this.props.instanceBox(item)
            })
        }
    }

    getButtons = () => (
        this.state.isFiltered ? null:
            this.state.buttons.map((item, index) => {
            let className = (this.state.currentPage == index) ? "btn btn-success" : "btn btn-light"
            if (item == undefined) return null
            return (<button
                type="button"
                id={item.id}
                className={className}
                onClick={this.handlePageClick}> {item.id + 1}
            </button>)
        })
    )

    render() {
        let instances = this.getInstances()
        let buttons = this.getButtons()
        let filterMessage = this.state.isFiltered ? (this.state.filteredInstances.length + " results found") : null

        return (
            /* pass in context for filter fxns to modify DataFetcher */
            <Fragment>
                {this.props.render({
                    instances: instances,
                    buttons: buttons,
                    filterMessage: filterMessage,
                    this: this
                })}
            </Fragment>
        )
    }
}

export default DataFetcher