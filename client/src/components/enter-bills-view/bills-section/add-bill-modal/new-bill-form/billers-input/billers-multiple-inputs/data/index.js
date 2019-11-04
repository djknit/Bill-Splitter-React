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
        return getInputProblems(this);
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
    let typedNamesInputIndexes = {};
    let duplicateTypedNames = [];
    let outputValues = inputValues.map(
      (
        {
          typeOrSelect,
          amount,
          selectedAgentId,
          typed,
          ...otherProps
        },
        index
      ) => {
        const problems = getInputProblems();
        // only true if typed name is valid and being used (typeOrSelect == 'type')
        const hasTypedName = !(problems && problems.name) && typeOrSelect === 'type';
        let outputValue = {
          amount: amount.get(),
          selectedAgentId,
          typed,
          ...otherProps,
          options: getOptions(selectedAgentId),
          problems
        };
        if (!hasTypedName) return outputValue;
        if (typedNamesInputIndexes[typed] === undefined) {
          typedNamesInputIndexes[typed] = [index];
        }
        else {
          if (duplicateTypedNames.indexOf(typed) !== -1) duplicateTypedNames.push(typed);
          typedNamesInputIndexes[typed].push(index);
        }
        return outputValue;
      }
    );
    duplicateTypedNames.forEach(dupTypedName => {
      typedNamesInputIndexes[dupTypedName].forEach(inputIndex => {
        const targetOutputValue = outputValues[inputIndex];
        if (targetOutputValue.problems === null) {
          targetOutputValue.problems = { amount: null };
        }
        targetOutputValue.problems.name = 'duplicate-name';
      });
    });
    return outputValues;
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
      console.log('add input');
      addInput();
    },
    reset
  },
  isAsync: false,
  validateFunction(billTotal) {
    let fail = false;
    let inputProblems = {};
    let typedNames = {};
    inputValues.forEach(input => {
      const { problems, inputId, typeOrSelect, typed } = input;
      
    });
    if (!fail) return null;
    return inputProblems;
  }
});

export default dataService;

function getInputProblems(inputValue) {
  const { typeOrSelect, typed, selectedAgentId, amount } = inputValue;
  let nameProblem;
  let agentNames = agents.map(agent => agent.name);
  if (!typeOrSelect) nameProblem = 'no-name-method';
  else if (typeOrSelect === 'select') {
    nameProblem = selectedAgentId === null ? 'no-name' : null;
  }
  else if (typeOrSelect === 'type') {
    nameProblem = (typed === '' && 'no-name') ||
      (agentNames.indexOf(typed) !== -1 && 'name-already-used') ||
      null;
  }
  else nameProblem = 'bad-name-method';
  const amountProblem = amount.get().problem;
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