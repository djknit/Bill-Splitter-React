import React, { Component } from 'react';
import dataService from './data';
import getStyle from './style';
import PayerMultInput from './payer-mult-input';

class PayersMultipleInputs extends Component {
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
      sizeRatio,
      numberOfParticipants
    } = this.props;
    const style = getStyle(sizeRatio);
    const isButtonDisabled = numberOfParticipants <= inputValues.length;

    return (
      <fieldset>
        {
          inputValues.map(
            (inputValue, index) => (
              <PayerMultInput
                index={index}
                inputValue={inputValue}
                formId={formId}
                sizeRatio={sizeRatio}
                updateData={(propName, value) => dataService.update(index, propName, value)}
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
          onClick={isButtonDisabled ? () => null : dataService.addInput}
          disabled={isButtonDisabled}
        >
          <span style={style.btnPlus}>+</span> Add Payer
        </span>
      </fieldset>
    );
  }
}

export default PayersMultipleInputs;