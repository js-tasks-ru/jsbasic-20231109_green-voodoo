function highlight(table) {
  // ваш код...
  function getCellIndex(cellValue) {
    for (let i = 0; i < table.rows[0].cells.length; i++) {
      if (table.rows[0].cells[i].innerHTML == cellValue) {
        return i;
      }
    }
  }

  let classRow;

  let cellStatus;
  let cellGender;
  let cellAge;

  for (i = 1; i < table.rows.length; i++) {
    classRow = table.rows[i].classList;

    cellStatus = table.rows[i].cells[getCellIndex("Status")];
    switch (cellStatus.dataset.available) {
      case "true":
        classRow += " available";
        break;
      case "false":
        classRow += " unavailable";
        break;
      default:
        table.rows[i].setAttribute("hidden", true);
    }

    cellGender = table.rows[i].cells[getCellIndex("Gender")];
    if (cellGender.innerHTML == "m") {
      classRow += " male";
    } else if (cellGender.innerHTML == "f") {
      classRow += " female";
    }

    table.rows[i].className = classRow;

    cellAge = table.rows[i].cells[getCellIndex("Age")];
    if (+cellAge.innerHTML < 18) {
      table.rows[i].style = "text-decoration: line-through";
    }
  }
}
