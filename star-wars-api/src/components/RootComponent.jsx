import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import {ProtectedRoute} from './ProtectedRoute';
import LoginScreen from './LoginScreen';
import SearchScreen from './SearchScreen';
import { getAllPlanets } from '../apiCall';

export default class RootComponent extends Component {
    state={
      planets:[]
    }
    async componentDidMount(){
      const searchResults= await getAllPlanets();
      if(searchResults!==null){
        this.setState({planets:[...searchResults]})
        }
      }

  render() {
    return (
      <div>
        <Router>
          <Route exact path="/" component={LoginScreen} />
          <Route exact path="/login" component={LoginScreen} />
          <ProtectedRoute path="/search" planets={this.state.planets} component={SearchScreen} />
        </Router>
      </div>
    );
  }
}
