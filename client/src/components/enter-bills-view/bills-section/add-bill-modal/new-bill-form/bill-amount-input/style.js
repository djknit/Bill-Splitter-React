const amountDisplay = function() {
  return {
    display: 'inline-block',
    position: 'absolute',
    right: 0,
    bottom: -2,
    width: '50%',
    padding: '.375rem .75rem 0',
    fontSize: '2rem',
    fontWeight: 400,
    lineHeight: 1.5,
    color: '#495057'
  };
}

export default {
  field: {
    position: 'relative'
  },
  input: {
    display: 'inline-block',
    width: 'calc(50% - 20px)'
  },
  amountDisplay: amountDisplay(),
  amountDisplayNegative: Object.assign(
    amountDisplay(),
    {
      color: '#dc3545',
      fontSize: '1.1rem'
    }
  )
};