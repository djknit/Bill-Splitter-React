import { getFontSize, getMargins } from '../style';

export default function(sizeRatio, hasSmallMargins, isLastChild) {

  const { field } = getMargins(hasSmallMargins, isLastChild);

  const label = {
    fontSize: getFontSize(sizeRatio),
  }

  return {
    field: {
      ...field
    },
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