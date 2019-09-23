import {
  sectionSubdividerFirst,
  subsectionContainer
} from '../style';

import { getMargins, getFontSize } from '../../../../../form-pieces/style';

const { label } = getMargins(true);

export default {
  sectionSubdividerFirst,
  subsectionContainer,
  label
};

function getNameInputStyles(sizeRatio) {

  // const selectInput = {
  //   width: '100%'
  // };
  // const lightGrayText = {
  //   color: '#dbdbdb'
  // };

  return {
    legend: {
      fontSize: getFontSize(sizeRatio),
      ...label
    },
    // selectInputDiv: {
    //   display: 'block'
    // },
    // selectInput: { ...selectInput },
    // selectInputNoSelection: {
    //   ...lightGrayText,
    //   ...selectInput
    // },
    // option: {
    //   color: '#363636'
    // },
    // optionDisabled: {
    //   ...lightGrayText
    // }
  };
}

export { getNameInputStyles };