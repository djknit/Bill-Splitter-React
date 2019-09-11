import DataServiceFactory from '../../../../../../../utilities/data-service-factory';

let inputValue = '';

let dataService = DataServiceFactory({
  readFunction() {
    return inputValue;
  },
  methods: {
    update(newValue) {
      inputValue = newValue;
    },
    reset() {
      inputValue = '';
    }
  },
  isAsync: false
});

export default dataService;