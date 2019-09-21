import { getFontSize, getMargins } from '../style';

export default function(sizeRatio, hasSmallMargins, isLastChild) {

  const { field, label } = getMargins(hasSmallMargins, isLastChild);

  return {
    field: {
      ...field
    },
    normalWeight: {
      fontWeight: 'normal'
    },
    label: {
      fontSize: getFontSize(sizeRatio),
      ...label
    },
    fieldLabel: {
      flexGrow: 0,
      marginRight: 10
    }
  };
}