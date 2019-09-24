import DataServiceFactory from '../../../../../../utilities/data-service-factory';
import nameDataService from '../name-input/data';
import amountService from '../amount-input/data';
import billersService from '../billers-input/data';
import responsibilityService from '../responsibility-input/data';
import isPaidService from '../is-paid-input/data';

let formData = {
  name: nameDataService.getValue(),
  amount: amountService.getValue(),
  billers: billersService.getValue(),
  responsibility: responsibilityService.getValue(),
  isPaid: isPaidService.getValue()
};

const dataService = DataServiceFactory({
  readFunction() {
    return { ...formData };
  },
  methods: {
    reset() {
      nameDataService.reset();
      amountService.reset();
      billersService.reset();
      responsibilityService.reset();
      isPaid.reset();
    },
    submit() {
      
    }
  },
  isAsync: true
});

nameDataService.subscribe(() => {
  inputData.name = nameDataService.getValue();
  dataService._emit();
});
amountService.subscribe(() => {
  inputData.amount = amountService.getValue();
  dataService._emit();
});
billersService.subscribe(() => {
  inputData.billers = billersService.getValue();
  dataService._emit();
});
responsibilityService.subscribe(() => {
  inputData.responsibility = responsibilityService.getValue();
  dataService._emit();
});
isPaidService.subscribe(() => {
  inputData.isPaid = isPaidService.getValue();
  dataService._emit();
});