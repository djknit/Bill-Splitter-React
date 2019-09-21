function getFontSize(sizeRatio) {
  if (!sizeRatio) sizeRatio = 1;

  return `${sizeRatio}rem`;
}

export { getFontSize };