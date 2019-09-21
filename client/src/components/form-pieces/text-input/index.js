import React from 'react';
import getStyle from './style';
import { requireProps } from '../../../utilities';
import BoxInputFrame from '../box-input-frame';

function TextInput({
  inputRef,
  placeholder,
  value,
  handleChange,
  formId,
  name,
  sizeRatio,
  ...otherProps
}) {

  requireProps({ value, handleChange, formId, name });

  const inputId = `${formId}-${name}-in`;

  const style = getStyle(sizeRatio);

  return (
    <BoxInputFrame
      inputId={inputId}
      sizeRatio={sizeRatio}
      {...otherProps}
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