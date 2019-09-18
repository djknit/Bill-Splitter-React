import { normalWeight } from '../style';

export default function(sizeRatio) {
  if (!sizeRatio) sizeRatio = 1;

  const selectInput = {
    width: '100%'
  };
  const lightGrayText = {
    color: '#dbdbdb'
  };

  console.log({
    legend: {
      fontSize: `${sizeRatio}rem`
    },
    selectInputDiv: {
      display: 'block'
    },
    selectInput,
    selectInputNoSelection: Object({ color: 'graytext' }, selectInput)
  })

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
    optionDisabled: lightGrayText,
    normalWeight,
    inlineLabel: {
      paddingRight: 7
    }
  };
}