import { getFontSize, getMargins, normalWeight } from '../style';

export default function(sizeRatio, hasSmallMargins, isLastChild) {

  const { field, label } = getMargins(hasSmallMargins, isLastChild);

  return {
    field: {
      ...field
    },
    normalWeight: {
      ...normalWeight
    },
    label: {
      fontSize: getFontSize(sizeRatio),
      ...label
    },
    fieldLabel: {
      flexGrow: 0,
      marginRight: 10,
      ...label
    }
  };
}