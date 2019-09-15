import React, { Component } from 'react';
import dataService from './data';

class BillersInput extends Component {
  constructor(props) {
    super(props);
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
    const { formId } = this.props;

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

export default BillersInput;