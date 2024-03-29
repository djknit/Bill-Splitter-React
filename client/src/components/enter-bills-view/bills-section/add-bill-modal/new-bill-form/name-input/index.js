import React, { Component } from 'react';
import dataService from './data';
import TextInput from '../../../../../form-pieces/text-input';

class NameInput extends Component {
  constructor(props) {
    super(props);
    this.getInputValue = this.getInputValue.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      inputValue: dataService.getValue()
    }
  }

  getInputValue() {
    this.setState({
      inputValue: dataService.getValue()
    });
  }

  handleChange(value) {
    dataService.update(value);
  }

  componentDidMount() {
    dataService.subscribe(this.getInputValue);
  }

  componentWillUnmount() {
    dataService.unsub(this.getInputValue);
  }

  render() {
    const { formId, inputRef } = this.props;
    const { inputValue } = this.state;

    return (
      <TextInput
        inputRef={inputRef}
        label="Bill Name"
        sublabel="Optional"
        placeholder="Give the bill a nickname..."
        value={inputValue}
        handleChange={this.handleChange}
        formId={formId}
        name="name"
        hasSmallMargins
      />
    );
  }
}

export default NameInput;