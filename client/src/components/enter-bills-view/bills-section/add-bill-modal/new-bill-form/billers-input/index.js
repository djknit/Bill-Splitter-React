import React, { Component } from 'react';
import inputDataService from './data';
import { agentsService } from '../../../../data/entities';
import style from './style';
import { RadioInputs } from '../../../../../form-pieces';
import BillerSingleInput from './biller-single-input';
import BillersMultipleInputs from './billers-multiple-inputs';

class BillersInput extends Component {
  constructor(props) {
    super(props);
    this.getInputValue = this.getInputValue.bind(this);
    this.reportChange = this.reportChange.bind(this);
    this.reset = this.reset.bind(this);
    this.state = {
      inputValue: inputDataService.getValue(),
      agents: []
    }
  }

  getInputValue() {
    this.setState({
      inputValue: inputDataService.getValue()
    });
  }

  getAgents() {
    agentsService
      .getValue()
      .then(agents => this.setState({ agents }));
  }

  reportChange() {

  }

  reset() {

  }

  componentDidMount() {
    this.getAgents();
    inputDataService.subscribe(this.getInputValue);
    agentsService.subscribe(this.getAgents);
  }

  componentWillUnmount() {
    inputDataService.unsub(this.getInputValue);
    agentsService.subscribe(this.getAgents);
  }

  render() {
    const { formId } = this.props;
    const { inputValue, agents } = this.state;

    const subSectionSizeRatio = .9;

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
          handleChange={inputDataService.updateOneOrMoreBillers}
        />
        <hr style={style.sectionSubdividerFirst} />
        <div style={style.subsectionContainer}>
          {
            inputValue.oneOrMoreBillers === 'one' ?
              <BillerSingleInput
                inputValue={inputValue.billerSingle}
                updateBillerSingle={inputDataService.updateBillerSingle}
                agents={agents}
                formId={formId}
                sizeRatio={subSectionSizeRatio}
              />
              :
              <BillersMultipleInputs
                inputValue={inputValue.billersMultiple}
                updateBillersMultiple={inputDataService.updateBillersMultiple}
                formId={formId}
              />
          }
          
        </div>
      </fieldset>
    );
  }
}

export default BillersInput;