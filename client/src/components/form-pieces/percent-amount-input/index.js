import React from 'react';
import getStyle from './style';
import BoxInputFrame from '../box-input-frame';

function PercentAmountInput({
  value,
  handleChange,
  formId,
  name,
  sizeRatio,
  label,
  sublabel,
  isInline,
  hasSmallMargins,
  isLastChild,
  billTotal,
  remainderMethodSelectionIndexes
}) {

  const { percent, dollarAmount } = value;

  const inputId = (formId && name) ? `${formId}-${name}-in` : undefined;

  const style = getStyle(sizeRatio);

  return (
    <BoxInputFrame
      hasIcon="right"
      controlStyle={style.control}
      inputId={inputId}
      label={label}
      sublabel={sublabel}
      isInline={isInline}
      sizeRatio={sizeRatio}
      hasSmallMargins={hasSmallMargins}
      isLastChild={isLastChild}
    >
      <input
        id={inputId}
        className="input"
        type="number"
        style={style.input}
        value={percent.raw}
        onChange={({ target }) => handleChange(target.value)}
      />
      <span className="icon is-right" style={style.icon}>%</span>
      {
        (percent.display === 'invalid' && (
          <div style={style.amountDisplayNegative}>
            Invalid input
          </div>
        )) || (percent.display !== null && (
          <div style={style.amountDisplay}>
            <>{percent.display} %</>
            {
              ((dollarAmount.display || dollarAmount.display === 0) && (
                <>
                  <span style={style.percentDollarDivider}>
                    =
                  </span>
                  <span style={style.dollarAmountDisplay}>
                    $ {dollarAmount.display}
                  </span>
                </>
              ))
            }
          </div>
        ))
      }
    </BoxInputFrame>
  );
}

export default PercentAmountInput;