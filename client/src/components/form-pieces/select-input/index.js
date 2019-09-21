import React from 'react';
import getStyle from './style';
import { requireProps } from '../../../utilities';
import BoxInputFrame from '../box-input-frame';

function SelectInput({
  inputRef,
  label,
  sublabel,
  placeholder,
  options,
  value,
  handleChange,
  isInline,
  formId,
  name,
  sizeRatio
}) {

  // requireProps(label ? { handleChange, formId, name } : { handleChange });

  const inputId = formId && name && `${formId}-${name}-in`;

  const style = getStyle(sizeRatio);

  if (value === null) value = '';

  return (
    <BoxInputFrame
      label={label}
      sublabel={sublabel}
      isInline={isInline}
      inputId={inputId}
      sizeRatio={sizeRatio}
    >
      <div className="select" style={style.selectInputDiv}>
        <select
          id={inputId}
          ref={inputRef}
          value={value}
          onChange={({ target }) => {
            handleChange(target.value === '' ? null : target.value);
          }}
          style={value === '' ? style.selectInputNoSelection : style.selectInput}
        >
          {
            placeholder && (
              <option disabled value="" style={style.optionDisabled}>
                {placeholder}
              </option>
            )
          }
          {
            options.map((option, index) => (
              <option
                key={option.value}
                value={option.value}
                style={option.disabled ? style.optionDisabled : style.option}
                disabled={option.disabled}
              >
                {option.name}
              </option>
            ))
          }
        </select>
      </div>
    </BoxInputFrame>
  );
}

export default SelectInput;