import React, { Component } from 'react';
import getStyle from './style';
import dataService from './data';
import { TextInput, RadioInputs, SelectInput } from '../../../../../../form-pieces';

class BillerSingleInput extends Component {
  constructor(props) {
    super(props);
    this.getInputValue = this.getInputValue.bind(this);
    this.state = {
      inputValue: dataService.getValue()
    };
  }

  getInputValue() {
    this.setState({
      inputValue: dataService.getValue()
    });
  }

  componentDidMount() {
    dataService.subscribe(this.getInputValue);
  }

  componentWillUnmount() {
    dataService.unsub(this.getInputValue);
  }

  render() {

    const { inputValue } = this.state;
    const {
      formId,
      sizeRatio
    } = this.props;
    const style = getStyle(sizeRatio);
    const {
      typeOrSelect,
      typed,
      selectedAgentId,
      options
    } = inputValue;
    const updateData = dataService.update;

    return (
      <fieldset>
        <legend className="label" style={style.legend}>
          Biller Name
        </legend>
        {
          inputValue.options.length > 0 && (
            <RadioInputs
              options={[
                {
                  value: 'type',
                  label: 'Enter a new name'
                }, {
                  value: 'select',
                  label: 'Select from billers already used in this list'
                }
              ]}
              selectedValue={typeOrSelect}
              handleChange={(value) => updateData('typeOrSelect', value)}
              sizeRatio={sizeRatio}
              hasSmallMargins
            />
          )
        }
        {
          (options.length === 0 || typeOrSelect === 'type') ?
            (
              <TextInput
                placeholder="Name of business or person the bill is paid to..."
                value={typed}
                formId={formId}
                name="biller-single-name-typed"
                handleChange={(value) => updateData('typed', value)}
                sizeRatio={sizeRatio}
              />
            ) : (
              <SelectInput
                placeholder="Select biller name"
                options={options}
                value={selectedAgentId}
                handleChange={value => updateData('selectedAgentId', value)}
                sizeRatio={sizeRatio}
              />
            )
        }
      </fieldset>
    );
  }
}

export default BillerSingleInput;