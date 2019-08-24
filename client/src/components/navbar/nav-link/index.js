import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import appData from '../../../AppData';

class Navlink extends Component {
  constructor(props) {
    super(props);
    this.getCurrentPath = this.getCurrentPath.bind(this);
    this.reportPathChange = this.reportPathChange.bind(this);
    this.state = {
      currentPath: appData.currentPath
    };
  }

  getCurrentPath() {
    this.setState({
      currentPath: appData.currentPath
    });
  }

  componentDidMount() {
    appData.subscribePath(this.getCurrentPath);
  }

  componentWillUnmount() {
    appData.unsubPath(this.getCurrentPath);
  }

  reportPathChange() {
    appData.notifyPath(this.props.path);
  }

  render() {
    const {
      path,
      text,
      onClick
    } = this.props;

    return (
      path ?
        <Link
          to={path}
          className={this.state.currentPath === path ? "navbar-item is-active" : "navbar-item"}
          onClick={this.reportPathChange}
        >
          {text}
        </Link>
        :
        <span
          onClick={onClick}
        >
          {text}
        </span>
    );
  }
}

export default Navlink