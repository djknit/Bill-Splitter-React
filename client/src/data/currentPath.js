// I got the general idea that I am using for this data store from the following source.
// https://codeutopia.net/blog/2016/02/01/react-application-data-flow-where-and-how-to-store-your-data/
// This source also introduced me to the 'events' module and it's usage.

const EventEmitter = require('events');

const emitter = new EventEmitter();

let currentPath = window.location.pathname;

const pathChangeEventName = 'path-change';

export default {
  get value() {
    return currentPath;
  },
  subscribe(callback) {
    emitter.on(
      pathChangeEventName,
      callback
    );
  },
  unsub(callback) {
    emitter.removeListener(
      pathChangeEventName,
      callback
    );
  },
  reportChange(newPath) {
    currentPath = newPath;
    emitter.emit(pathChangeEventName);
  } 
}