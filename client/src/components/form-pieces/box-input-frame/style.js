import { getFontSize } from '../style';

export default function(sizeRatio) {
  return {
    normalWeight: {
      fontWeight: 'normal'
    },
    label: {
      fontSize: getFontSize(sizeRatio)
    },
    fieldLabel: {
      flexGrow: 0,
      marginRight: 10
    }
  };
}