function getMinMax(str) {
  // ваш код...
  let arrNumber = str.split(" ").filter((item) => Number.isFinite(+item));

  let result = {};

  result.min = Math.min(...arrNumber);
  result.max = Math.max(...arrNumber);

  return result;
}
