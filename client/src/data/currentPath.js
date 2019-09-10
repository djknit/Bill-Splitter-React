import DataServiceFactory from '../utilities/data-service-factory';

let currentPath = window.location.pathname;

let service = DataServiceFactory({
  readFunction: () => currentPath,
  methods: {
    reportChange(newPath) {
      currentPath = newPath;
    }
  },
  isAsync: false
});

export default service;

console.log(service);

// export default {
//   get value() {
//     return currentPath;
//   },
//   subscribe(callback) {
//     emitter.on(
//       pathChangeEventName,
//       callback
//     );
//   },
//   unsub(callback) {
//     emitter.removeListener(
//       pathChangeEventName,
//       callback
//     );
//   },
//   reportChange(newPath) {
//     currentPath = newPath;
//     emitter.emit(pathChangeEventName);
//   }
// }