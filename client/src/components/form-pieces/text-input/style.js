import { getFontSize } from '../style';

export default function(sizeRatio) {
  return {
    input: {
      fontSize: getFontSize(sizeRatio)
    }
  };
};