import { getNameInputStyles } from '../../../billers-input/style';
import { relative } from 'path';

export default function getStyle(sizeRatio) {
  const nameInputStyles = getNameInputStyles(sizeRatio);

  return {
    ...nameInputStyles,
    divider: {
      margin: '10px 0 5px'
    },
    fieldset: {
      position: 'relative'
    },
    removeBtn: {
      position: 'absolute',
      top: 0,
      right: 0,
      padding: '0 5px',
      fontSize: '.65rem'
    }
  };
}