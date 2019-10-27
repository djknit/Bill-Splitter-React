export default function AmountValueStoreFactory(type) {
  const isPercent = type === 'percent';
  let value = AmountValueFactory('');

  return {
    set(newValue) {
      value = AmountValueFactory(newValue, { isPercent });
    },
    get() {
      return {
        ...value
      };
    },
    reset() {
      this.set('');
    }
  };
}

function AmountValueFactory(raw, options) {
  const isPercent = (options && options.isPercent) || false;
  const parsedValue = parseFloat(raw);
  if (!parsedValue && parsedValue !== 0) {
    return {
      raw,
      rounded: null,
      display: null,
      problem: 'no-value'
    };
  }
  else if (isPercent && (parsedValue < 0 || parsedValue > 100)) {
    return {
      raw,
      rounded: null,
      display: 'invalid',
      problem: 'bad-value'
    };
  }
  else if (parsedValue < 0) {
    return {
      raw,
      rounded: null,
      display: 'negative',
      problem: 'bad-value'
    };
  }
  else {
    const percentPrecision = 2;
    const display = parsedValue.toFixed(isPercent ? percentPrecision : 2);
    return {
      raw,
      display,
      rounded: parseFloat(display),
      problem: null
    };
  }
}

export { AmountValueFactory, AmountValueStoreFactory };