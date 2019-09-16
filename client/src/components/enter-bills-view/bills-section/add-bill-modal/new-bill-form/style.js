import { notificationTitle } from '../../../modal-skeleton/style';

// styles for this component (NewBillForm)
export default {
  notificationTitle,
  divider: {
    margin: '10px 0'
  }
};

// Styles used by multiple child components
const normalWeight = {
  fontWeight: 'normal'
};

// for <hr> that divides radio field from other fields in section (for billers and responsible participants sections)
const sectionSubdividerFirst = {
  margin: '5px 0 5px 15px'
}

export {
  normalWeight,
  sectionSubdividerFirst
};