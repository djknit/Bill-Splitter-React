import { selectionColor, optionColor, getFontSize } from '../../../../../../form-pieces/style';

export default function getStyle(sizeRatio) {
  const fontSize = getFontSize(sizeRatio);

  return {
    divNoValue: {
      color: optionColor,
      fontSize
    },
    divWithValue: {
      color: selectionColor,
      fontSize
    },
    value: {
      fontWeight: 500
    }
  };
}