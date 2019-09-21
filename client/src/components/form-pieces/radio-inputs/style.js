import { getFontSize } from '../style';

export default function(sizeRatio) {

  const label = {
    fontSize: getFontSize(sizeRatio)
  }

  return {
    radioInput: {
      marginRight: 6
    },
    radioLabelNotLast: {
      marginRight: 10,
      ...label
    },
    radioLabelLast: label
  }
};