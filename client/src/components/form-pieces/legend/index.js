import React from 'react';
import getStyle from './style';

function Legend({
  label,
  sublabel,
  sizeRatio,
  hasSmallMargins
}) {

  const style = getStyle(sizeRatio, hasSmallMargins);

  return (
    <legend className="label" style={style.label}>
      {label}
      {
        sublabel && (
          <span style={style.subLabel}>
            &nbsp;({sublabel})
          </span>
        )
      }
    </legend>
  );
}

export default Legend;