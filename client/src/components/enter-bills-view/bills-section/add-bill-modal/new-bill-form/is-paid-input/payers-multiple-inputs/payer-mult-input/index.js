import React from 'react';
import getStyle from './style';
import
  { RadioInputs, SelectInput, AmountInput, Legend }
  from '../../../../../../../form-pieces';

function PayerMultInput({
  index,
  inputValue,
  formId,
  sizeRatio,
  updateData,
  removeInput
}) {

  const style = getStyle(sizeRatio);
  const {
    selectedParticipantId,
    options,
    amount
  } = inputValue;

  return (
    <>
      {
        index !== 0 && (
          <hr style={style.divider} />
        )
      }
      <fieldset style={style.fieldset}>
        <Legend
          label={`Payer ${index + 1}`}
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
        <SelectInput
          placeholder="Select payer name"
          label="Name"
          value={selectedParticipantId}
          formId={formId}
          name={`payer-mult-${index}-name-select`}
          handleChange={value =>
            updateData('selectedParticipantId', value)
          }
          sizeRatio={sizeRatio}
          isInline
          options={options}
          hasSmallMargins
        />
        <AmountInput
          placeholder="$ payed by this participant"
          value={amount}
          handleChange={value => updateData('amount', value)}
          formId={formId}
          name={`payer-mult-${index}-amount`}
          label="Amount"
          sizeRatio={sizeRatio}
          isInline
          hasSmallMargins
          isLastChild
        />
      </fieldset>
    </>
  );
}

export default PayerMultInput;