import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bulma/css/bulma.css';
import './App.css';
import './AppData';
import Navbar from './components/navbar';
import HomeView from './components/home-view';
import EnterBillsView from './components/enter-bills-view';

class App extends Component {
  constructor(props) {
    super(props);
    this.updatePath = this.updatePath.bind(this);

    this.state = {
      currentPath: window.location.pathname
    }
  }

  updatePath(newPath) {
    this.setState({
      currentPath: newPath
    });
  }

  render() {
    return (
      <Router >
        <Navbar updatePath={this.updatePath} currentPath={this.state.currentPath} />
        <Switch>
          <Route
            exact
            path="/"
            render={props => <HomeView
              {...props}
              updatePath={this.updatePath}
              currentPath={this.state.currentPath} 
            />}
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