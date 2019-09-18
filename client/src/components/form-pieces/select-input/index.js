import React from 'react';
import getStyle from './style';
import { requireProps } from '../../../utilities';

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

  requireProps({ value, handleChange, formId, name });

  const inputId = `${formId}-${name}-in`;

  const style = getStyle(sizeRatio);

  return (
    <div className={`field${inline ? ' is-horizontal' : ''}`}>
      {label && (
        <label htmlFor={inputId} className="label" style={isInline ? style.inlineLabel : {}}>
          {label} {sublabel && (<span style={style.normalWeight}>({sublabel})</span>)}
        </label>
      )}
      <div className="control">
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
      </div>
    </div>
  );
}

export default SelectInput;