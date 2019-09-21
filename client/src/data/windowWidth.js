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