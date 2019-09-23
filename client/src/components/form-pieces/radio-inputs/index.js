import React from 'react';
import { requireProps } from '../../../utilities';
import getStyle from './style';

function RadioInputs({
  selectedValue,
  options,
  handleChange,
  sizeRatio,
  hasSmallMargins,
  isLastChild,
  isInline
}) {

  isInline = !(isInline === false);

  const style = getStyle(sizeRatio, hasSmallMargins, isLastChild);

  return (
    <div className="field" style={style.field}>
      <div className="control">

        {options.map((option, index) => {
          const { label, value } = option;
          const isLast = index === options.length - 1;
          const isSelected = value === selectedValue;

          return (
            <React.Fragment key={value}>
              <label
                className="radio"
                style={
                  (isInline && !isLast && isSelected &&
                    style.labelInlineNotLastSelected) ||
                  (isInline && !isLast && style.labelInlineNotLast) ||
                  (isSelected && style.labelSelected) ||
                  style.radioLabel
                }
              >
                <input
                  type="radio"
                  style={style.radioInput}
                  value={value}
                  checked={value === selectedValue}
                  onChange={() => handleChange(value)}
                />
                {label}
              </label>
              {
                !isInline && (
                  <br />
                )
              }
            </React.Fragment>
          )
        }
        )}

      </div>
    </div>
  );
}

export default RadioInputs;