import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Homepage from "./components/home-page/Homepage"
import Pokemon from './components/pokedex-page/Pokemon';
import PokemonInfo from "./components/pokedex-page/PokemonInfo";
import AddPokemon_Pokedex from "./components/pokedex-page/AddPokemon";
import AddPokemon_TeamBuilder from "./components/team-builder-page/AddPokemon";
import PokemonLocation from "./components/pokedex-page/PokemonLocation";
import Abilities from './components/abilities-page/Abilities';
import AbilitiesInfo from "./components/abilities-page/AbilitiesInfo"
import Moves from './components/moves-page/Moves';
import MovesInfo from "./components/moves-page/MovesInfo"
import Items from "./components/items-page/Items"
import ItemsInfo from "./components/items-page/ItemsInfo"
import Types from "./components/types-page/Types"
import TypeDisplay from "./components/types-page/TypesDisplay"
import TeamBuilder from "./components/team-builder-page/Team_Builder_App"
import AboutUs from "./components/about-us-page/AboutUs_App"
import Thankyou from "./components/feedback-page/Thankyou";
import Feedback from "./components/feedback-page/Feedback"
import Error from './components/Error';
import Header from './components/Header';
import Background from "./components/Background"


class App extends Component {
    render() {
        return (
            <BrowserRouter >
                <Header/>
                <div>
                    <Switch>
                        <Route exact path="/" component={Homepage}/>
                        <Route exact path="/abilities" component={Abilities}/>
                        <Route exact path='/abilities/:ability' component={AbilitiesInfo}/>
                        <Route exact path="/moves" component={Moves}/>
                        <Route exact path="/moves/:move" component={MovesInfo}/>
                        <Route exact path="/items" component={Items}/>
                        <Route exact path="/items/:item" component={ItemsInfo}/>
                        <Route exact path="/pokemon" component={Pokemon}/>
                        <Route exact path="/pokemon/:pokemons" component={PokemonInfo}/>
                        <Route exact path="/pokemon/:pokemons/location" component={PokemonLocation}/>
                        <Route exact path="/types" component={Types}/>
                        <Route exact path="/types/:type" component={TypeDisplay}/>
                        <Route exact path="/feedback" component={Feedback}/>
                        <Route exact path="/feedback/thankyou" component={Thankyou}/>
                        <Route exact path = "/teambuilder" component = {TeamBuilder}/>
                        <Route exact path = "/teambuilder/addpokemon" component = {AddPokemon_TeamBuilder}/>
                        <Route exact path = "/aboutus" component = {AboutUs}/>
                        <Route component={Error}/>
                    </Switch>
                    <Background/>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;