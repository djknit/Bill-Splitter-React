import React from 'react';
import getStyle from './style';

function BoxInputFrame({
  label,
  sublabel,
  isInline,
  inputId,
  sizeRatio,
  children
}) {

  const style = getStyle(sizeRatio);

  return (
    <div className={`field${isInline ? ' is-horizontal' : ''}`}>
      {
        label && (
          <label
            htmlFor={inputId}
            className="label"
            style={isInline ? style.inlineLabel : style.label}
          >
            {label}
            {sublabel && (
              <span style={style.normalWeight}>
                &nbsp;({sublabel})
              </span>
            )}
          </label>
        )
      }
      <div className="control">
        {children}
      </div>
    </div>
  );
}

export default BoxInputFrame;