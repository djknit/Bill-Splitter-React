import breakpoints from '../../data/breakpoints';
import brandFont from '../../styles/brandFont';

function viewPadding(horizontalPaddingValue) {
  return `0 ${horizontalPaddingValue}px`;
}

export default function(windowWidth) {

  let navPadding;
  if (!windowWidth || windowWidth >= breakpoints.desktop.minWidth) {
    navPadding = viewPadding(breakpoints.desktop.xPadding);
  }
  else if (windowWidth >= breakpoints.tablet.minWidth) {
    navPadding = viewPadding(breakpoints.tablet.xPadding);
  }
  else {
    navPadding = viewPadding(breakpoints.mobile.xPadding);
  }

  return {
    nav: {
      padding: navPadding,
      borderBottom: 'solid 1px black',
      boxShadow: '0 1px 3px 1px #555555'
    },
    brand: Object.assign(
      {
        fontSize: 24
      },
      brandFont
    ),
    dollarSign: {
      color: '#216C2A', // "Money Green" - source: https://www.colourlovers.com/color/216C2A/money_green
      fontSize: 36,
      position: 'relative',
      top: 4
    }
  };
}