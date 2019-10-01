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

function readInputValues() {
  if (!billTotal) billTotal = AmountValueFactory(null);
  let roundedBillTotal = billTotal.rounded;
  if (roundedBillTotal === null && billTotal.display === 'negative') {
    roundedBillTotal = -1;
  }
  let totalAmountAssigned = 0;
  let indexesToAssignRemainder = [];

  let result = {
    inputValues: inputValues.map((
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
      let returnValue = {
        selectedParticipantId,
        inputId,
        options: getOptions(selectedParticipantId),
        amount: {
          method
        }
      };
      totalAmountAssigned += determinedAmount;
      if (method === 'remainder') {
        indexesToAssignRemainder.push(index);
      }
      else if (method === 'dollarAmount') {
        returnValue.amount.dollarAmount = dollarAmount.get();
      }
      else { // method === 'percent'
        returnValue.percent = percent.get();
        returnValue.amount.dollarAmount = percentDollarAmountValue;
      }
      return returnValue;
    }),
    billTotal: {
      ...billTotal
    },
    indexesOfInputsHavingSelectedRemainderMethod: indexesToAssignRemainder,
    hasMultipleRemainderSelections: indexesToAssignRemainder.length,
    isAddPButtonDisabled: participants.length <= inputValues.length
  };
  if (indexesToAssignRemainder.length === 0) {
    result.unassignedAmount = AmountValueFactory(
      roundedBillTotal === null ? null : roundedBillTotal - totalAmountAssigned
    );
  }
  else if (indexesToAssignRemainder.length === 1) {
    const targetAmountValue = result.inputValues[indexesToAssignRemainder[0]].amount;
    if (roundedBillTotal === null) {
      targetAmountValue.dollarAmount = { ...billTotal };
      result.unassignedAmount = AmountValueFactory(null);
    }
    else {
      const remainder = AmountValueFactory(roundedBillTotal - totalAmountAssigned)
      targetAmountValue.dollarAmount = { ...remainder };
      result.unassignedAmount = AmountValueFactory(0);
    }
  }
  else { // indexesToAssignRemainder.length > 1
    indexesToAssignRemainder.forEach(inputIndex => {
      result.inputValues[inputIndex].amount.dollarAmount = AmountValueFactory(null);
      result.unassignedAmount = AmountValueFactory(null);
    });
  }
  console.log(result)
  return result;
};

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