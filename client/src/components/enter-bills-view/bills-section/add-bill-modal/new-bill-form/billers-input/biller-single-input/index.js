import React from 'react';
import getStyle from './style';
import { TextInput, RadioInputs } from '../../../../../../form-pieces';

function BillerSingleInput({
  inputValue,
  updateBillerSingle,
  agents,
  formId
}) {

  const sizeRatio = .9;

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
            />
          ) : (
            <div className="field">
              <div className="control">
                <div className="select" style={style.selectInputDiv}>
                  <select
                    value={inputValue.selectedOptionIndex === null ? '' : inputValue.selectedOptionIndex}
                    onChange={({ target }) => {
                      updateBillerSingle('selectedOptionIndex', target.value);
                    }}
                    style={inputValue.selectedOptionIndex === null ? style.selectInputNoSelection : style.selectInput}
                  >
                    <option disabled value="" style={style.optionDisabled}>
                      Select biller name
                    </option>
                    {
                      inputValue.options.map((agent, index) => (
                        <option
                          key={agent.id}
                          value={index}
                          style={style.option}
                        >
                          {agent.name}
                        </option>
                      ))
                    }
                  </select>
                </div>
              </div>
            </div>
          )
      }
    </fieldset>
  );
}

export default BillerSingleInput;