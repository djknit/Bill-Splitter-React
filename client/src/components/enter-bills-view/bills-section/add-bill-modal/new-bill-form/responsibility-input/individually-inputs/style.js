import { divider, repeatedRemovableFieldset } from '../style';

export default function getStyle(sizeRatio) {
  if (!sizeRatio) sizeRatio = 1;
  const error = {
    marginLeft: 10,
    display: 'inline-block'
  };
  const dangerColor = '#dc3545';

  return {
    divider: {
      ...divider
    },
    addInputBtn: {
      padding: '2px 7px',
      fontSize: `${sizeRatio}rem`
    },
    btnPlus: {
      fontWeight: 'bold'
    },
    error: {
      color: dangerColor,
      ...error
    },
    errorZero: {
      color: '#23d160',
      ...error
    },
    errorStrong: {
      color: dangerColor
    }
  };
}

export { divider, repeatedRemovableFieldset };