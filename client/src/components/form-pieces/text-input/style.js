export default function(sizeRatio) {
  if (!sizeRatio) sizeRatio = 1;

  return {
    input: {
      fontSize: `${sizeRatio}rem`
    }
  };
};