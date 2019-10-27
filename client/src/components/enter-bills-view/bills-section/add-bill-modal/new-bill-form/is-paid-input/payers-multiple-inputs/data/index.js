import { DataServiceFactory, AmountValueStoreFactory } from '../../../../../../../../utilities';
import { participantsService } from '../../../../../../data/entities';

let participants = [];

let inputValues, nextInputId;
reset();

function reset() {
  inputValues = [];
  nextInputId = 0;
  addInput(2);
}

// adds n new inputs
function addInput(n) {
  if (!n) n = 1;
  for (let i = 0; i < n; i++) {
    inputValues.push({
      selectedParticipantId: null,
      amount: AmountValueStoreFactory(),
      inputId: nextInputId++ // used for repeated element unique key
    });
  }
}

function getOptions(selectedParticipantId) {
  const allSelectedParticipantIds = inputValues.map(input => input.selectedParticipantId);

  return participants.map(
    ({ name, id }) => (
      {
        name,
        value: id,
        disabled: (selectedParticipantId !== id) && (allSelectedParticipantIds.indexOf(id) !== -1)
      }
    )
  );
}

let dataService = DataServiceFactory({
  readFunction() {
    return inputValues.map(
      ({
        amount,
        selectedParticipantId,
        inputId
      }) => (
        {
          amount: amount.get(),
          selectedParticipantId,
          inputId,
          options: getOptions(selectedParticipantId)
        }
      )
    )
  },
  methods: {
    update(index, propName, value) {
      const participantToUpdate = inputValues[index];
      if (propName === 'amount') participantToUpdate.amount.set(value);
      else if (propName === 'selectedParticipantId') {
        participantToUpdate.selectedParticipantId = parseInt(value);
      }
    },
    removeInput(index) {
      inputValues.splice(index, 1);
    },
    addInput() {
      if (inputValues.length >= participants.length) return console.log('fail add individually in');
      addInput();
    },
    reset
  },
  isAsync: false
});

export default dataService;

getparticipants();
participantsService.subscribe(getparticipants);

function getparticipants() {
  participantsService
    .getValue()
    .then(_participants => {
      participants = _participants;
      dataService._emit();
    });
}