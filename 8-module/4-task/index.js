import createElement from "../../assets/lib/create-element.js";
import escapeHtml from "../../assets/lib/escape-html.js";

import Modal from "../../7-module/2-task/index.js";

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    if (!product) return;
    let isInCart = false;

    for (let i = 0; i < this.cartItems.length; i++) {
      if (this.cartItems[i].product.id === product.id) {
        this.cartItems[i].count++;
        this.onProductUpdate(this.cartItems[i]);
        isInCart = true;
      }
    }
    if (!isInCart) {
      this.cartItems.push({ product, count: 1 });
      this.onProductUpdate(this.cartItems[this.cartItems.length - 1]);
    }
  }

  updateProductCount(productId, amount) {
    for (let i = 0; i < this.cartItems.length; i++) {
      if (this.cartItems[i].product.id === productId) {
        this.cartItems[i].count = this.cartItems[i].count + +amount;

        this.onProductUpdate(this.cartItems[i]);

        if (this.cartItems[i].count === 0) {
          this.cartItems.splice(i, 1);
        }
      }
    }
  }

  isEmpty() {
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    let result = 0;
    for (let i = 0; i < this.cartItems.length; i++) {
      result += this.cartItems[i].count;
    }
    return result;
  }

  getTotalPrice() {
    let resultPrice = 0;
    for (let i = 0; i < this.cartItems.length; i++) {
      resultPrice += this.cartItems[i].product.price * this.cartItems[i].count;
    }
    return resultPrice;
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${product.id}">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    // ...ваш код

    this.modal = new Modal();
    this.modal.setTitle("Your order");

    let elemModalBody = this.modal.elem.querySelector(".modal__body");
    elemModalBody.innerHTML = "";

    for (let i = 0; i < this.cartItems.length; i++) {
      elemModalBody.appendChild(
        this.renderProduct(this.cartItems[i].product, this.cartItems[i].count)
      );
    }
    elemModalBody.appendChild(this.renderOrderForm());

    this.modal.elem.addEventListener("click", this.#onButtonClick);

    let formCart = this.modal.elem.querySelector(".cart-form");
    formCart.addEventListener("submit", this.onSubmit);

    this.modal.open();

    return this.modal;
  }

  #onButtonClick = (event) => {
    let button = event.target.closest(".cart-counter__button");
    if (!button) {
      return;
    }
    let cart;
    if (event.target.closest(".cart-counter__button_plus")) {
      cart = event.target.closest(".cart-product");
      this.updateProductCount(cart.dataset.productId, 1);
    } else if (event.target.closest(".cart-counter__button_minus")) {
      cart = event.target.closest(".cart-product");
      this.updateProductCount(cart.dataset.productId, -1);

      if (this.getTotalCount() === 0) {
        if (this.modal) {
          this.modal.close();
          this.cartIcon.update(this);
        }
        return;
      }
    }
  };

  onProductUpdate(cartItem) {
    this.cartIcon.update(this);

    if (!document.body.classList.contains("is-modal-open")) return;

    let productId = cartItem.product.id;
    let modalBody = document.querySelector(".modal__body");

    let productCount = modalBody.querySelector(
      `[data-product-id="${productId}"] .cart-counter__count`
    );

    let productPrice = modalBody.querySelector(
      `[data-product-id="${productId}"] .cart-product__price`
    );

    let infoPrice = modalBody.querySelector(`.cart-buttons__info-price`);

    productCount.innerHTML = cartItem.count;

    productPrice.innerHTML = `€${(
      cartItem.product.price * cartItem.count
    ).toFixed(2)}`;

    infoPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`;
  }

  onSubmit = (event) => {
    event.preventDefault();

    let modalBody = document.querySelector(".modal__body");
    let modalTitle = document.querySelector(".modal__title");
    let buttonSubmit = modalBody.querySelector(`[type="submit"]`);
    buttonSubmit.classList.add("is-loading");

    let form = document.querySelector(".cart-form");

    const formData = new FormData(form);

    const responsePromise = fetch("https://httpbin.org/post", {
      method: "POST",
      body: formData,
    });

    responsePromise
      .then((response) => {
        modalTitle.innerHTML = "Success!";
        this.cartItems.length = 0;

        modalBody.innerHTML = `<div class="modal__body-inner">
           <p>
             Order successful! Your order is being cooked :) <br>
             We’ll notify you about delivery time shortly.<br>
           <img src="/assets/images/delivery.gif">
           </p>
          </div>`;
        this.cartIcon.update(this);
      })
      .catch(() => {
        console.log("error");
        return "";
      });
  };

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}
