function getFontSize(sizeRatio) {
  if (!sizeRatio) sizeRatio = 1;

  return `${sizeRatio}rem`;
}

function getMargins(hasSmallMargins, isLastChild) {
  return {
    field: {
      marginBottom: (hasSmallMargins && !isLastChild) ?
        '.3em' :
        undefined
    },
    label: {
      marginBottom: hasSmallMargins ? '.2em' : undefined
    }
  };
}

const normalWeight = {
  get fontWeight() {
    return 'normal';
  }
};

export { getFontSize, getMargins, normalWeight };