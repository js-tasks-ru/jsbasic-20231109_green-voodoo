function factorial(n) {
  if (n < 0 || n % 1 !== 0) {
    console.log("Не натуральное число!");
    return;
  }

  if (n == 0 || n == 1) {
    return 1;
  }

  let f = 1;
  for (i = 2; i <= n; i++) {
    f = f * i;
  }
  return f;
}
