import { divider, repeatedRemovableFieldset } from '../style';

export default function getStyle(sizeRatio) {
  if (!sizeRatio) sizeRatio = 1;
  const fontSizeRatio = 1.6 * sizeRatio;

  
  return {
    divider: { ...divider },
    ...repeatedRemovableFieldset,
    remainderDisplay: {
      height: `calc(${sizeRatio}rem + .75em)`,
      fontSize: `${fontSizeRatio}rem`,
      paddingLeft: 30
    }
  };
}