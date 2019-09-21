import { getNameInputStyles } from '../../../billers-input/style';

export default function getStyle(sizeRatio) {
  const nameInputStyles = getNameInputStyles(sizeRatio);

  return {
    ...nameInputStyles,
    divider: {
      margin: '10px 0 5px'
    }
  };
}