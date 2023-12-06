/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  elem = null;
  #rows = [];

  constructor(rows) {
    this.#rows = rows || this.#rows;
    this.elem = this.#render();
  }

  #render() {
    this.elem = document.createElement("table");
    let template = `<thead>
      <tr>
        <th>Имя</th>
        <th>Возраст</th>
        <th>Зарплата</th>
        <th>Город</th>
        <th></th>
      </tr>
    </thead>`;

    this.elem.insertAdjacentHTML("afterbegin", template);

    template = ``;

    for (let i = 0; i < this.#rows.length; i++) {
      template += `<tr>`;

      for (let key in this.#rows[i]) {
        template += `<td>${this.#rows[i][key]}</td>`;
      }

      template += `<td><button>X</button></td>
        </tr>`;
    }

    this.elem.insertAdjacentHTML("beforeend", template);

    this.elem.addEventListener("click", (e) => {
      if (e.target.closest("button")) {
        e.target.parentNode.parentNode.remove();
      }
    });

    return this.elem;
  }
}
