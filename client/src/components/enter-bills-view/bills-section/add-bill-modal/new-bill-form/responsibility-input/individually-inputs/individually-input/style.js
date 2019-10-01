import { divider, repeatedRemovableFieldset } from '../style';

export default function getStyle(sizeRatio) {
  
  return {
    divider: { ...divider },
    ...repeatedRemovableFieldset
  };
}