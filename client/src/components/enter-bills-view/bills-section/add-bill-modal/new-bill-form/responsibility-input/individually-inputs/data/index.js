import { DataServiceFactory, AmountValueStoreFactory, AmountValueFactory }
  from '../../../../../../../../utilities';
import { participantsService } from '../../../../../../data/entities';
import billAmountService from '../../../bill-amount-input/data';

let inputValues, billTotal, nextInputId;
let participants = [];

let dataService = DataServiceFactory({
  readFunction: readInputValues,
  methods: {
    addInput,
    reset,
    updateSelectedParticipantId(index, selectedParticipantId) {
      inputValues[index].selectedParticipantId = parseInt(selectedParticipantId);
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

// BEGIN READ FUNCTION -----------------------
function readInputValues() {
  if (!billTotal) billTotal = AmountValueFactory(null);
  let roundedBillTotal = billTotal.rounded;
  if (roundedBillTotal === null && billTotal.display === 'negative') {
    roundedBillTotal = -1;
  }
  let totalAmountAssigned = 0;
  let indexesToAssignRemainder = [];

  let result = {
    inputValues: inputValues.map(
      (
        {
          selectedParticipantId,
          inputId,
          amount
        },
        index
      ) => {
        const {
          method, dollarAmount, percent, determinedAmount, percentDollarAmountValue
        } = amount;
        let processedAmount = { method };
        totalAmountAssigned += determinedAmount;
        if (method === 'remainder') {
          indexesToAssignRemainder.push(index);
        }
        else if (method === 'dollarAmount') {
          processedAmount.dollarAmount = dollarAmount.get();
        }
        else { // method === 'percent'
          processedAmount.percent = percent.get();
          processedAmount.dollarAmount = percentDollarAmountValue;
        }
        return {
          selectedParticipantId,
          inputId,
          options: getOptions(selectedParticipantId),
          amount: processedAmount
        };
      }
    ),
    billTotal: {
      ...billTotal
    },
    remainderMethodSelectionIndexes: indexesToAssignRemainder,
    isAddPButtonDisabled: participants.length <= inputValues.length
  };

  if (indexesToAssignRemainder.length === 0) {
    result.unassignedAmount = AmountValueFactory(
      roundedBillTotal === null ? null : roundedBillTotal - totalAmountAssigned
    );
  }
  else if (indexesToAssignRemainder.length === 1) {
    const targetAmountInput = result.inputValues[indexesToAssignRemainder[0]].amount;
    if (roundedBillTotal === null || roundedBillTotal < 0) {
      targetAmountInput.dollarAmount = AmountValueFactory(null);
      targetAmountInput.problem = roundedBillTotal === null ? 'no total' : 'bad total';
      result.unassignedAmount = AmountValueFactory(null);
    }
    else {
      const remainder = AmountValueFactory(roundedBillTotal - totalAmountAssigned);
      targetAmountInput.dollarAmount = { ...remainder };
      result.unassignedAmount = AmountValueFactory(0);
    }
  }
  else { // indexesToAssignRemainder.length > 1
    indexesToAssignRemainder.forEach(inputIndex => {
      const targetAmountInput = result.inputValues[inputIndex].amount;
      targetAmountInput.dollarAmount = AmountValueFactory(null);
      targetAmountInput.problem = 'multiple remainders';
      result.unassignedAmount = AmountValueFactory(null);
    });
  }
  console.log(result)
  return result;
};
// END READ FUNCTION -------------------------

function addInput() {
  inputValues.push({
    selectedParticipantId: null,
    inputId: nextInputId++,
    amount: {
      method: 'dollarAmount',
      dollarAmount: AmountValueStoreFactory(),
      percent: AmountValueStoreFactory('percent'),
      get percentDollarAmountValue() {
        const roundedPercent = this.percent.get().rounded;
        const roundedBillTotal = (billTotal && billTotal.rounded) || null;
        if (roundedBillTotal === null || roundedPercent === null) {
          return AmountValueFactory(null);
        }
        else return AmountValueFactory(roundedBillTotal * roundedPercent / 100);
      },
      get determinedAmount() {
        if (this.method === 'remainder') return 0;
        else if (this.method === 'dollarAmount') {
          return this.dollarAmount.get().rounded || 0;
        }
        else { // then method === 'percent'
          return this.percentDollarAmountValue.rounded || 0;
        }
      }
    }
  });
}

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
  addInput();
}

export default dataService;