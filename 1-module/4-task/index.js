function checkSpam(str) {
  // ваш код...
  if (!str) {
    return false;
  }

  str = str.toLowerCase();
  if (
    str.includes("1xBet".toLowerCase()) ||
    str.includes("XXX".toLowerCase())
  ) {
    return true;
  }

  return false;
}
