import DataServiceFactory from '../../../../../../../../utilities/data-service-factory';
import { generateAmountValueStore } from '../../../amount-input/data';
import { agentsService } from '../../../../../../data/entities';

let agents = [];
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

let inputValues;
let nextInputId = 0;
reset();

function reset() {
  inputValues = [];
  addInput(2);
}

// adds n new inputs
function addInput(n) {
  if (!n) n = 1;
  for (let i = 0; i < n; i++) {
    inputValues.push({
      typeOrSelect: 'type',
      typed: '',
      selectedAgentId: null,
      amount: generateAmountValueStore(),
      inputId: nextInputId++ // used for repeated element unique key
    });
  }
}

function getOptions(selectedAgentId) {
  const allSelectedAgentIds = inputValues.map(input => input.selectedAgentId);

  return agents.map(
    ({ name, id }) => (
      {
        name,
        id,
        disabled: (selectedAgentId !== id) && (allSelectedAgentIds.indexOf(id) !== -1)
      }
    )
  );
}

let dataService = DataServiceFactory({
  readFunction() {
    return inputValues.map(
      ({
        amount,
        selectedAgentId,
        ...otherProps
      }) => (
        {
          amount: amount.get(),
          selectedAgentId,
          ...otherProps,
          options: getOptions(selectedAgentId)
        }
      )
    )
  },
  methods: {
    update(index, propName, value) {
      if (propName === 'amount') inputValues[index].amount.set(value);
      else inputValues[index][propName] = value;
      console.log(inputValues)
    },
    reset,
    _emit() {}
  },
  isAsync: false
});

export default dataService;