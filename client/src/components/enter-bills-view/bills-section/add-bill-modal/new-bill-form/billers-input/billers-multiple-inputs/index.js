import React, { Component } from 'react';
import dataService from './data';
import { TextInput, RadioInputs, SelectInput } from '../../../../../../form-pieces';
import BillerMultInput from './biller-mult-input';

class BillersMultipleInputs extends Component {
  constructor(props) {
    super(props);
    this.getInputValues = this.getInputValues.bind(this);
    this.state = {
      inputValues: dataService.getValue()
    };
  }

  getInputValues() {
    this.setState({
      inputValues: dataService.getValue()
    });
  }

  componentDidMount() {
    dataService.subscribe(this.getInputValues);
  }

  componentWillUnmount() {
    dataService.unsub(this.getInputValues);
  }

  render() {

    const { inputValues } = this.state;
    const {
      formId,
      sizeRatio
    } = this.props;
    const updateData = dataService.update;

    return (
      <fieldset>
        {
          inputValues.map(
            (inputValue, index) => (
              <BillerMultInput
                index={index}
                inputValue={inputValue}
                formId={formId}
                sizeRatio={sizeRatio}
                updateData={(propName, value) => updateData(index, propName, value)}
                key={inputValue.inputId}
              />
            )
          )
        }
      </fieldset>
    );
  }
}

export default BillersMultipleInputs;