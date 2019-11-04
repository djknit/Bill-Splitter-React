import DataServiceFactory from '../../../../../../../../utilities/data-service-factory';
import { participantsService } from '../../../../../../data/entities';

let participants = [];

let inputValue;
reset();

function reset() {
  inputValue = {
    selectedParticipantId: null
  };
}

let dataService = DataServiceFactory({
  readFunction() {
    return {
      options: participants.map(({ name, id }) => ({ name, value: id })),
      ...inputValue
    };
  },
  methods: {
    update(propName, value) {
      inputValue[propName] = value;
    },
    reset
  },
  isAsync: false
});

export default dataService;

updateParticipants();
participantsService.subscribe(updateParticipants);

function updateParticipants() {
  participantsService
    .getValue()
    .then(_participants => {
      participants = _participants;
      dataService._emit();
    });
}