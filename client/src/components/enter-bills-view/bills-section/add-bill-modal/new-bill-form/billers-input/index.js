import React, { Component } from 'react';
import { oneOrMoreBillersService } from './data';
import style from './style';
import { RadioInputs } from '../../../../../form-pieces';
import BillerSingleInput from './biller-single-input';
import BillersMultipleInputs from './billers-multiple-inputs';

class BillersInput extends Component {
  constructor(props) {
    super(props);
    this.getInputValue = this.getInputValue.bind(this);
    this.state = {
      oneOrMoreBillersValue: oneOrMoreBillersService.getValue()
    }
  }

  getInputValue() {
    this.setState({
      oneOrMoreBillersValue: oneOrMoreBillersService.getValue()
    });
  }

  componentDidMount() {
    oneOrMoreBillersService.subscribe(this.getInputValue);
  }

  componentWillUnmount() {
    oneOrMoreBillersService.unsub(this.getInputValue);
  }

  render() {
    const { formId } = this.props;
    const { oneOrMoreBillersValue } = this.state;

    const subSectionSizeRatio = .9;

    return (
      <fieldset>
        <legend className="label">
          Biller <span style={style.normalWeight}>(Who is this bill paid to?)</span>
        </legend>
        <RadioInputs
          selectedValue={oneOrMoreBillersValue}
          options={[
            {
              value: 'one',
              label: 'One Biller (default)'
            }, {
              value: 'more',
              label: 'Multiple Billers'
            }
          ]}
          handleChange={oneOrMoreBillersService.update}
        />
        <hr style={style.sectionSubdividerFirst} />
        <div style={style.subsectionContainer}>
          {
            oneOrMoreBillersValue === 'one' ?
              <BillerSingleInput
                formId={formId}
                sizeRatio={subSectionSizeRatio}
              />
              :
              <BillersMultipleInputs
                formId={formId}
                sizeRatio={subSectionSizeRatio}
              />
          }
        </div>
      </fieldset>
    );
  }
}

export default BillersInput;