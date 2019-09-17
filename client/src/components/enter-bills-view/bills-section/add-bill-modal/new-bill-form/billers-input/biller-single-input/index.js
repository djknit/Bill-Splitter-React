import React from 'react';
import { TextInput, RadioInputs } from '../../../../../../form-pieces';
import getStyle from './style';

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
                <div className="select">
                  <select
                    value={inputValue.selected === null ? '' : inputValue.selected}
                    onChange={({ target }) => {
                      const { value } = target;
                      let reportedValue = value === '' ? null : Object.assign({}, agents[value]);
                      updateBillerSingle('selected', reportedValue);
                    }}
                  >
                    <option disabled value="">
                      Select biller name
                    </option>
                    {
                      agents.map((agent, index) => (
                        <option key={agent.id} value={index}>
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