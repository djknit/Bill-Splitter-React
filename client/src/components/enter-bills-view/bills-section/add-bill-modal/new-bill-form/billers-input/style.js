import {
  normalWeight,
  sectionSubdividerFirst,
  subsectionContainer
} from '../style';

export default {
  normalWeight,
  sectionSubdividerFirst,
  subsectionContainer
};

function getNameInputStyles(sizeRatio) {
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
    selectInput: { ...selectInput },
    selectInputNoSelection: {
      ...lightGrayText,
      ...selectInput
    },
    option: {
      color: '#363636'
    },
    optionDisabled: {
      ...lightGrayText
    }
  };
}

export { getNameInputStyles };