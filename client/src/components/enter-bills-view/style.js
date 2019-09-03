import viewStyle from '../../styles/view';
import brandFont from '../../styles/brandFont';

export default function(windowWidth) {
  const viewPaddingX = viewStyle(windowWidth).wholeView.padding;

  return {
    view: {
      paddingLeft: viewPaddingX,
      paddingRight: viewPaddingX,
      paddingTop: 6,
      paddingBottom: 20
    },
    mainHeading: Object.assign(
      {
        fontSize: '2.5rem',
        textAlign: 'center'
      },
      brandFont
    ),
    firstHr: {
      margin: '5px 0 15px'
    },
    shadow: {
      boxShadow: '0 0 3px 1px #555555'
    },
    messageHeading: {
      fontSize: '1.1rem',
      fontWeight: 600
    },
    messageHr: {
      margin: '10px 0'
    },
    instructionsList: {
      marginLeft: 15
    },
    instructionsListItemNotLast: {
      marginBottom: 5
    },
    calcBillsButton: {
      // float: 'right'
    },
    lastHr: {
      margin: '0 0 15px'
    }
  };
};