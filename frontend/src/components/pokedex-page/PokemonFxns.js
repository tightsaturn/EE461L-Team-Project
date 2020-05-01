/* Holds all function for searching, filter, and sorting pokemon*/
import {capitalize} from "../componentFunctions";

export const filter = (include, type1, type2, context) => {
    const that = context
    // check if all pokemon are finished loading (alert if not)
    console.log(include, type1, type2, context)
    if(that.state.numLoaded < that.state.numInstances) {
        alert("Wait for all the pokemon to finish loading first!")
        return
    }

    // check if all the fields are empty
    if(include === "" && type1 === "None" && type2 === "None") {
        that.setState({
            isFiltered: false,
        })
        return
    }

    // keep a subarray for each filter option and combine at the end
    // a true entry means pokemon i fits the filter criteria (e.g. name or type1)
    let filterArray = [[], [], []]
    for(let i = 0; i < that.state.instances.length; i++) {
        for(let j = 0; j < that.state.pageSize; j++) {
            // get pokemon and find out if it matches filter criteria
            // console.log(that.state.instances[i][j])
            let pokeJSON = {...that.state.instances[i][j]}
            if(pokeJSON.name === undefined) break
            console.log(pokeJSON)

            // check if substring include is in pokemon name
            if(include !== "") {
                if((pokeJSON.name.toLowerCase()).indexOf(include.toLowerCase()) !== -1) {
                    filterArray[0].push(true)
                } else filterArray[0].push(false)
            }
            else filterArray[0].push(true)

            if(pokeJSON.types.length === 2) {
                if(type1 !== "None") {
                    if(pokeJSON.types[0].type.name === type1.toLowerCase() || pokeJSON.types[1].type.name === type1.toLowerCase()) {
                        filterArray[1].push(true)
                    } else filterArray[1].push(false)
                }
                else filterArray[1].push(true)

                if(type2 !== "None") {
                    if(pokeJSON.types[0].type.name === type2.toLowerCase() || pokeJSON.types[1].type.name === type2.toLowerCase()) {
                        filterArray[2].push(true)
                    } else filterArray[2].push(false)
                }
                else filterArray[2].push(true)
            } else {
                if(type1 !== "None" && type2 !== "None") {
                    // if filter specifies 2 types but pokemon only has one (the pokemon does not get added)
                    filterArray[1].push(false)
                    filterArray[2].push(false)
                } else {
                    if(type1 !== "None") {
                        if(pokeJSON.types[0].type.name === type1.toLowerCase()) {
                            filterArray[1].push(true)
                        } else filterArray[1].push(false)
                    }
                    else filterArray[1].push(true)

                    if(type2 !== "None") {
                        if(pokeJSON.types[0].type.name === type2.toLowerCase()) {
                            filterArray[2].push(true)
                        } else filterArray[2].push(false)
                    }
                    else filterArray[2].push(true)
                }
            }
        }
    }

    // only add pokemon to filtered list if all of the filter criteria are met
    let filteredPokemon = []
    for(let i = 0; i < that.state.numInstances; i++) {
        if(filterArray[0][i] &&
            filterArray[1][i] &&
            filterArray[2][i]) {
            filteredPokemon.push(i)
        }
    }

    that.setState({
        filteredInstances: filteredPokemon,
        isFiltered: true,
        isSorted: false,
        numFiltered: filteredPokemon.length,
    })
}

export const sort = (sortBy, that) => {
    if(that.state.numLoaded < that.state.numInstances) {
        alert("Wait for all the pokemon to finish loading first!")
        return
    }

    switch(sortBy) {
        case("ascID"):
            that.setState({
                isFiltered: false,
                isSorted: false
            })
            break
        case("descID"):
            // reverse pokemon array (gets last pokemon and places it to front of sorted array)
            let sortedArray = []
            for(let i = 0; i < 50; i++) {
                sortedArray.push([])
            }

            for(let k = 0; k < that.state.numInstances; k++) {
                let i = Math.floor(k /that.state.pageSize);
                let j = k%that.state.pageSize;
                let descI = Math.floor((that.state.numInstances-k-1)/that.state.pageSize);
                let descJ = (that.state.numInstances-k-1)%that.state.pageSize;
                sortedArray[i][j] = that.state.instances[descI][descJ]
            }

            that.setState({
                sortedInstances: sortedArray,
                isFiltered: false,
                isSorted: true
            })
            break
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

    that.setState(prevState => {
        let instanceArray = [...prevState.instances]
        instanceArray[pageNum][index] = {
            imgURL: data.frontSprite,
            id: id,
            name: capitalize(data.name),
            types: data.types
        }

        return {
            instances: instanceArray,
            numLoaded: prevState.numLoaded + 1,
            numDisplayed: prevState.numDisplayed + 1
        }
    })
}