import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Pokemon from './components/Pokemon';
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
import Types from "./components/Types"
import TypeDisplay from "./components/TypesDisplay"
import Feedback from "./components/Feedback"
import Thankyou from "./components/Thankyou";
import AddPokemon from "./components/AddPokemon"
import AboutUs from "./components/about-us-page/AboutUs_App"

class App extends Component {
    render() {
        return (
            <BrowserRouter>
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
                        <Route exact path = "/teambuilder/addpokemon" component = {AddPokemon}/>
                        <Route exact path = "/aboutus" component = {AboutUs}/>
                        <Route component={Error}/>
                    </Switch>
                </div>
                <Background/>
            </BrowserRouter>
        );
    }
}

export default App;