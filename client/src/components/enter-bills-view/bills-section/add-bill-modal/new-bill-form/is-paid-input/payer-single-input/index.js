import React, { Component } from 'react';
import dataService from './data';
import { TextInput, RadioInputs, SelectInput, Legend } from '../../../../../../form-pieces';

class PayerSingleInput extends Component {
  constructor(props) {
    super(props);
    this.getInputValue = this.getInputValue.bind(this);
    this.state = {
      inputValue: dataService.getValue()
    };
  }

  getInputValue() {
    this.setState({
      inputValue: dataService.getValue()
    });
  }

  componentDidMount() {
    dataService.subscribe(this.getInputValue);
  }

  componentWillUnmount() {
    dataService.unsub(this.getInputValue);
  }

  render() {

    const { inputValue } = this.state;
    const {
      formId,
      sizeRatio
    } = this.props;
    const {
      selectedParticipantId,
      options
    } = inputValue;

    return (
      <fieldset>
        <SelectInput
          placeholder="Select payer name"
          options={options}
          value={selectedParticipantId}
          handleChange={value => dataService.update('selectedParticipantId', value)}
          sizeRatio={sizeRatio}
          formId={formId}
          name="payer-single-name"
          label="Name"
          isInline
        />
      </fieldset>
    );
  }
}

export default PayerSingleInput;