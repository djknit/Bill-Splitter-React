import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import getStyle from './style';
import windowWidth from '../../data/windowWidth';
import currentPath from '../../data/currentPath';
import Message from '../message';

class HomeView extends Component {
  constructor() {
    super();
    this.updateStyle = this.updateStyle.bind(this);
    this.reportPathChange = this.reportPathChange.bind(this);
    this.state = {
      style: getStyle(windowWidth.getValue())
    };
  }

  updateStyle() {
    this.setState({
      style: getStyle(windowWidth.getValue())
    });
  }

  componentDidMount() {
    windowWidth.subscribe(this.updateStyle);
    this.test = function() {
      console.log('test');
    }
  }

  componentWillUnmount() {
    windowWidth.unsub(this.updateStyle);
  }

  reportPathChange() {
    currentPath.reportChange('/enter-bills');
  }

  render () {
    const { style } = this.state;

    return (
      <div style={style.view}>
        <Message theme="success" align="centered">
          <h2 className="title">Welcome to Dave's Delux Bill Splitting App!</h2>
        </Message>

        <Message theme="info">
          This app aims to make it easy to split <span className="emphasis">any set of bills</span>,
          between <span className="emphasis">any number of people</span>, in <span className="emphasis">any combination.</span>
        </Message>

        <Message theme="warning">
          <h4 className="subtitle has-text-centered">This site is under construction.</h4>
          <p>
            The basic features are still being desinged, so you may have to come back soon for the feature you are looking for.
          </p>
        </Message>

        <Message theme="secondary">
          <h5 className="subtitle has-text-centered">Press "Enter Bills" to get started!</h5>
          <p className="margin-bottom">
            The app is not yet completely functional. You will not be able to calculate the bills,
            but you can get a feel for what the app looks like and how it is supposed to work.
          </p>
          <div className="has-text-centered">
            <Link
              className="button is-info is-medium"
              to="/enter-bills"
              onClick={this.reportPathChange}
              style={style.enterBillsButton}
            >
              Enter Bills
            </Link>
          </div>
        </Message>
      </div>
    );
  }
}

export default HomeView;