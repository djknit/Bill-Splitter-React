import { divider } from '../style';


export default function getStyle(sizeRatio) {

  return {
    divider: {
      ...divider
    },
    fieldset: {
      position: 'relative'
    },
    removeBtn: {
      position: 'absolute',
      top: 0,
      right: 0,
      padding: '0 5px',
      fontSize: '.65rem'
    }
  };
}