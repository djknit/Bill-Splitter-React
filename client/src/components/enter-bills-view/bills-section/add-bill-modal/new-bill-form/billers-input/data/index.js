import DataServiceFactory from '../../../../../../../utilities/data-service-factory';
import { generateAmountValueStore } from '../../amount-input/data';
import { agentsService } from '../../../../../data/entities';

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

let inputValue;
let nextBillerMultInputId = 0;
reset();

function reset() {
  nextBillerMultInputId = 0;
  inputValue = {
    oneOrMoreBillers: 'one',
    billersMultiple: [],
    billerSingle: {
      typeOrSelect: 'type',
      selectedOptionIndex: null,
      typed: ''
    }
  };
  addBillerMultInput(2);
}

// adds n new biller inputs to Multiple Billers section
function addBillerMultInput(n) {
  if (!n) n = 1;
  for (let i = 0; i < n; i++) {
    inputValue.billersMultiple.push({
      typeOrSelect: 'type',
      selected: null,
      typed: '',
      amount: generateAmountValueStore(),
      inputId: nextBillerMultInputId++
    });
  }
}

let dataService = DataServiceFactory({
  readFunction() {
    const billersMultSelectedIds = inputValue.billersMultiple.filter(
      billerMultInput => billerMultInput.selected !== null
    ).map(
      billerMultInput => billerMultInput.selected.id
    );
    return {
      oneOrMoreBillers: inputValue.oneOrMoreBillers,
      billersMultiple: inputValue.billersMultiple.map(
        ({ amount, selected, ...otherProps }) => ({
          amount: amount.get(),
          selected,
          options: agents.map(
            agent => Object.assign(
              { 
                disabled: (selected === null || selected.id === agent.id) &&
                  billersMultSelectedIds.indexOf(agent.id) > -1
              },
              agent
            )
          ),
          ...otherProps
        })
      ),
      billerSingle: Object.assign(
        {
          options: agents.map(agent => Object.assign({}, agent)),
        },
        inputValue.billerSingle
      )
    };
  },
  methods: {
    updateOneOrMoreBillers(value) {
      console.log(value)
      inputValue.oneOrMoreBillers = value;
    },
    updateBillerMult(index, propName, value) {
      const billerMult = inputValue.billersMultiple[index]
      if (propName === 'amount') {
        billerMult.amount.set(value);
      }
      else {
        billerMult[propName] = value;
      }
    },
    updateBillerSingle(propName, value) {
      inputValue.billerSingle[propName] = value;
      console.log(inputValue.billerSingle)
    },
    addBillerMult: addBillerMultInput,
    removeBillerMult(index) {
      inputValue.billersMultiple.splice(index, 1);
    },
    _emit() {console.log('emit billers-input-data')},
    reset
  },
  isAsync: false
});

export default dataService;