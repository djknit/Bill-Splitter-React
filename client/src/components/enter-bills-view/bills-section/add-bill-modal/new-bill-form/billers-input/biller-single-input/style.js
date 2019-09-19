export default function(sizeRatio) {
  if (!sizeRatio) sizeRatio = 1;

  const selectInput = {
    width: '100%'
  };
  const lightGrayText = {
    color: '#dbdbdb'
  };

  return {
    legend: {
      fontSize: `${sizeRatio}rem`
    },
    selectInputDiv: {
      display: 'block'
    },
    selectInput,
    selectInputNoSelection: Object.assign({}, lightGrayText, selectInput),
    option: {
      color: '#363636'
    },
    optionDisabled: lightGrayText
  };
}