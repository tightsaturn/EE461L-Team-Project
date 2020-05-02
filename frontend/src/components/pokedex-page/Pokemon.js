import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import "../../App.css"
import "../../css/page.css"
import PokemonBox from "./PokemonBox";
import PokemonSearchFilter from "./PokemonSearchFilter";
import { fetchToState, filter, sort } from "./PokemonFxns"
import DataFetcher from "../DataFetcher";
import { search, reset } from "../componentFunctions";

const Pokemon = () => {
    return (
        <DataFetcher
            url={"https://pokebackend-461l.appspot.com/pokemoncards/"}
            numInstances={807}
            pageSize={40}

            render={(data) => (
                <div className="container-fluid" id="mainContent">
                    <h1 style={{fontWeight: "bold", fontSize: "2.8em"}}>Pokemon</h1>
                    <br/>
                    <br/>
                    <PokemonSearchFilter
                        onSearch={search}
                        onSort={sort}
                        onFilter={filter}
                        onReset={reset}
                        this={data.this}
                    />
                    <h4 style={{marginTop: "10px"}}>{data.filterMessage}</h4>
                    <div className="row mt-5">
                        {data.instances}
                    </div>
                    <div className="navbar" style={{ marginTop: "10px", marginBottom: "30px"}}>
                        {data.buttons}
                    </div>
                </div>
            )}

            instanceBox={(data) => (
                <PokemonBox
                    imgURL={data.imgURL}
                    id={data.id}
                    name={data.name}
                />
            )}

            fetchToState={fetchToState}
        />
    )
}

export default Pokemon;