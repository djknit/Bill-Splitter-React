import React, { Component } from 'react';
import dataService from './data';
import style from './style';

class AmountInput extends Component {
  constructor() {
    super();
    this.getInputValue = this.getInputValue.bind(this);
    this.reportChange = this.reportChange.bind(this);
    this.reset = this.reset.bind(this);
    this.state = {
      inputValue: dataService.getValue()
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

export default AmountInput