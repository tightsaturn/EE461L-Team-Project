import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Restaurants from './components/Restaurants';
import AboutUS from './components/AboutUS';
import Error from './components/Error';
import Recipes from './components/Recipes';
import Movedex from './components/Movedex';
import RestaurantInfo from "./components/RestaurantInfo";
import RestaurantLocation from "./components/RestaurantLocation";
import { Map, GoogleApiWrapper } from 'google-maps-react';


class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Header/>
                <div>
                    <Switch>
                        <Route path="/" component={Header} exact/>
                        <Route path="/restaurants" component={Restaurants}/>
                        <Route path="/recipes" component={Recipes}/>
                        <Route path="/aboutus" component={AboutUS}/>
                        <Route path="/movedex" component={Movedex}/>
                        <Route path="/restaurant/info" component={RestaurantInfo}/>
                        <Route path="/restaurant/location" component={RestaurantLocation}/>
                        <Route component={Error}/>
                    </Switch>
                </div>
            </BrowserRouter>

        );
    }
}

export default App;