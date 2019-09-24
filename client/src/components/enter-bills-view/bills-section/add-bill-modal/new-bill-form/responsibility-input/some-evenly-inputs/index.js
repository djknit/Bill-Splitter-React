import React, { Component } from 'react';
import dataService from './data';
import getStyle from './style';
import SomeEvenlyInput from './some-evenly-input';

class SomeEvenlyInputs extends Component {
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
        <span className="button is-info" style={style.addInputBtn} onClick={dataService.addInput}>
          <span style={style.btnPlus}>+</span> Add Participant
        </span>
      </fieldset>
    );
  }
}

export default SomeEvenlyInputs;