import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import './style.css';
import getStyle from './style'
import currentPath from '../../../data/currentPath';

class Navlink extends Component {
  constructor(props) {
    super(props);
    this.getCurrentPath = this.getCurrentPath.bind(this);
    this.reportPathChange = this.reportPathChange.bind(this);
    this.linkText = React.createRef();
    this.state = {
      currentPath: currentPath.getValue(),
      style: getStyle()
    };
  }

  getCurrentPath() {
    this.setState({
      currentPath: currentPath.getValue()
    });
  }

  componentDidMount() {
    currentPath.subscribe(this.getCurrentPath);
    // The following locks the width to keep things from moving around when item toggles active state.
    if (this.props.path) {
      this.setState({
        style: getStyle(this.linkText.current.clientWidth)
      });
    }
  }

  componentWillUnmount() {
    currentPath.unsub(this.getCurrentPath);
  }

  reportPathChange() {
    currentPath.reportChange(this.props.path);
  }

  render() {
    const {
      path,
      text,
      onClick
    } = this.props;
    const { style } = this.state;

    const isActive = this.state.currentPath === path;

    return (
      path ?
        <Link
          to={path}
          className={isActive ? "navbar-item is-active" : "navbar-item"}
          onClick={this.reportPathChange}
          style={isActive ? style.activeNavItem : style.navItem}
        >
          <span ref={this.linkText}>
            {text}
          </span>
        </Link>
        :
        <span
          onClick={onClick}
          style={style.navItem}
        >
          {text}
        </span>
    );
  }
}

export default Navlink;