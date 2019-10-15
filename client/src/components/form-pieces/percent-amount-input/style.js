import { getFontSize, selectionColor } from '../style';

export default function getStyle(sizeRatio) {
  if (!sizeRatio) sizeRatio = 1;

  const fontSize = getFontSize(sizeRatio);

  const inputWidth = 100;
  const centerGap = 20;
  const displays = {
    display: 'inline-block',
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: `calc(100% - ${inputWidth + centerGap}px)`,
    padding: '.375rem .75rem 0',
    fontSize: '2rem',
    fontWeight: 400,
    lineHeight: 1.5
  };

  return {
    amountDisplay: {
      color: selectionColor,
      ...displays,
      fontSize: getFontSize(sizeRatio * 1.6)
    },
    amountDisplayNegative: {
      color: '#dc3545',
      ...displays,
      fontSize
    },
    input: {
      fontSize,
      display: 'inline-block',
      width: inputWidth,
      color: selectionColor
    },
    control: {
      position: 'relative'
    },
    icon: {
      fontSize,
      right: `calc(100% - ${inputWidth}px)`
    },
    percentDollarDivider: {
      display: 'inline-block',
      marginLeft: 15
    },
    dollarAmountDisplay: {
      display: 'inline-block',
      marginLeft: 15
    }
  }
}