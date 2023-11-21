function getMinMax(str) {
  // ваш код...
  let arrNumber = str.split(" ").filter((item) => Number.isFinite(+item));

  return {
    min: Math.min(...arrNumber),
    max: Math.max(...arrNumber),
  };
}
