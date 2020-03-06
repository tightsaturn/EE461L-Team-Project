import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Homepage from './components/Homepage'
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
                <Header/>
                <div>
                    <Switch>
                        <Route exact path="/" component={Homepage}/>
                        <Route exact path="/recipes" component={Recipes}/>
                        <Route exact path="/aboutus" component={AboutUS}/>
                        <Route exact path="/delivery" component={Delivery}/>
                        <Route exact path="/restaurant/info" component={RestaurantInfo}/>
                        <Route exact path="/restaurant/location" component={RestaurantLocation}/>
                        <Route component={Error}/>
                    </Switch>
                </div>
                <Background/>
            </BrowserRouter>
        );
    }
}

export default App;