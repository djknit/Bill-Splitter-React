import { DataServiceFactory, AmountValueStoreFactory } from '../../../../../../../../utilities';
import { participantsService } from '../../../../../../data/entities';
import billAmountService from '../../../bill-amount-input/data';

let inputValues, billTotal, nextInputId;
let remainingAmount = AmountValueStoreFactory();
let participants = [];

let dataService = DataServiceFactory({
  readFunction() {
    return {
      inputValues: inputValues.map(
        ({
          selectedParticipantId,
          inputId,
          amount
        }) => {
          const { method, dollarAmount } = amount;
          return {
            selectedParticipantId,
            inputId,
            options: getOptions(selectedParticipantId),
            amount: {
              method,
              dollarAmount: dollarAmount.get()
            }
          };
        }
      ),
      remainingAmount
    };
  },
  methods: {
    addInput,
    reset,
    updateSelectedParticipant(index, selectedParticipantId) {
      inputValues[index].selectedParticipantId = selectedParticipantId;
    },
    updateAmount(index, propName, value) {
      const amountInput = inputValues[index].amount
      if (propName === 'method') {
        amountInput[propName] = value;
      }
      else {
        amountInput[propName].set(value);
      }
    },
    removeInput(index) {
      inputValues.splice(index, 1);
    }
  },
  isAsync: false
});

getParticipants();
participantsService.subscribe(getParticipants);

getBillTotal();
billAmountService.subscribe(getBillTotal);

reset();

function getOptions(selectedParticipantId) {
  const allSelectedParticipantIds = inputValues.map(input => input.selectedParticipantId);
  return participants.map(
    ({ name, id }) => ({
      name,
      value: id,
      disabled: selectedParticipantId !== id && allSelectedParticipantIds.indexOf(id) !== -1
    })
  );
}

function addInput() {
  inputValues.push({
    selectedParticipantId: null,
    inputId: nextInputId++,
    amount: {
      method: 'dollarAmount',
      dollarAmount: AmountValueStoreFactory(),
      get() {

      },
      set(prop) {

      }
    }
  });
}

function getParticipants() {
  participantsService
    .getValue()
    .then(_participant => {
      participants = _participant;
      dataService._emit();
    });
}

function getBillTotal() {
  billTotal = billAmountService.getValue();
  dataService._emit();
}

function reset() {
  inputValues = [];
  nextInputId = 0;
}

export default dataService;