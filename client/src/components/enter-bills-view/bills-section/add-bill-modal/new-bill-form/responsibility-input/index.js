import React, { Component } from 'react';
import { splittingMethodAndAllEvenlyAmountService as dataService } from './data';

class ResponsibilityInput extends Component {
  constructor() {
    super();
    this.getInputValue = this.getInputValue.bind(this);
    this.state = {
      inputValue: dataService.getValue()
    }
  }

  getInputValue() {
    this.setState({
      inputValue: dataService.getValue()
    });
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
      <fieldset>
        ResponsibilityInput
      </fieldset>
    );
  }
}

export default ResponsibilityInput