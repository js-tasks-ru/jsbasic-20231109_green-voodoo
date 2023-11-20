function showSalary(users, age) {
  // ваш код...
  return users.reduce(
    (str, current) =>
      str +
      (current.age <= age
        ? (str === "" ? "" : "\n") + current.name + ", " + current.balance
        : ""),
    ""
  );
}
