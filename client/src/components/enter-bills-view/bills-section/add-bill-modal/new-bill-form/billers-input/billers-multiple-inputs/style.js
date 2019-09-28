import { divider, repeatedRemovableFieldset } from '../style';

export default function getStyle(sizeRatio) {
  if (!sizeRatio) sizeRatio = 1;

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
    }
  };
}

export { divider, repeatedRemovableFieldset };