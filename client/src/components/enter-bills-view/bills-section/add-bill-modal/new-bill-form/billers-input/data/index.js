import DataServiceFactory from '../../../../../../../utilities/data-service-factory';
import { generateAmountValueStore } from '../../amount-input/data';
import billerSingleService from '../biller-single-input/data';
import billersMultipleService from '../billers-multiple-inputs/data';

let inputValue = {
  oneOrMoreBillers: 'one',
  billerSingle: billerSingleService.getValue(),
  billersMultiple: billersMultipleService.getValue()
};

billerSingleService.subscribe(value => inputValue.billerSingle = value);
billersMultipleService.subscribe(value => inputValue.billersMultiple = value);

function reset() {
  oneOrMoreBillersService.reset();
  billerSingleService.reset();
  billersMultipleService.reset();
}

let oneOrMoreBillersService = DataServiceFactory({
  readFunction() {
    return inputValue.oneOrMoreBillers
  },
  methods: {
    update(value) {
      console.log(value)
      inputValue.oneOrMoreBillers = value;
    },
    _emit() {console.log('emit billers-input-data')},
    reset() {
      inputValue.oneOrMoreBillers = 'one';
    }
  },
  isAsync: false
});

let billersDataService = DataServiceFactory({
  readFunction() {
    return { ...inputValue };
  },
  methods: {
    reset,
    _emit() {}
  },
  isAsync: false
});

oneOrMoreBillersService.subscribe(() => billersDataService._emit());

export default billersDataService;

export { oneOrMoreBillersService };