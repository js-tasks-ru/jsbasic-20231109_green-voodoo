function makeDiagonalRed(table) {
  // ваш код...
  let diagonalLength = Math.min(table.rows.length, table.rows[0].cells.length);

  for (let i = 0; i < diagonalLength; i++) {
    table.rows[i].cells[i].style.backgroundColor = "red";
  }
}
