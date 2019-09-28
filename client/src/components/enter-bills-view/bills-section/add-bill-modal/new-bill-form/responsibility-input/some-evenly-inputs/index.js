import React, { Component } from 'react';
import dataService from './data';
import getStyle from './style';
import SomeEvenlyInput from './some-evenly-input';
import AmountPerPersonDisplay from '../amount-per-person-display';

class SomeEvenlyInputs extends Component {
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
      amountPerPerson
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
              <SomeEvenlyInput
                index={index}
                inputValue={inputValue}
                formId={formId}
                sizeRatio={sizeRatio}
                updateData={value => dataService.update(index, value)}
                key={inputValue.inputId}
                removeInput={() => dataService.removeInput(index)}
              />
            )
          )
        }
        <hr style={style.divider} />
        <span
          className="button is-info"
          style={style.addInputBtn}
          onClick={dataService.addInput}
          disabled={isAddPButtonDisabled}
        >
          <span style={style.btnPlus}>+</span> Add Participant
        </span>
        <AmountPerPersonDisplay
          amountDisplayValue={amountPerPerson}
          numberOfParticipants={inputValues.length}
          sizeRatio={sizeRatio}
        />
      </fieldset>
    );
  }
}

export default SomeEvenlyInputs;