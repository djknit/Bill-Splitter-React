import { notificationTitle } from '../../../modal-skeleton/style';

const divider = {
  marginTop: 7,
  marginBottom: 4
}

// styles for this component (NewBillForm)
export default {
  notificationTitle,
  divider
};

const subsectionIndent = 15;

// for <hr> that divides radio field from other fields in section (for billers and responsible participants sections)
const sectionSubdividerFirst = {
  ...divider,
  marginLeft: subsectionIndent
}

// for fields appearing in section below the <hr> mentioned in style-rule preceding this style-rule
const subsectionContainer = {
  padding: `0 0 0 ${subsectionIndent}px`
}

const repeatedRemovableFieldset = {
  fieldset: {
    position: 'relative'
  },
  removeBtn: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: '0 5px',
    fontSize: '.55rem'
  }
}

export {
  sectionSubdividerFirst,
  divider,
  subsectionContainer,
  repeatedRemovableFieldset
};