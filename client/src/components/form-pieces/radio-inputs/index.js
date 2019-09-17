import React from 'react';
import { requireProps } from '../../../utilities';
import getStyle from './style';

function RadioInputs({
  selectedValue,
  options,
  handleChange,
  sizeRatio
}) {

  requireProps({ selectedValue, options, handleChange });

  const style = getStyle(sizeRatio);

  return (
    <div className="field">
      <div className="control">

        {options.map((option, index) => {
          const { value, label } = option;
          return (
            <label
              className="radio"
              style={(index === options.length - 1) ? style.radioLabelLast : style.radioLabelNotLast}
              key={value}
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
          );
        })}

      </div>
    </div>
  );
}

export default RadioInputs;