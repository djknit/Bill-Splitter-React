import React from 'react';
import getStyle from './style';
import { TextInput, RadioInputs, SelectInput } from '../../../../../../../form-pieces';

function BillerMultInput({
  index,
  inputValue,
  formId,
  sizeRatio,
  updateData
}) {

  const style = getStyle(sizeRatio);
  const {
    typeOrSelect,
    typed,
    selectedAgentId,
    options
  } = inputValue;
  const showSelect = options.length !== 0 && typeOrSelect === 'select';
  const NameInput = showSelect ? SelectInput : TextInput;

  return (
    <>
      {
        index !== 0 && (
          <hr style={style.divider} />
        )
      }
      <fieldset>
        <legend className="label" style={style.legend}>
          Biller {index + 1}
        </legend>
        {
          options.length > 0 && (
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
            />
          )
        }
        {
          <NameInput
            placeholder={showSelect ?
              "Select biller name" :
              "Name of business or person the bill is paid to..."
            }
            label="Name"
            value={showSelect ? selectedAgentId : typed}
            formId={formId}
            name={`biller-single-name-${showSelect ? 'select' : 'type'}`}
            handleChange={value =>
              updateData(
                showSelect ? 'selectedAgentId' : 'typed',
                value
              )
            }
            sizeRatio={sizeRatio}
            isInline
            options={showSelect ? options : undefined}
          />
        }
        {/* {
          (options.length === 0 || typeOrSelect === 'type') ?
            (
              <TextInput
                placeholder="Name of business or person the bill is paid to..."
                value={typed}
                formId={formId}
                name="biller-single-name-typed"
                handleChange={(value) => updateData('typed', value)}
                sizeRatio={sizeRatio}
                isInline
                label="Name"
              />
            ) : (
              <SelectInput
                placeholder="Select biller name"
                options={options}
                value={selectedAgentId}
                handleChange={value => updateData('selectedAgentId', value)}
                sizeRatio={sizeRatio}
                isInline
                label="Name"
                formId={formId}
                name="biller-single-name-select"
              />
            )
        } */}
      </fieldset>
    </>
  );
}

export default BillerMultInput;