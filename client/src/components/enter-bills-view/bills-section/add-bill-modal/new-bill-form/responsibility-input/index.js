import React, { Component } from 'react';
import { splittingMethodAndAllEvenlyAmountService as dataService } from './data';
import style from './style';
import { Legend, RadioInputs } from '../../../../../form-pieces';
import AmountPerPersonDisplay from './amount-per-person-display';
import SomeEvenlyInputs from './some-evenly-inputs';
import IndividuallyInputs from './individually-inputs';

class ResponsibilityInput extends Component {
  constructor() {
    super();
    this.getInputValue = this.getInputValue.bind(this);
    this.state = {
      inputValue: dataService.getValue()
    }
  }

  getInputValue() {
    this.setState({
      inputValue: dataService.getValue()
    });
  }

  componentDidMount() {
    this.getInputValue();
    dataService.subscribe(this.getInputValue);
  }

  componentWillUnmount() {
    dataService.unsub(this.getInputValue);
  }

  render() {
    const { formId, subsectionSizeRatio } = this.props;
    const { splittingMethod, allEvenlyAmountPerPerson, numberOfParticipants } = this.state.inputValue;

    return (
      <fieldset>
        <Legend
          label="Responsible Participants"
          sublabel="How do you want to split the bill between the participants?"
          hasSmallMargins
        />
        <RadioInputs
          selectedValue={splittingMethod}
          options={[
            {
              value: 'allEvenly',
              label: <>Evenly between <span style={{fontWeight: 500}}>all</span> participants</>
            }, {
              value: 'someEvenly',
              label: <>Evenly between <span style={{fontWeight: 500}}>some</span> participants</>
            }, {
              value: 'individually',
              label: 'Other (Assign responsibility individually)'
            }
          ]}
          handleChange={dataService.updateSplittingMethod}
          hasSmallMargins
          isInline={false}
        />
        <hr style={style.sectionSubdividerFirst} />
        <div style={style.subsectionContainer}>
          {
            (splittingMethod === 'allEvenly' && (
              <AmountPerPersonDisplay
                amountDisplayValue={allEvenlyAmountPerPerson.display}
                numberOfParticipants={numberOfParticipants}
                sizeRatio={subsectionSizeRatio}
              />
            )) ||
            (splittingMethod === 'someEvenly' && (
              <SomeEvenlyInputs
                formId={formId}
                sizeRatio={subsectionSizeRatio}
              />
            )) ||
            (
              <IndividuallyInputs
                formId={formId}
                sizeRatio={subsectionSizeRatio}
              />
            )
          }
        </div>
      </fieldset>
    );
  }
}

export default ResponsibilityInput;