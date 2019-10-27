import { getFontSize, getMargins, normalWeight } from '../style';

export default function getStyle(sizeRatio, hasSmallMargins) {

  const fontSize = getFontSize(sizeRatio);

  const { label } = getMargins(hasSmallMargins);

  return {
    label: {
      fontSize,
      ...label
    },
    subLabel: {
      fontSize,
      ...normalWeight
    }
  };
}