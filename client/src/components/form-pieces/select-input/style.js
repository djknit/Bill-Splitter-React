export default function(sizeRatio) {
  if (!sizeRatio) sizeRatio = 1;

  const fontSize = {
    fontSize: `${sizeRatio}rem`
  };
  const selectInput = {
    width: '100%',
    ...fontSize
  };
  const lightGrayText = {
    color: '#dbdbdb'
  };

  return {
    selectInputDiv: {
      display: 'block',
      ...fontSize
    },
    selectInput,
    selectInputNoSelection: {
      ...lightGrayText,
      ...selectInput
    },
    option: {
      color: '#363636',
      ...fontSize
    },
    optionDisabled: {
      ...lightGrayText,
      ...fontSize
    }
  };
}