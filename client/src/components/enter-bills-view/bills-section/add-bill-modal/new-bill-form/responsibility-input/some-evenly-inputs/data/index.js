import { DataServiceFactory, AmountValueStoreFactory } from '../../../../../../../../utilities';
import { participantsService } from '../../../../../../data/entities';
import billAmountService from '../../../bill-amount-input/data';

let inputValues, nextInputId, billTotal;
let amountPerPerson = AmountValueStoreFactory();
let participants = [];

let dataService = DataServiceFactory({
  readFunction() {
    return {
      inputValues: inputValues.map(
        ({
          selectedParticipantId,
          inputId
        }) => ({
          selectedParticipantId,
          inputId,
          options: getOptions(selectedParticipantId)
        })
      ),
      isAddPButtonDisabled: participants.length <= inputValues.length,
      amountPerPerson: amountPerPerson.get().display
    }
  },
  methods: {
    reset,
    update(index, selectedParticipantId) {
      inputValues[index].selectedParticipantId = parseInt(selectedParticipantId);
    },
    addInput,
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
    inputId: nextInputId++
  });
  setAmountPerPerson();
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
  setAmountPerPerson();
  dataService._emit();
}

function reset() {
  nextInputId = 0;
  inputValues = [];
  amountPerPerson.set(null);
  addInput();
}

function setAmountPerPerson() {
  if (!billTotal || !inputValues) return null;
  const numberOfResponsiblePs = inputValues.length;
  if (numberOfResponsiblePs === 0) return amountPerPerson.set(null);
  if (billTotal.display === 'negative') return amountPerPerson.set(-1);
  const roundedBillTotal = billTotal.rounded;
  if (roundedBillTotal === null) return amountPerPerson.set(null);
  amountPerPerson.set(roundedBillTotal / numberOfResponsiblePs);
}

export default dataService;