import DataServiceFactory from '../../../../../../../../utilities/data-service-factory';
import { agentsService } from '../../../../../../data/entities';

let agents = [];

let inputValue;
reset();

function reset() {
  inputValue = {
    typeOrSelect: 'type',
    selectedAgentId: null,
    typed: ''
  };
}

let dataService = DataServiceFactory({
  readFunction() {
    return {
      options: agents.map(({ name, id }) => ({ name, value: id })),
      ...inputValue
    };
  },
  methods: {
    update(propName, value) {
      inputValue[propName] = value;
      console.log(inputValue)
    },
    reset
  },
  isAsync: false,
  validateFunction() {
    const { typeOrSelect, selectedAgentId, typed } = inputValue;
    if (typeOrSelect === 'type') {
      return typed === '' ? 'no-name' : null;
    }
    else { // select
      return selectedAgentId === null ? 'no-name' : null;
    }
  }
});

export default dataService;

updateAgents();
agentsService.subscribe(updateAgents);

function updateAgents() {
  agentsService
    .getValue()
    .then(_agents => {
      agents = _agents;
      dataService._emit();
    });
}