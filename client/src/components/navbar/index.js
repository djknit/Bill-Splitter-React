import React, { Component } from 'react';
import getStyle from './style';
import windowWidth from '../../data/windowWidth';
import NavLink from './nav-link';

class Navbar extends Component {
  constructor() {
    super();
    this.updateStyle = this.updateStyle.bind(this);
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
  }
  componentWillUnmount() {
    windowWidth.unsub(this.updateStyle);
  }

  render() {
    const { style } = this.state;
    
    return (
      <nav className="navbar" role="navigation" aria-label="main navigation" style={style.nav}>
        <div className="navbar-brand">
          <div className="navbar-item" style={style.brand}>
            <span className="brand">
              <span className="dollar-sign" style={style.dollarSign}>$</span>
              &nbsp;Dave's Delux Bill Splitter&nbsp;
              <span className="dollar-sign" style={style.dollarSign}>$</span>
            </span>
          </div>
          <div className="navbar-item">&mdash;</div>
          <NavLink path="/" text="Home" />
          <div className="navbar-item">|</div>
          <NavLink path="/enter-bills" text="Enter Bills" />
        </div>
      </nav>
    );  
  }
}

export default Navbar;