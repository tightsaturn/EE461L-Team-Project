import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Pokemon from './components/Pokemon';
import AboutUS from './components/AboutUS';
import Error from './components/Error';
import Abilities from './components/Abilities';
import Moves from './components/Moves';
import PokemonInfo from "./components/PokemonInfo";
import PokemonLocation from "./components/PokemonLocation";
import Background from "./components/Background"
import Homepage from "./components/Homepage"
import AbilitiesInfo from "./components/AbilitiesInfo"
import MovesInfo from "./components/MovesInfo"
import Items from "./components/Items"
import ItemsInfo from "./components/ItemsInfo"
import TeamBuilder from "./components/team-builder-page/Team_Builder_App"


class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Header/>
                <div>
                    <Switch>
                        <Route exact path="/" component={Homepage}/>

                        <Route exact path="/aboutus" component={AboutUS}/>
                        <Route exact path="/abilities" component={Abilities}/>
                        <Route exact path='/abilities/info' component={AbilitiesInfo}/>
                        <Route exact path="/moves" component={Moves}/>
                        <Route exact path="/moves/info" component={MovesInfo}/>
                        <Route exact path="/items" component={Items}/>
                        <Route exact path="/items/info" component={ItemsInfo}/>
                        <Route exact path="/pokemon" component={Pokemon}/>
                        <Route exact path="/pokemon/info" component={PokemonInfo}/>
                        <Route exact path="/pokemon/location" component={PokemonLocation}/>
                        <Route exact path = "/teambuilder" component = {TeamBuilder}/>
                        <Route component={Error}/>
                    </Switch>
                </div>
                <Background/>
            </BrowserRouter>
        );
    }
}

export default App;