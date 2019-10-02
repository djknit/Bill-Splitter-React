import React from 'react';
import getStyle from './style'
import { Legend, SelectInput, RadioInputs, AmountInput, PercentAmountInput }
  from '../../../../../../../form-pieces';

function IndividuallyInput({
  index,
  inputValue,
  formId,
  sizeRatio,
  updateSelectedParticipantId,
  updateAmount,
  removeInput,
  billTotal,
  remainderMethodSelectionIndexes
}) {

  const style = getStyle(sizeRatio);
  const { selectedParticipantId, options, amount } = inputValue;
  const { method, dollarAmount, percent } = amount;

  return (
    <>
      {
        index !== 0 && (
          <hr style={style.divider} />
        )
      }
      <fieldset style={style.fieldset}>
        <Legend
          label={`Responsible Participant ${index + 1}`}
          hasSmallMargins
          sizeRatio={sizeRatio}
        />
        <span
          className="button is-danger is-small"
          style={style.removeBtn}
          onClick={removeInput}
          style={style.removeBtn}
        >
          <span className="delete is-small"></span>
          &nbsp;Remove
        </span>
        <SelectInput
          placeholder="Select participant name"
          label="Name"
          value={selectedParticipantId}
          formId={formId}
          name={`responsibility-individually-${index}`}
          handleChange={updateSelectedParticipantId}
          sizeRatio={sizeRatio}
          isInline
          options={options}
          hasSmallMargins
        />
        <Legend
          label="Amount"
          sublabel="How much is this participant responsible for paying?"
          hasSmallMargins
          sizeRatio={sizeRatio}
        />
        <RadioInputs
          selectedValue={method}
          options={[
            {
              value: 'dollarAmount',
              label: 'Enter dollar amount'
            }, {
              value: 'percent',
              label: 'Enter percent of total'
            }, {
              value: 'remainder',
              label: 'Assign remainder of total'
            }
          ]}
          handleChange={value => updateAmount('method', value)}
          hasSmallMargins
          sizeRatio={sizeRatio}
        />
        {
          (method === 'dollarAmount' && (
            <AmountInput
              value={dollarAmount}
              handleChange={rawValue => updateAmount('dollarAmount', rawValue)}
              sizeRatio={sizeRatio}
              hasSmallMargins
              isLastChild
            />
          )) || (
          method === 'percent' && (
            <PercentAmountInput
              value={amount}
              handleChange={rawValue => updateAmount('percent', rawValue)}
              sizeRatio={sizeRatio}
              hasSmallMargins
              isLastChild
              billTotal={billTotal}
              remainderMethodSelectionIndexes={remainderMethodSelectionIndexes}
            />
          )) || (
            <></>
          )
        }
      </fieldset>
    </>
  );
}

export default IndividuallyInput;