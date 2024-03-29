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