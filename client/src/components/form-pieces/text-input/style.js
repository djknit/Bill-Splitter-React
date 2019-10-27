import { getFontSize, selectionColor } from '../style';

export default function(sizeRatio) {
  return {
    input: {
      fontSize: getFontSize(sizeRatio),
      color: selectionColor
    }
  };
};