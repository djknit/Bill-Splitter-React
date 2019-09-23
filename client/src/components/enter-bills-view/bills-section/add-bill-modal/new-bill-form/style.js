import { notificationTitle } from '../../../modal-skeleton/style';

const divider = {
  margin: '8px 0'
}

// styles for this component (NewBillForm)
export default {
  notificationTitle,
  divider
};

// for <hr> that divides radio field from other fields in section (for billers and responsible participants sections)
const sectionSubdividerFirst = {
  margin: '5px 0 5px 15px'
}

// for fields appearing in section below the <hr> mentioned in style-rule preceding this style-rule
const subsectionContainer = {
  padding: '0 0 0 15px'
}

export {
  sectionSubdividerFirst,
  divider,
  subsectionContainer
};