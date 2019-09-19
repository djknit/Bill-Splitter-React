import React from 'react';
import getStyle from './style';
import { requireProps } from '../../../utilities';
import BoxInputFrame from '../box-input-frame';

function TextInput({
  inputRef,
  label,
  sublabel,
  placeholder,
  value,
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
    <BoxInputFrame
      label={label}
      sublabel={sublabel}
      isInline={isInline}
      inputId={inputId}
      sizeRatio={sizeRatio}
    >
      <input
        id={inputId}
        ref={inputRef}
        className="input"
        placeholder={placeholder}
        onChange={({ target }) => handleChange(target.value)}
        value={value}
        style={style.input}
      />
    </BoxInputFrame>
  );
}

export default TextInput;