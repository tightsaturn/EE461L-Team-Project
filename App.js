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


class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Header />
                <div>
                    <Switch>
                        <Route exact path="/" component={Homepage}/>
                        <Route exact path="/abilities" component={Abilities}/>
                        <Route exact path="/aboutus" component={AboutUS}/>
                        <Route exact path="/moves" component={Moves}/>
                        <Route exact path="/pokemon/info" component={PokemonInfo}/>
                        <Route exact path="/pokemon" component={Pokemon}/>
                        <Route exact path="/pokemon/location" component={PokemonLocation}/>
                        <Route component={Error}/>
                    </Switch>
                </div>
                <Background/>
            </BrowserRouter>
        );
    }
}

export default App;