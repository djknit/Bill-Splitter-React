import React, { Component } from 'react';
import dataService from './data';
import { participantsService } from '../../../../../enter-bills-view/data/entities/index';
import { Legend, RadioInputs } from '../../../../../form-pieces';
import style from './style';
import PayerSingleInput from './payer-single-input';
import PayersMultipleInputs from './payers-multiple-inputs';

class IsPaidInput extends Component {
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
    const { isPaid, oneOrMore, numberOfParticipants } = this.state.inputValue;

    return (
      <fieldset>
        <Legend
          label="Has this bill been paid?"
          hasSmallMargins
        />
        <RadioInputs
          selectedValue={isPaid}
          options={[
            {
              value: true,
              label: 'Yes'
            }, {
              value: false,
              label: 'No'
            }
          ]}
          handleChange={value => dataService.update('isPaid', value)}
          hasSmallMargins
        />
        {
          isPaid && numberOfParticipants > 1 && (
            <>
              <hr style={style.sectionSubdividerFirst} />
              <fieldset style={style.subsectionContainer}>
                <Legend
                  label="Payer"
                  sublabel="Who paid this bill?"
                  hasSmallMargins
                  sizeRatio={subsectionSizeRatio}
                />
                <RadioInputs
                  selectedValue={oneOrMore}
                  options={[
                    {
                      value: 'one',
                      label: 'One Payer (default)'
                    }, {
                      value: 'more',
                      label: 'Multiple Payers'
                    }
                  ]}
                  handleChange={val => dataService.update('oneOrMore', val)}
                  hasSmallMargins
                  sizeRatio={subsectionSizeRatio}
                />
                <hr style={style.sectionSubdividerFirst} />
                <div style={style.subsectionContainer}>
                  {
                    oneOrMore && (
                      oneOrMore === 'one' ?
                        <PayerSingleInput sizeRatio={subsectionSizeRatio} /> :
                        <PayersMultipleInputs
                          sizeRatio={subsectionSizeRatio}
                          numberOfParticipants={numberOfParticipants}
                        />
                      
                    )
                  }
                </div>
              </fieldset>
            </>
          )
        }
      </fieldset>
    );
  }
}

export default IsPaidInput;