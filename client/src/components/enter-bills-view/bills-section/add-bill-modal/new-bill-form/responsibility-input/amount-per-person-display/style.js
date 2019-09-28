import { selectionColor, optionColor, getFontSize } from '../../../../../../form-pieces/style';

export default function getStyle(sizeRatio) {
  const div = {
    fontSize: getFontSize(sizeRatio),
    display: 'inline-block',
    verticalAlign: 'bottom'
  }

  return {
    divNoValue: {
      color: optionColor,
      ...div
    },
    divWithValue: {
      color: selectionColor,
      ...div
    },
    value: {
      fontWeight: 500
    }
  };
}