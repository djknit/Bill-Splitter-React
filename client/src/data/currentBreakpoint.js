import breakpoints from './breakpoints';
import windowWidth from './windowWidth';

const EventEmitter = require('events');
const emitter = new EventEmitter();
const changeEventName = 'change';

const breakpointNamesWidestDown = [
  'fullhd',
  'widescreen',
  'desktop',
  'tablet',
  'mobile'
];

function determineBreakpointName(screenwidth) {
  if (!screenwidth) {
    return breakpointNamesWidestDown[0];
  }
  for (let i = 0; i < breakpointNamesWidestDown.length; i++) {
    const breakpointName = breakpointNamesWidestDown[i];
    const breakpoint = breakpoints[breakpointName];
    if (screenwidth >= breakpoint.minwidth) return breakpointName;
  }
}

let currentBreakpointName;

function setCurrentBreakpoint() {
  currentBreakpointName = determineBreakpointName(windowWidth.value);
}

setCurrentBreakpoint();

windowWidth.subscribe(setCurrentBreakpoint);