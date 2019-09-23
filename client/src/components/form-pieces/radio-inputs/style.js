import { getFontSize, getMargins, selectionColor } from '../style';

export default function(sizeRatio, hasSmallMargins, isLastChild) {

  const { field } = getMargins(hasSmallMargins, isLastChild);

  const label = {
    fontSize: getFontSize(sizeRatio),
  };
  const inlineNotLast = {
    marginRight: 10
  };
  const selected = {
    color: selectionColor
  };

  return {
    field: {
      ...field
    },
    radioInput: {
      marginRight: 6
    },
    radioLabel: {
      ...label
    },
    labelInlineNotLast: {
      ...label,
      ...inlineNotLast
    },
    labelSelected: {
      ...label,
      ...selected
    },
    labelInlineNotLastSelected: {
      ...label,
      ...inlineNotLast,
      ...selected
    }
  }
};