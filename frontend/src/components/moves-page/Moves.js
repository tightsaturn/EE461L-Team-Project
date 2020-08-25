import React from 'react';
import "../../css/page.css"
import MovesSearchFilter from "./MovesSearchFilter";
import MovesBox from "./MovesBox";
import { fetchToState, filter, sort } from "./MovesFxns"
import DataFetcher from "../DataFetcher";
import {search} from "../componentFunctions";
import {reset} from "../componentFunctions";

const Moves = () => {
    return (
        <DataFetcher
            url={"https://togeapi.uc.r.appspot.com/movecards/"}
            numInstances={728}
            pageSize={48}

            render={(data) => (
                <div className="container-fluid" id="mainContent">
                    <h1 style={{fontWeight: "bold", fontSize: "2.8em"}}>Moves</h1>
                    <br/>
                    <br/>
                    <MovesSearchFilter
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
                <MovesBox
                    type={data.type}
                    id={data.id}
                    name={data.name}
                    effect={data.effect}
                />
            )}

            fetchToState={fetchToState}
        />
    )
}

export default Moves;