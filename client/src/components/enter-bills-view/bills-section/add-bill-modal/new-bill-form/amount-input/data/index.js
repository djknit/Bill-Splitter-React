import DataServiceFactory from '../../../../../../../utilities/data-service-factory';

let inputValue = generateAmountValueStore();

function generateAmountValueStore() {
  let raw = '';
  let rounded = null;
  let display = null;

  return {
    set(value) {
      raw = value;
      const parsedValue = parseFloat(value);
      if (value === '') {
        rounded = null;
        display = null;
      }
      else if (parsedValue < 0) {
        rounded = null;
        display = 'negative';
      }
      else {
        display = parsedValue.toFixed(2);
        rounded = parseFloat(display);
      }
    },
    get() {
      return {
        raw,
        rounded,
        display
      }
    },
    reset() {
      this.set(null);
    }
  };
}

let dataService = DataServiceFactory({
  readFunction() {
    return inputValue.get();
  },
  methods: {
    update(newRawValue) {
      inputValue.set(newRawValue);
    },
    reset() {
      inputValue.reset();
    }
  },
  isAsync: false
});

export default dataService;

export { generateAmountValueStore }; 