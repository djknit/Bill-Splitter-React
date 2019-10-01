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
      this.set(null);
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
      display: null
    };
  }
  else if (isPercent && (parsedValue < 0 || parsedValue > 100)) {
    return {
      raw,
      rounded: null,
      display: 'invalid'
    };
  }
  else if (parsedValue < 0) {
    return {
      raw,
      rounded: null,
      display: 'negative'
    };
  }
  else {
    const display = parsedValue.toFixed(isPercent ? 1 : 2);
    return {
      raw,
      display,
      rounded: parseFloat(display)
    };
  }
}

export { AmountValueFactory, AmountValueStoreFactory };