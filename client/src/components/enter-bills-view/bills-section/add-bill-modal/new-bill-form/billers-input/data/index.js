import DataServiceFactory from '../../../../../../../utilities/data-service-factory';
import { generateAmountValueStore } from '../../amount-input/data';

let inputValue;
reset();

function reset() {
  inputValue = {
    oneOrMoreBillers: 'one',
    billersMultiple: [],
    billerSingle: {
      typeOrSelect: 'type',
      selected: null,
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
      amount: generateAmountValueStore()
    });
  }
}

let dataService = DataServiceFactory({
  readFunction() {
    return {
      oneOrMoreBillers: inputValue.oneOrMoreBillers,
      billersMultiple: inputValue.billersMultiple.map(
        ({ amount, ...otherProps }) => ({
          amount: amount.get(),
          ...otherProps
        })
      ),
      billerSingle: Object.assign({}, inputValue.billerSingle)
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
    },
    addBillerMult: addBillerMultInput,
    removeBillerMult(index) {
      inputValue.billersMultiple.splice(index, 1);
    }
  },
  isAsync: false
});

export default dataService;