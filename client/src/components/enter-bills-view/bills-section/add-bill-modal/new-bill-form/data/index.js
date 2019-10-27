import DataServiceFactory from '../../../../../../utilities/data-service-factory';
import nameDataService from '../name-input/data';
import amountService from '../bill-amount-input/data';
import billersService from '../billers-input/data';
import responsibilityService from '../responsibility-input/data';
import isPaidService from '../is-paid-input/data';
import billsListService from '../../../../data/billsList';

let formData = {
  inputValues: {
    name: nameDataService.getValue(),
    amount: amountService.getValue(),
    billers: billersService.getValue(),
    responsibility: responsibilityService.getValue(),
    isPaid: isPaidService.getValue()
  },
  hasSuccess: false,
  hasProblem: false
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
      formData.hasSuccess = false;
      formData.hasProblem = false;
      return null;
    },
    submit() {
      console.log('submit bill <><><>');
      console.log('. '.repeat(15));
      console.log(formData);
      console.log('- '.repeat(15));

      const problems = getProblems();
console.log(problems)
      if (problems !== null) {
        formData.hasProblem = true;
        formData.hasSuccess = false;
        return { success: false, problems };
      }
      const bill = createBill();
      billsListService.add({
        bill,
        formData
      });
      console.log(billsListService.getValue());
    }
  },
  isAsync: false
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

function getProblems() {
  let fail = false;
  console.log('-'.repeat(30) + '\nvalidate form\n' + '-'.repeat(30));
  const amountProblem = amountService.getProblems();
  console.log(amountProblem);
  if (amountProblem !== null) fail = true;
  const billersProblems = billersService.getProblems();
  if (billersProblems !== null) fail = true;
  const responsibilityProblems = responsibilityService.getProblems();
  if (responsibilityProblems !== null) fail = true;
  const isPaidProblems = isPaidService.getProblems();
  if (isPaidProblems !== null) fail = true;
  if (fail === false) return null;
  return {
    amount: amountProblem,
    billers: billersProblems,
    responsibility: responsibilityProblems,
    isPaid: isPaidProblems
  };
}

function createBill() {
  return {

  };
}