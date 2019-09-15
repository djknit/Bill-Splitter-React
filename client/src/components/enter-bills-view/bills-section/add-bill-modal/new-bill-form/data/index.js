import DataServiceFactory from '../../../../../../utilities/data-service-factory';
import nameData from '../name-input/data';
import amountService from '../amount-input/data';

let inputData = {
  name: nameData.getValue(),
  amount: amountService.getValue()
};

nameData.subscribe(() => inputData.name = nameData.getValue());
amountService.subscribe(() => inputData.amount = amountService.getValue());

const dataService = DataServiceFactory({
  readFunction() {
    return Object.assign({}, formData);
  },
  methods: {
    reset() {
      nameData.reset();
      amountService.reset();
    },
    submit() {
      
    }
  },
  isAsync: true
});