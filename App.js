import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Restaurants from './components/Restaurants';
import AboutUS from './components/AboutUS';
import Error from './components/Error';
import Recipes from './components/Recipes';
import Delivery from './components/Recipes';
import RestaurantInfo from "./components/RestaurantInfo";
import RestaurantLocation from "./components/RestaurantLocation";
import Background from "./components/Background"


class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Switch>
                        <Route path="/" component={Header} exact/>
                        <Route path="/" component={Restaurants}/>
                        <Route path="/recipes" component={Recipes}/>
                        <Route path="/aboutus" component={AboutUS}/>
                        <Route path="/delivery" component={Delivery}/>
                        <Route path="/restaurant/info" component={RestaurantInfo}/>
                        <Route path="/restaurant/location" component={RestaurantLocation}/>
                        <Route component={Error}/>
                    </Switch>
                </div>
                <Background/>
            </BrowserRouter>
        );
    }
}

export default App;