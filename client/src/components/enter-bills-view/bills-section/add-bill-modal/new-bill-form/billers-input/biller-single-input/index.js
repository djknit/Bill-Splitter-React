import React from 'react';
import getStyle from './style';
import { TextInput, RadioInputs, SelectInput } from '../../../../../../form-pieces';

function BillerSingleInput({
  inputValue,
  updateBillerSingle,
  agents,
  formId,
  sizeRatio
}) {

  const style = getStyle(sizeRatio);

  return (
    <fieldset>
      <legend className="label" style={style.legend}>
        Biller Name
      </legend>
      {
        agents.length > 0 && (
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
            selectedValue={inputValue.typeOrSelect}
            handleChange={(value) => updateBillerSingle('typeOrSelect', value)}
            sizeRatio={sizeRatio}
          />
        )
      }
      {
        (agents.length === 0 || inputValue.typeOrSelect === 'type') ?
          (
            <TextInput
              placeholder="Name of business or person the bill is paid to..."
              value={inputValue.typed}
              formId={formId}
              name="biller-single-name-typed"
              handleChange={(value) => updateBillerSingle('typed', value)}
              sizeRatio={sizeRatio}
            />
          ) : (
            <SelectInput
              placeholder="Select biller name"
              options={inputValue.options}
              selectedOptionIndex={inputValue.selectedOptionIndex}
              handleChange={value => updateBillerSingle('selectedOptionIndex', value)}
              sizeRatio={sizeRatio}
            />
          )
      }
    </fieldset>
  );
}

export default BillerSingleInput;