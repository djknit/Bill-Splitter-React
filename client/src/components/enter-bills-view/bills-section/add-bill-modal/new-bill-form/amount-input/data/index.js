import DataServiceFactory from '../../../../../../../utilities/data-service-factory';

let inputValue = generateAmountValueStore();

function generateAmountValueStore() {
  let raw = null;
  let rounded = null;
  let display = null;

  return {
    set(value) {
      raw = value;
      if (!value && value !== 0) {
        rounded = null;
        display = null;
      }
      else if (value < 0) {
        rounded = null;
        display = 'negative';
      }
      else {
        display = value.toFixed(2);
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