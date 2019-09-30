import { DataServiceFactory, AmountValueStoreFactory } from '../../../../../../../utilities';

let inputValue = AmountValueStoreFactory();

let dataService = DataServiceFactory({
  readFunction() {
    console.log(inputValue.get())
    return inputValue.get();
  },
  methods: {
    update(newRawValue) {
      console.log(newRawValue)
      inputValue.set(newRawValue);
    },
    reset() {
      inputValue.reset();
    }
  },
  isAsync: false
});

export default dataService;