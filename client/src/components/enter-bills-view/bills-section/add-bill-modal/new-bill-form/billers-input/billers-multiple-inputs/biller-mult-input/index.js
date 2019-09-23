import React from 'react';
import getStyle from './style';
import
  { TextInput, RadioInputs, SelectInput, AmountInput, Legend }
  from '../../../../../../../form-pieces';

function BillerMultInput({
  index,
  inputValue,
  formId,
  sizeRatio,
  updateData,
  removeInput
}) {

  const style = getStyle(sizeRatio);
  const {
    typeOrSelect,
    typed,
    selectedAgentId,
    options,
    amount
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
      <fieldset style={style.fieldset}>
        <Legend
          label={`Biller ${index + 1}`}
          hasSmallMargins
          sizeRatio={sizeRatio}
        />
        <span
          className="button is-danger is-small"
          style={style.removeBtn}
          onClick={removeInput}
        >
          <span className="delete is-small"></span>
          &nbsp;Remove
        </span>
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
              hasSmallMargins
            />
          )
        }
        <NameInput
          placeholder={showSelect ?
            "Select biller name" :
            "Name of business or person the bill is paid to..."
          }
          label="Name"
          value={showSelect ? selectedAgentId : typed}
          formId={formId}
          name={`biller-mult-${index}-name-${showSelect ? 'select' : 'type'}`}
          handleChange={value =>
            updateData(
              showSelect ? 'selectedAgentId' : 'typed',
              value
            )
          }
          sizeRatio={sizeRatio}
          isInline
          options={showSelect ? options : undefined}
          hasSmallMargins
        />
        <AmountInput
          value={amount}
          handleChange={value => updateData('amount', value)}
          formId={formId}
          name={`biller-mult-${index}-amount`}
          label="Amount"
          sizeRatio={sizeRatio}
          isInline
        />
      </fieldset>
    </>
  );
}

export default BillerMultInput;