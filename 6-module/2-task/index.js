export default class ProductCard {
  elem = null;
  #product = {};

  constructor(product) {
    this.#product = product || this.#product;
    this.elem = this.#render();
  }

  #render() {
    this.elem = document.createElement("div");
    this.elem.classList.add("card");

    this.elem.innerHTML = `<div class="card__top">
      <img src="/assets/images/products/${
        this.#product.image
      }" class="card__image" alt="product">
      <span class="card__price">€${this.#product.price.toFixed(2)}</span>
      </div>
      <div class="card__body">
      <div class="card__title">${this.#product.name}</div>
      <button type="button" class="card__button">
        <img src="/assets/images/icons/plus-icon.svg" alt="icon">
      </button>
      </div>`;

    let button = this.elem.querySelector(".card__button");
    button.addEventListener("click", this.#onButtonClick);

    return this.elem;
  }

  #onButtonClick = () => {
    let event = new CustomEvent("product-add", {
      detail: this.#product.id,
      bubbles: true,
    });
    this.elem.dispatchEvent(event);
  };
}
