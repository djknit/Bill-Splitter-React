import DataServiceFactory from '../../../../../../../utilities/data-service-factory';

let isPaid = true;

let dataService = DataServiceFactory({
  readFunction() {
    return isPaid;
  },
  methods: {
    update(value) {
      isPaid = value ? true : false;
    },
    reset() {
      isPaid = true;
    }
  },
  isAsync: false
});

export default dataService;