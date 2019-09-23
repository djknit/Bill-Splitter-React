import { DataServiceFactory, AmountValueStoreFactory } from '../../../../../../../utilities';

let inputValue = AmountValueStoreFactory();

let dataService = DataServiceFactory({
  readFunction() {
    return inputValue.get();
  },
  methods: {
    update(newRawValue) {
      inputValue.set(newRawValue);
    },
    reset() {
      inputValue.reset();
    }
  },
  isAsync: false
});

export default dataService;