import React, { Component } from 'react';
import dataService from './data';
import getStyle from './style';
import IndividuallyInput from './individually-input';

class IndividuallyInputs extends Component {
  constructor(props) {
    super(props);
    this.getInputValues = this.getInputValues.bind(this);
    this.state = dataService.getValue();
  }

  getInputValues() {
    this.setState(dataService.getValue());
  }

  componentDidMount() {
    dataService.subscribe(this.getInputValues);
  }

  componentWillUnmount() {
    dataService.unsub(this.getInputValues);
  }

  render() {
    const {
      inputValues,
      unassignedAmount,
      hasMultipleRemainderSelections,
      indexesOfInputsHavingSelectedRemainderMethod
    } = this.state;
    const {
      formId,
      sizeRatio
    } = this.props;
    const style = getStyle(sizeRatio);

    return (
      <fieldset>
        {
          inputValues.map(
            (inputValue, index) => (
              <IndividuallyInput
                index={index}
                inputValue={inputValue}
                formId={formId}
                sizeRatio={sizeRatio}
                updateSelectedParticipantId={
                  selectedId => dataService.updateSelectedParticipantId(index, selectedId)
                }
                updateAmount={
                  (propName, value) => dataService.updateAmount(index, propName, value)
                }
                key={inputValue.inputId}
                removeInput={() => dataService.removeInput(index)}
              />
            )
          )
        }
      </fieldset>
    );
  }
}

export default IndividuallyInputs;