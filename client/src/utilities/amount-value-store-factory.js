export default function generateAmountValueStore() {
  let raw = '';
  let rounded = null;
  let display = null;

  return {
    set(value) {
      raw = value;
      const parsedValue = parseFloat(value);
      if (!value && value !== 0) {
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