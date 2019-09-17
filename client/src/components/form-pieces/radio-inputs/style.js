export default function(sizeRatio) {

  if (!sizeRatio) sizeRatio = 1;
  
  const label = {
    fontSize: `${sizeRatio}rem`
  }

  return {
    radioInput: {
      marginRight: 6
    },
    radioLabelNotLast: Object.assign(
      {
        marginRight: 10
      },
      label
    ),
    radioLabelLast: label
  }
};