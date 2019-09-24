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
    splittingMethod: 'allEvenly',
    allEvenlyAmountPerPerson: AmountValueStoreFactory()
  }
}

let splittingMethodAndAllEvenlyAmountService = DataServiceFactory({
  readFunction() {
    return {
      splittingMethod: inputValue.splittingMethod,
      allEvenlyAmountPerPerson: inputValue.allEvenlyAmountPerPerson.get(),
      numberOfParticipants: participants.length
    };
  },
  methods: {
    updateSplittingMethod(value) {
      inputValue.splittingMethod = value;
    },
    updateAllEvenlyAmountPerPerson() {
      const billAmountValue = billAmountService.getValue()
      const billTotal = billAmountValue.rounded;
      if (billTotal !== null) {
        inputValue.allEvenlyAmountPerPerson.set(billTotal / participants.length);
      }
      else {
        inputValue.allEvenlyAmountPerPerson.set(billAmountValue.raw);
      }
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