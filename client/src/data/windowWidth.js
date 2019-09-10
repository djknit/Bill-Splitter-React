import DataServiceFactory from '../utilities/data-service-factory';

let windowWidth;

const service = DataServiceFactory({
  readFunction: () => windowWidth,
  methods: {
    reportChange(newWidth) {
      windowWidth = newWidth;
    }
  },
  isAsync: false
});

export default service;

// export default {
//   get value() {
//     return windowWidth;
//   },
//   subscribe(callback) {
//     emitter.on(
//       changeEventName,
//       callback
//     );
//   },
//   unsub(callback) {
//     emitter.removeListener(
//       changeEventName,
//       callback
//     );
//   },
//   reportChange(newWidth) {
//     windowWidth = newWidth;
//     emitter.emit(changeEventName);
//   } 
// }