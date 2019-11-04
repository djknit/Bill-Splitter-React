import { DataServiceFactory } from '../../../../../../../utilities';
import splittingMethodAndAllEvenlyAmountService from './responsibility-component';
import someEvenlyService from '../some-evenly-inputs/data';
import individuallyService from '../individually-inputs/data';

let responsibilityService = DataServiceFactory({
  readFunction() {
    const {
      splittingMethod,
      allEvenlyAmountPerPerson
    } = splittingMethodAndAllEvenlyAmountService.getValue();
    return {
      splittingMethod,
      someEvenly: someEvenlyService.getValue(),
      individually: individuallyService.getValue(),
      allEvenlyAmountPerPerson
    };
  },
  methods: {
    reset() {
      splittingMethodAndAllEvenlyAmountService.reset();
      someEvenlyService.reset();
      individuallyService.reset();
    }
  },
  isAsync: false,
  validateFunction() {
    const { splittingMethod } = splittingMethodAndAllEvenlyAmountService.getValue();
    console.log('VALIDATE responsibility');
    console.log(this);
    console.log(splittingMethod);
    console.log('\n\n\n. . . . . . . . . . 000000\n\n\n')
    if (splittingMethod === 'allEvenly') return null;
    return splittingMethod === 'someEvenly' ?
      someEvenlyService.getProblems() : individuallyService.getProblems();
  }
});

splittingMethodAndAllEvenlyAmountService.subscribe(responsibilityService._emit);
someEvenlyService.subscribe(responsibilityService._emit);
individuallyService.subscribe(responsibilityService._emit);

export default responsibilityService;

export {
  splittingMethodAndAllEvenlyAmountService,
  someEvenlyService,
  individuallyService
};