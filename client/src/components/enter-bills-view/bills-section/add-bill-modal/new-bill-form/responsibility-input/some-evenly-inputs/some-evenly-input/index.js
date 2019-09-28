import React from 'react';
import getStyle from './style';
import { Legend, SelectInput } from '../../../../../../../form-pieces';

function SomeEvenlyInput({
  index,
  inputValue,
  sizeRatio,
  formId,
  updateData,
  removeInput
}) {

  const style = getStyle(sizeRatio);
  const { selectedParticipantId, options } = inputValue;

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
          name={`responsibility-some-evenly-${index}`}
          handleChange={updateData}
          sizeRatio={sizeRatio}
          isInline
          options={options}
          hasSmallMargins
        />
      </fieldset>
    </>
  );
}

export default SomeEvenlyInput;