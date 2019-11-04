import DataServiceFactory from '../../../../../../../utilities/data-service-factory';
import billerSingleService from '../biller-single-input/data';
import billersMultipleService from '../billers-multiple-inputs/data';

let inputValue = {
  oneOrMoreBillers: 'one',
  billerSingle: billerSingleService.getValue(),
  billersMultiple: billersMultipleService.getValue()
};

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
    reset
  },
  isAsync: false,
  validateFunction() {
    console.log(inputValue.oneOrMoreBillers === 'one' ?
    billerSingleService.getProblems() : billersMultipleService.getProblems());
    return inputValue.oneOrMoreBillers === 'one' ?
      billerSingleService.getProblems() : billersMultipleService.getProblems();
  }
});

oneOrMoreBillersService.subscribe(() => billersDataService._emit());

export default billersDataService;

export { oneOrMoreBillersService };

billerSingleService.subscribe(function() {
  inputValue.billerSingle = billerSingleService.getValue();
  billersDataService._emit();
});
billersMultipleService.subscribe(function() {
  inputValue.billersMultiple = billersMultipleService.getValue();
  billersDataService._emit();
});