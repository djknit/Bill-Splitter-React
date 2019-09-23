import { DataServiceFactory, AmountValueStoreFactory } from '../../../../../../../utilities';
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
  isAsync: false
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