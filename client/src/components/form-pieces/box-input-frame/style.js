export default function(sizeRatio) {
  if (!sizeRatio) sizeRatio = 1;

  const label = {
    fontSize: `${sizeRatio}rem`
  };

  return {
    normalWeight: {
      fontWeight: 'normal'
    },
    label,
    inlineLabel: Object.assign(
      {
        paddingRight: 7
      },
      label
    )
  };
}