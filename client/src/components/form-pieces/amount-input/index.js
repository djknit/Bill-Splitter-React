import React from 'react';
import getStyle from './style';
import BoxInputFrame from '../box-input-frame';

function AmountInput({
  value,
  handleChange,
  formId,
  name,
  sizeRatio,
  label,
  sublabel
}) {

  const inputId = `${formId}-${name}-in`;

  const style = getStyle(sizeRatio);

  return (
    <BoxInputFrame
      hasIcon
      controlStyle={style.control}
      inputId={inputId}
      label={label}
      sublabel={sublabel}
    >
      <input
        id={inputId}
        className="input"
        type="number"
        style={style.input}
        value={value.raw}
        onChange={({ target }) => handleChange(target.value)}
      />
      <span className="icon is-left">$</span>
      {
        (value.display === 'negative' && (
          <div style={style.amountDisplayNegative}>
            Negative values are not allowed
          </div>
        )) || (value.display !== null && (
          <div style={style.amountDisplay}>
            $ {value.display}
          </div>
        ))
      }
    </BoxInputFrame>
  );
}

export default AmountInput;