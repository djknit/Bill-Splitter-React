import { DataServiceFactory } from '../../../../../../../utilities';
import { participantsService } from '../../../../../data/entities';
import billAmountService from '../../bill-amount-input';

let participants = [];
getParticipants();
participantsService.subscribe(getParticipants);

function getParticipants() {
  participantsService
    .getValue()
    .then(_participants => {
      participants = _participants;
      dataService._emit();
    });
}

let billTotal = billAmountService.getValue().rounded;
billAmountService.subscribe(function getBillTotal() {
  billTotal = billAmountService.getValue().rounded;
});

let inputValue, nextSomeEvenlyInputId, nextIndividuallyInputId;
reset();

function reset() {
  nextSomeEvenlyInputId = 0;
  nextIndividuallyInputId = 0;
  inputValue = {
    splittingMethod: 'evenlyBetweenAll'
  }
}

let dataService = DataServiceFactory({
  readFunction() {
    return Object.assign({}, inputValue);
  },
  methods: {
    update() {
      
    }
  },
  isAsync: false
});