import DataServiceFactory from '../../../../../../utilities/data-service-factory';
import nameDataService from '../name-input/data';
import amountService from '../bill-amount-input/data';
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
    console.log({...formData});
    return { ...formData };
  },
  methods: {
    reset() {
      nameDataService.reset();
      amountService.reset();
      billersService.reset();
      responsibilityService.reset();
      isPaidService.reset();
    },
    submit() {
      
    }
  },
  isAsync: true
});

nameDataService.subscribe(() => {
  formData.name = nameDataService.getValue();
  // console.log({...formData})
  dataService._emit();
});
amountService.subscribe(() => {
  formData.amount = amountService.getValue();
  // console.log({...formData})
  dataService._emit();
});
billersService.subscribe(() => {
  formData.billers = billersService.getValue();
  // console.log({...formData})
  dataService._emit();
});
responsibilityService.subscribe(() => {
  formData.responsibility = responsibilityService.getValue();
  // console.log({...formData})
  dataService._emit();
});
isPaidService.subscribe(() => {
  formData.isPaid = isPaidService.getValue();
  // console.log({...formData})
  dataService._emit();
});

export default dataService;