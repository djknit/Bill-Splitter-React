export default function(sizeRatio) {
  if (!sizeRatio) sizeRatio = 1;

  return {
    legend: {
      fontSize: `${sizeRatio}rem`
    }
  };
}