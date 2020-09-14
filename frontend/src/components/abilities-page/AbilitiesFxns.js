/* Holds all function for searching, filter, and sorting pokemon*/
import {capitalize} from "../componentFunctions";
import {capitalizeG} from "../componentFunctions";


export const filter = (include, gen, context) => {
    const that = context
    // check if all pokemon are finished loading (alert if not)
    if(that.state.numLoaded < that.state.numInstances) {
        alert("Wait for all the abilities to finish loading first!" + that.state.numLoaded)
        return
    }

    // check if all the fields are empty
    if(include === "" && gen === "") {
        that.setState({
            isFiltered: false
        })
        return
    }

    console.log("include " + include + " gen " + gen)

    // keep a subarray for each filter option and combine at the end
    // a true entry means pokemon i fits the filter criteria (e.g. name or type1)
    let filterArray = [[], []]
    for(let i = 0; i < that.state.instances.length; i++) {
        for(let j = 0; j < that.state.pageSize; j++) {
            // get pokemon and find out if it matches filter criteria
            let abilityJSON = {...that.state.instances[i][j]}
            if (abilityJSON.name === undefined) break

            // check if substring include is in pokemon name
            if (include !== "") {
                if ((abilityJSON.name.toLowerCase()).indexOf(include.toLowerCase()) !== -1) {
                    filterArray[0].push(true)
                } else filterArray[0].push(false)
            } else filterArray[0].push(true)

            if(gen !== "") {
                if((abilityJSON.generation.substring(11) === gen)){
                    filterArray[1].push(true)
                } else filterArray[1].push(false)
            } else filterArray[1].push(true)
        }
    }

    // only add pokemon to filtered list if all of the filter criteria are met
    let filteredAbilities = []
    for(let i = 0; i < that.state.numInstances; i++) {
        if(filterArray[0][i] &&
            filterArray[1][i]) {
            filteredAbilities.push(i)
        }
    }

    that.setState({
        filteredInstances: filteredAbilities,
        isFiltered: true,
        isSorted: false,
        numFiltered: filteredAbilities.length,
    })
}

export const sort = (sortBy, that) => {
    console.log(sortBy)
    if(that.state.numLoaded < that.state.numInstances) {
        alert("Wait for all the pokemon to finish loading first!")
        return
    }

    if(sortBy === "None") {
        that.setState({
            isSorted: false
        })
        return
    }

    switch(sortBy) {
        case("ascAZ"):
            let sortedArr = []
            let sorted = []
            for(let i = 0; i < 50; i++) {
                sorted.push([])
            }

            for(let k = 0; k < that.state.numInstances; k++) {
                let i = Math.floor(k /that.state.pageSize);
                let j = k%that.state.pageSize;
                sortedArr[k] = that.state.instances[i][j]
            }

            sortedArr.sort((a, b) => {
                return a.name > b.name ? 1 : -1
            })

            for(let k = 0; k < sortedArr.length; k++) {
                let i = Math.floor(k /that.state.pageSize);
                let j = k%that.state.pageSize;
                sorted[i][j] = sortedArr[k]
            }

            that.setState({
                sortedInstances: sorted,
                isFiltered: false,
                isSorted: true
            })
            break
        case("descZA"):
            let sortedAr = []
            let sort = []
            for(let i = 0; i < 50; i++) {
                sort.push([])
            }

            for(let k = 0; k < that.state.numInstances; k++) {
                let i = Math.floor(k /that.state.pageSize);
                let j = k%that.state.pageSize;
                sortedAr[k] = that.state.instances[i][j]
            }

            sortedAr.sort((a, b) => {
                return a.name < b.name ? 1 : -1
            })

            for(let k = 0; k < sortedAr.length; k++) {
                let i = Math.floor(k /that.state.pageSize);
                let j = k%that.state.pageSize;
                sort[i][j] = sortedAr[k]
            }

            that.setState({
                sortedInstances: sort,
                isFiltered: false,
                isSorted: true
            })
            break
        default:
            console.log("error: should not be here")
            console.log("sorted by is: " + sortBy)
    }
}

export const fetchToState = (data, id, that) => {
    // get page number and update state
    let pageNum = Math.floor((id-1)/that.props.pageSize);
    let index = (id-1)%that.props.pageSize;

    // add a button for every new page
    if(index === 0) that.setState(prevState => {
        let buttonArray = [...prevState.buttons]
        buttonArray[pageNum] = {
            type: "button",
            id: pageNum,
        }

        return { buttons: buttonArray }
    })

    console.log(data)

    that.setState(prevState => {
        let instanceArray = [...prevState.instances]
        instanceArray[pageNum][index] = {
            generation: capitalizeG(data.generation.name),
            description: data.effect_entries[0].short_effect,
            name: capitalize(data.name),
            id: data.id,
        }

        return {
            instances: instanceArray,
            numLoaded: prevState.numLoaded + 1,
            numDisplayed: prevState.numDisplayed + 1
        }
    })
}