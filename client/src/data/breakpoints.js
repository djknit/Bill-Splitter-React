import windowWidth from './windowWidth';

// breakpoint value contains lower bound for screenwidth range and the horizontal padding that should be applied to top level components when screenwidth is in selected range
function Breakpoint(minScreenWidth, recommendedXPadding) {
  return {
    minWidth: minScreenWidth,
    xPadding: recommendedXPadding
  };
}

// using Bulma breakpoints
let breakpoints = {
  fullhd: Breakpoint(1408),
  widescreen: Breakpoint(1216),
  desktop: Breakpoint(1024, 20),
  tablet: Breakpoint(769, 10),
  mobile: Breakpoint(0, 5),
  current: undefined
}

export default Object.assign({}, breakpoints);

//////////////////////////////////////////////////
// Bulma Breakpoints
// --------------------
// 'fullhd': w >= 1408px
// 'widescreen': 1216px <= w < 1408px
// 'desktop': 1024px <= w < 1216px
// 'tablet': 769px <= w < 1024px
// 'mobile': w < 769px