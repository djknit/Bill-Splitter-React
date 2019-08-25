// I got the general idea that I am using for this data store from the following source.
// https://codeutopia.net/blog/2016/02/01/react-application-data-flow-where-and-how-to-store-your-data/
// This source also introduced me to the 'events' module and it's usage.

const EventEmitter = require('events');

const emitter = new EventEmitter();

let windowWidth;

const changeEventName = 'width-change';

export default {
  get value() {
    return windowWidth;
  },
  subscribe(callback) {
    emitter.on(
      changeEventName,
      callback
    );
  },
  unsub(callback) {
    emitter.removeListener(
      changeEventName,
      callback
    );
  },
  reportChange(newWidth) {
    windowWidth = newWidth;
    emitter.emit(changeEventName);
  } 
}