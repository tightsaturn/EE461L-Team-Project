import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Homepage from "./components/home-page/Homepage"
import Pokemon from './components/pokedex-page/Pokemon';
import PokemonInfo from "./components/pokedex-page/PokemonInfo";
import Abilities from './components/abilities-page/Abilities';
import AbilitiesInfo from "./components/abilities-page/AbilitiesInfo"
import Moves from './components/moves-page/Moves';
import MovesInfo from "./components/moves-page/MovesInfo"
import Items from "./components/items-page/Items"
import ItemsInfo from "./components/items-page/ItemsInfo"
import Types from "./components/types-page/Types"
import TypeDisplay from "./components/types-page/TypesDisplay"

import DataFetcher from "./components/DataFetcher"

// Team Builder Page Links
import TeamPageMain from "./components/team-builder-page/Pokemon_Team"
import AddPokemon from "./components/team-builder-page/AddPokemon"

// About Us Page Links
import AboutUs from "./components/about-us-page/AboutUs_App"
import Thankyou from "./components/feedback-page/Thankyou";
import Feedback from "./components/feedback-page/Feedback"
import Error from './components/splash-page/Error';
import Header from './components/splash-page/Header';
import Background from "./components/splash-page/Background"
import {Home} from "@material-ui/icons";


class App extends Component {
    render() {
        return (
            <BrowserRouter >
                <Header/>
                <Switch>
                    <Route exact path="/" component={Homepage}/>
                    <Route exact path="/abilities" component={Abilities}/>
                    <Route exact path='/abilities/:ability' component={AbilitiesInfo}/>
                    <Route exact path="/moves" component={Moves}/>
                    <Route exact path="/moves/:move" component={MovesInfo}/>
                    <Route exact path="/items" component={Items}/>
                    <Route exact path="/items/:item" component={ItemsInfo}/>
                    <Route exact path="/pokemon" component={Pokemon}/>
                    <Route exact path="/pokemon/:id" component={PokemonInfo}/>
                    <Route exact path="/types" component={Types}/>
                    <Route exact path="/types/:type" component={TypeDisplay}/>
                    <Route exact path="/feedback" component={Feedback}/>
                    <Route exact path="/feedback/thankyou" component={Thankyou}/>

                    {/* Team Builder Page Paths */}
                    <Route exact path = "/teambuilder" component = {TeamPageMain}/>
                    <Route exact path = "/teambuilder/createTeam" component = {TeamPageMain}/>
                    <Route exact path = "/teambuilder/addpokemon/:memberNum" component = {AddPokemon}/>
                    <Route exact path = "/teambuilder/change/:memberNum/:pokemonId" component = {TeamPageMain}/>
                    <Route exact path = "/teambuilder/resetTeam" component = {TeamPageMain}/>

                    {/* About Us Page Paths */}
                    <Route exact path = "/aboutus" component = {AboutUs}/>

                    <Route component={Error}/>
                </Switch>
                <Background/>
            </BrowserRouter>
        );
    }
}

export default App;