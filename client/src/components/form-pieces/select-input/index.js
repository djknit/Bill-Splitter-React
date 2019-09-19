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
  selectedOptionIndex,
  handleChange,
  isInline,
  formId,
  name,
  sizeRatio
}) {

  // requireProps(label ? { handleChange, formId, name } : { handleChange });

  const inputId = formId && name && `${formId}-${name}-in`;

  const style = getStyle(sizeRatio);

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
          value={selectedOptionIndex === null ? '' : selectedOptionIndex}
          onChange={({ target }) => handleChange(target.value)}
          style={selectedOptionIndex === null ? style.selectInputNoSelection : style.selectInput}
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
                key={option.id}
                value={index}
                style={style.option}
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