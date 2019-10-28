import { DataServiceFactory, AmountValueStoreFactory } from '../../../../../../../../utilities';
import { agentsService } from '../../../../../../data/entities';

let agents = [];

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
      typeOrSelect: 'type',
      typed: '',
      selectedAgentId: null,
      amount: AmountValueStoreFactory(),
      inputId: nextInputId++, // used for repeated element unique key
      get problems() {
        const nameProblem = (
          this.typeOrSelect === 'type' ?
          this.typed === '' :
          this.selectedAgentId === null
        ) ? 'no-name' : null;
        const amountProblem = this.amount.get().problem;
        if (nameProblem === null && amountProblem === null) {
          return null;
        }
        else {
          return {
            name: nameProblem,
            amount: amountProblem
          };
        }
      }
    });
  }
}

function getOptions(selectedAgentId) {
  const allSelectedAgentIds = inputValues.map(input => input.selectedAgentId);

  return agents.map(
    ({ name, id }) => (
      {
        name,
        value: id,
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
      const billerToUpdate = inputValues[index];
      if (propName === 'amount') billerToUpdate.amount.set(value);
      else if (propName === 'selectedAgentId') billerToUpdate.selectedAgentId = parseInt(value);
      else billerToUpdate[propName] = value;
    },
    removeInput(index) {
      inputValues.splice(index, 1);
    },
    addInput() {
      console.log('add input')
      addInput();
    },
    reset
  },
  isAsync: false,
  validateFunction() {
    let fail = false;
    let inputProblems = {};
    inputValues.forEach(input => {
      const { problems, inputId } = input;
      if (problems !== null) {
        fail = true;
      }
      inputProblems[inputId] = problems;
    });
    if (!fail) return null;
    return inputProblems;
  }
});

export default dataService;

getAgents();
agentsService.subscribe(getAgents);

function getAgents() {
  agentsService
    .getValue()
    .then(_agents => {
      agents = _agents;
      dataService._emit();
    });
}