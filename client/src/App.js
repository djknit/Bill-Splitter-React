import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bulma/css/bulma.css';
import './App.css';
import windowWidth from './data/windowWidth';
import Navbar from './components/navbar';
import HomeView from './components/home-view';
import EnterBillsView from './components/enter-bills-view';

class App extends Component {
  constructor() {
    super();
    this.reportWindowWidthChange = this.reportWindowWidthChange.bind(this);
  }

  reportWindowWidthChange() {
    windowWidth.reportChange(window.innerWidth);
  }

  componentDidMount() {
    this.reportWindowWidthChange();
    window.addEventListener('resize', this.reportWindowWidthChange);
  }

  render() {
    return (
      <Router >
        <Navbar />
        <Switch>
          <Route
            exact
            path="/"
            component={HomeView}
          />
          <Route
            exact
            path="/enter-bills"
            component={EnterBillsView}
          />
        </Switch>
      </Router>
    );
  }
}

export default App;