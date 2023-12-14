import createElement from "../../assets/lib/create-element.js";

export default class RibbonMenu {
  elem = null;
  #categories = [];

  constructor(categories) {
    this.#categories = categories || this.#categories;
    this.elem = this.#render();
    this.#initScrollRibbonMenu();
  }

  #render() {
    let template = "";

    for (let i = 0; i < this.#categories.length; i++) {
      if (i == 0) {
        template += `<a href="#" class="ribbon__item ribbon__item_active" data-id="">All</a>`;
      } else {
        template += `<a href="#" class="ribbon__item" data-id=${
          this.#categories[i].id
        }>${this.#categories[i].name}</a>`;
      }
    }

    let templateAll = `<div class="ribbon">
      <button class="ribbon__arrow ribbon__arrow_left">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
      <nav class="ribbon__inner">
      ${template}
      </nav>
      <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
    </div>`;

    this.elem = createElement(templateAll);

    this.#onRibbonSelect();

    return this.elem;
  }

  #onRibbonSelect = () => {
    this.elem.addEventListener("click", (e) => {
      if (e.target.closest(".ribbon__item")) {
        e.preventDefault;

        let elemSelectOld = this.elem.querySelector(".ribbon__item_active");
        if (elemSelectOld) {
          elemSelectOld.classList.remove("ribbon__item_active");
        }
        e.target.classList.add("ribbon__item_active");

        let id = e.target.dataset.id;

        let event = new CustomEvent("ribbon-select", {
          detail: id,
          bubbles: true,
        });
        this.elem.dispatchEvent(event);
      }
    });
  };

  #onRibbonScrollClick = (e) => {
    if (e.target == e.currentTarget || !e.target.closest(".ribbon__arrow"))
      return;
    let ribbonInner = this.elem.querySelector(".ribbon__inner");
    if (e.target.closest(".ribbon__arrow_right")) {
      ribbonInner.scrollBy(350, 0);
    }
    if (e.target.closest(".ribbon__arrow_left")) {
      ribbonInner.scrollBy(-350, 0);
    }
  };

  #onRibbonScroll = (e) => {
    let arrowRight = this.elem.querySelector(".ribbon__arrow_right");
    let arrowLeft = this.elem.querySelector(".ribbon__arrow_left");
    let ribbonInner = this.elem.querySelector(".ribbon__inner");

    let scrollWidth = ribbonInner.scrollWidth;
    let scrollLeft = ribbonInner.scrollLeft;
    let clientWidth = ribbonInner.clientWidth;

    let scrollRight = scrollWidth - scrollLeft - clientWidth;

    if (scrollRight == 0) {
      arrowRight.classList.remove("ribbon__arrow_visible");
    } else arrowRight.classList.add("ribbon__arrow_visible");

    if (scrollLeft >= 0 && scrollLeft < 1) {
      arrowLeft.classList.remove("ribbon__arrow_visible");
    } else arrowLeft.classList.add("ribbon__arrow_visible");
  };

  #initScrollRibbonMenu = () => {
    let ribbonInner = this.elem.querySelector(".ribbon__inner");

    this.#onRibbonScrollClick;

    this.#onRibbonScroll;

    this.elem.addEventListener("click", this.#onRibbonScrollClick);
    ribbonInner.addEventListener("scroll", this.#onRibbonScroll);
  };
}
