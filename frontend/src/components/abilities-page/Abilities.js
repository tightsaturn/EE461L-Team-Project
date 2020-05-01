import React from 'react';
import "../../css/page.css"
import AbilitiesSearchFilter from "./AbilitiesSearchFilter";
import AbilitiesBox from "./AbilitiesBox";
import { fetchToState, filter, sort } from "./AbilitiesFxns"
import DataFetcher from "../DataFetcher";
import {search} from "../componentFunctions";
import {reset} from "../componentFunctions";

const Abilities = () => {
    return (
        <DataFetcher
            url={"https://pokebackend-461l.appspot.com/abilitycards/"}
            numInstances={232}
            pageSize={48}

            render={(data) => (
                <div className="container-fluid" id="mainContent">
                    <h1 style={{fontWeight: "bold", fontSize: "2.8em"}}>Abilities</h1>
                    <br/>
                    <br/>
                    <AbilitiesSearchFilter
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
                <AbilitiesBox
                    generation={data.generation}
                    id={data.id}
                    name={data.name}
                />
            )}

            fetchToState={fetchToState}
        />
    )
}

export default Abilities;