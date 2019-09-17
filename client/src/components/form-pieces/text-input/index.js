import React from 'react';
import style from './style';
import { requireProps } from '../../../utilities';

function TextInput({
  inputRef,
  label,
  sublabel,
  placeholder,
  value,
  handleChange,
  inline,
  formId,
  name
}) {

  requireProps({ value, handleChange, formId, name });

  const inputId = `${formId}-${name}-in`;

  return (
    <div className={`field${inline ? ' is-horizontal' : ''}`}>
      {label && (
        <label htmlFor={inputId} className="label" style={style.inlineLabel}>
          {label} {sublabel && (<span style={style.normalWeight}>({sublabel})</span>)}
        </label>
      )}
      <div className="control">
        <input
          id={inputId}
          ref={inputRef}
          className="input"
          placeholder={placeholder}
          onChange={({ target }) => handleChange(target.value)}
          value={value}
        />
      </div>
    </div>
  );
}

export default TextInput;