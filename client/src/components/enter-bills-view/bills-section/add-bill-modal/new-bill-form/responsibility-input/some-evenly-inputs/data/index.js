import { DataServiceFactory, AmountValueStoreFactory } from '../../../../../../../../utilities';
import { participantsService } from '../../../../../../data/entities';

let inputValues, nextInputId;
let participants = [];
reset();

function reset() {
  nextInputId = 0;
  inputValues = [];
  addInput();
}

function addInput() {
  inputValues.push({
    selectedParticipantId: null,
    inputId: nextInputId++
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

let dataService = DataServiceFactory({
  readFunction() {
    return inputValues.map(
      ({
        selectedParticipantId,
        inputId
      }) => ({
        selectedParticipantId,
        inputId,
        options: getOptions(selectedParticipantId)
      })
    );
  },
  methods: {
    reset,
    update(index, selectedParticipantId) {
      inputValues[index] = selectedParticipantId;
    },
    addInput,
    removeInput(index) {
      inputValues.splice(index, 1);
    }
  },
  isAsync: false
});

export default dataService;

getParticipants();
participantsService.subscribe(getParticipants);

function getParticipants() {
  participantsService
    .getValue()
    .then(_participant => {
      participants = _participant;
      dataService._emit();
    });
}