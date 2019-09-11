import React, { Component } from 'react';
import dataService from './data';

class IsPaidInput extends Component {
  constructor() {
    super();
    this.getInputValue = this.getInputValue.bind(this);
    this.reportChange = this.reportChange.bind(this);
    this.reset = this.reset.bind(this);
    this.state = {
      inputValue: {}
    }
  }

  getInputValue() {
    this.setState({
      inputValue: dataService.getValue()
    });
  }

  reportChange() {

  }

  reset() {

  }

  componentDidMount() {
    this.getInputValue();
    dataService.subscribe(this.getInputValue);
  }

  componentWillUnmount() {
    dataService.unsub(this.getInputValue);
  }

  render() {
    return (
      <div className="field">
        <label htmlFor="" className="label"></label>
        <div className="control">
          <input id="" className="input" type="text" />
        </div>
      </div>
    );
  }
}

export default IsPaidInput;