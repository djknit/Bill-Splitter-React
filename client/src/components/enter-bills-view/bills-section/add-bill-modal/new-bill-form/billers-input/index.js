import React, { Component } from 'react';
import { oneOrMoreBillersService } from './data';
import style from './style';
import { RadioInputs, Legend } from '../../../../../form-pieces';
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
    const { formId, subsectionSizeRatio } = this.props;
    const { oneOrMoreBillersValue } = this.state;

    return (
      <fieldset>
        <Legend
          label="Biller"
          sublabel="Who is this bill paid to?"
          hasSmallMargins
        />
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
          hasSmallMargins
        />
        <hr style={style.sectionSubdividerFirst} />
        <div style={style.subsectionContainer}>
          {
            oneOrMoreBillersValue === 'one' ?
              <BillerSingleInput
                formId={formId}
                sizeRatio={subsectionSizeRatio}
              />
              :
              <BillersMultipleInputs
                formId={formId}
                sizeRatio={subsectionSizeRatio}
              />
          }
        </div>
      </fieldset>
    );
  }
}

export default BillersInput;