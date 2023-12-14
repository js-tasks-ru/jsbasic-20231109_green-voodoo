import createElement from "../../assets/lib/create-element.js";

export default class Modal {
  elem = null;

  constructor() {
    this.elem = this.#render();
  }

  setTitle(title) {
    let elemTitle = this.elem.querySelector(".modal__title");
    elemTitle.innerHTML = title;
  }

  setBody(node) {
    let elemModalBody = this.elem.querySelector(".modal__body");
    elemModalBody.innerHTML = "";
    elemModalBody.appendChild(node);
  }

  open() {
    document.body.classList.add(`is-modal-open`);
    document.body.appendChild(this.elem);
  }

  close() {
    document.body.classList.remove(`is-modal-open`);
    let modal = document.body.querySelector(".modal");
    if (modal) {
      modal.remove();
    }
  }

  #render() {
    let template = `
    <div class="modal">
    <div class="modal__overlay"></div>
    <!--Прозрачная подложка перекрывающая интерфейс-->
    <div class="modal__inner">
      <div class="modal__header">
        <!--Кнопка закрытия модального окна-->
        <button type="button" class="modal__close">
          <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
        </button>

        <h3 class="modal__title">
          Вот сюда нужно добавлять заголовок
        </h3>
      </div>

      <div class="modal__body">
        A сюда нужно добавлять содержимое тела модального окна
      </div>
    </div>

  </div>`;

    this.elem = createElement(template);

    this.elem.addEventListener("click", (e) => {
      if (e.target.closest(".modal__close")) {
        this.close();
        document.removeEventListener("keydown", this.#onKeyDownListener);
      }
    });

    document.addEventListener("keydown", this.#onKeyDownListener);

    return this.elem;
  }

  #onKeyDownListener = (e) => {
    if (e.code === "Escape") {
      this.close();
      document.removeEventListener("keydown", this.#onKeyDownListener);
    }
  };
}
