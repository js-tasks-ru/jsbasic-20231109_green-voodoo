function truncate(str, maxlength) {
  // ваш код...
  if (str || str === "") {
    let addedStr = maxlength > 0 ? "…" : "";
    return str.length > maxlength
      ? str.substr(0, maxlength - 1) + addedStr
      : str;
  }
}
