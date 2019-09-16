import React, { Component } from 'react';
import dataService from './data';
import style from './style';
import RadioInputs from '../../../../../form-pieces/radio-inputs';

class BillersInput extends Component {
  constructor(props) {
    super(props);
    this.getInputValue = this.getInputValue.bind(this);
    this.reportChange = this.reportChange.bind(this);
    this.reset = this.reset.bind(this);
    this.state = {
      inputValue: {}
    }
  }

  getInputValue() {
    this.setState({
      inputValue: dataService.getValue()
    });
  }

  reportChange() {

  }

  reset() {

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
        <legend className="label">
          Biller <span style={style.normalWeight}>(Who is this bill paid to?)</span>
        </legend>
        {/* <div className="field">
          <div className="control">
            <label className="radio" style={style.radioLabelNotLast}>
              <RadioInput value="one" selectedValue={inputValue.oneOrMoreBillers} />
              One Biller (default)
            </label>
            <label className="radio">
              <RadioInput value="more" selectedValue={inputValue.oneOrMoreBillers} />
              Multiple Billers
            </label>
          </div>
        </div> */}
        <RadioInputs
          selectedValue={inputValue.oneOrMoreBillers}
          options={[
            {
              value: 'one',
              label: 'One Biller (default)'
            }, {
              value: 'more',
              label: 'Multiple Billers'
            }
          ]}
          handleChange={dataService.updateOneOrMoreBillers}
        />
        <hr style={style.sectionSubdividerFirst} />
      </fieldset>
    );
  }
}

export default BillersInput;