import React, { Component } from 'react';
import dataService from './data';
import { Legend, RadioInputs } from '../../../../../form-pieces'

class IsPaidInput extends Component {
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
    const { formId } = this.props;
    const { inputValue } = this.state;

    return (
      <fieldset>
        <Legend
          label="Has this bill been paid?"
          hasSmallMargins
        />
        <RadioInputs
          selectedValue={inputValue}
          options={[
            {
              value: true,
              label: 'Yes'
            }, {
              value: false,
              label: 'No'
            }
          ]}
          handleChange={value => dataService.update(value)}
          hasSmallMargins
        />
      </fieldset>
    );
  }
}

export default IsPaidInput;