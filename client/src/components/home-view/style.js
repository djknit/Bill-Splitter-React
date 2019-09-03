import viewStyle from '../../styles/view';

export default function(windowWidth) {
  return {
    view: viewStyle(windowWidth).wholeView,
    enterBillsButton: {
      marginTop: 15
    }
  };
}