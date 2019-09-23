// This file is only responsible for the data used by the main ResponsibilityInput component
// (Not responsible for data used by child components)

import { DataServiceFactory, AmountValueStoreFactory } from '../../../../../../../utilities';
import { participantsService } from '../../../../../data/entities';
import billAmountService from '../../bill-amount-input/data';

let inputValue;
let participants = [];
reset();

function reset() {
  inputValue = {
    splittingMethod: 'evenlyBetweenAll',
    allEvenlyAmountPerPerson: AmountValueStoreFactory()
  }
}

let splittingMethodAndAllEvenlyAmountService = DataServiceFactory({
  readFunction() {
    return { ...inputValue };
  },
  methods: {
    updateSplittingMethod(value) {
      inputValue.splittingMethod = value;
    },
    updateAllEvenlyAmountPerPerson() {
      const billTotal = billAmountService.getValue().rounded;
      inputValue.allEvenlyAmountPerPerson.set(billTotal / participants.length);
    }
  },
  isAsync: false
});

getParticipants();
participantsService.subscribe(getParticipants);

function getParticipants() {
  participantsService
    .getValue()
    .then(_participants => {
      participants = _participants;
      splittingMethodAndAllEvenlyAmountService.updateAllEvenlyAmountPerPerson();
    });
}

billAmountService.subscribe(splittingMethodAndAllEvenlyAmountService.updateAllEvenlyAmountPerPerson);

export default splittingMethodAndAllEvenlyAmountService;