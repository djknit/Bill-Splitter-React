import React from 'react';
import getStyle from './style';

function BoxInputFrame({
  label,
  sublabel,
  isInline,
  inputId,
  sizeRatio,
  children,
  hasIcon,
  controlStyle,
  hasSmallMargins,
  isLastChild
}) {

  // no need for inline when there is no label
  if (label === undefined) isInline = false;

  const style = getStyle(sizeRatio, hasSmallMargins, isLastChild);

  function Label() {
    return label ? (
      <label
        htmlFor={inputId}
        className="label"
        style={style.label}
      >
        {label}
        {sublabel && (
          <span style={style.normalWeight}>
            &nbsp;({sublabel})
          </span>
        )}
      </label>
    ) : (
      <></>
    )
  };

  return isInline ?
    (
      <div className="field is-horizontal" style={style.field}>
        <div className="field-label is-normal" style={style.fieldLabel}>
          <Label />
        </div>
        <div className="field-body">
          <div className="field">
            <Control isInline hasIcon={hasIcon} style={controlStyle}>
              {children}
            </Control>
          </div>
        </div>
      </div>
    ) :
    (
      <div className="field" style={style.field}>
        <Label />
        <Control hasIcon={hasIcon} style={controlStyle}>
          {children}
        </Control>
      </div>
    );
}

export default BoxInputFrame;

function Control({ isInline, hasIcon, children, style }) {
  let className = 'control';
  if (isInline) className += ' is-expanded';
  if (hasIcon) className += ' has-icons-left'

  return (
    <div
      className={className}
      style={style}
    >
      {children}
    </div>
  );
}