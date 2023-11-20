function camelize(str) {
  // ваш код...
  if (!str || str.length < 1) {
    return "";
  }

  return str
    .split("-")
    .map((item, index) =>
      index > 0 && item.length > 0
        ? item[0].toUpperCase() + item.slice(1)
        : item
    )
    .join("");
}
