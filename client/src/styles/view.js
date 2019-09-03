import breakpoints from '../data/breakpoints';

export default function(windowWidth) {
  let padding;
  if (!windowWidth || windowWidth >= breakpoints.desktop.minWidth) {
    padding = `calc(${breakpoints.desktop.xPadding}px + .75rem)`;
  }
  else if (windowWidth >= breakpoints.tablet.minWidth) {
    padding = `calc(${breakpoints.tablet.xPadding}px + .75rem)`;
  }
  else {
    padding = `calc(${breakpoints.mobile.xPadding}px + .75rem)`;
  }

  return {
    wholeView: {
      padding
    }
  };
}