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
      isAddPButtonDisabled,
      remainderMethodSelectionIndexes,
      billTotal,
      unassignedAmount
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
                billTotal={billTotal}
                remainderMethodSelectionIndexes={remainderMethodSelectionIndexes}
              />
            )
          )
        }
        <hr style={style.divider} />
        <span
          className="button is-info"
          style={style.addInputBtn}
          onClick={isAddPButtonDisabled ? undefined : dataService.addInput}
          disabled={isAddPButtonDisabled}
        >
          <span style={style.btnPlus}>+</span> Add Participant
        </span>
        {
          (
            unassignedAmount.rounded === 0 && (
              <span style={style.errorZero}>
                The total amount assigned matches the Bill Total.
              </span>
            )
          ) || (
            unassignedAmount.rounded !== null && (
              <span style={style.error}>
                The total amount assigned does <strong style={style.errorStrong}>not</strong> match the Bill Total.
              </span>
            )
          )
        }
      </fieldset>
    );
  }
}

export default IndividuallyInputs;