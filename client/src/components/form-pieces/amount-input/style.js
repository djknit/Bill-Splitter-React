import { getFontSize } from '../style';

export default function getStyle(sizeRatio) {
  if (!sizeRatio) sizeRatio = 1;

  const fontSize = getFontSize(sizeRatio);

  const displays = {
    display: 'inline-block',
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: '50%',
    padding: '.375rem .75rem 0',
    fontSize: '2rem',
    fontWeight: 400,
    lineHeight: 1.5,
    fontSize
  };
  
  return {
    amountDisplay: {
      color: '#495057',
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
      width: 'calc(50% - 20px)'
    },
    control: {
      position: 'relative'
    },
    icon: {
      fontSize
    }
  }
}