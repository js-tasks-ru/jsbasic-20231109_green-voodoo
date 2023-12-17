import createElement from "../../assets/lib/create-element.js";

export default class CartIcon {
  constructor() {
    this.render();
    this.addEventListeners();
  }

  render() {
    this.elem = createElement('<div class="cart-icon"></div>');
  }

  update(cart) {
    if (!cart.isEmpty()) {
      this.elem.classList.add("cart-icon_visible");

      this.elem.innerHTML = `
        <div class="cart-icon__inner">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
          <span class="cart-icon__price">€${cart
            .getTotalPrice()
            .toFixed(2)}</span>
        </div>`;

      this.updatePosition();

      this.elem.classList.add("shake");
      this.elem.addEventListener(
        "transitionend",
        () => {
          this.elem.classList.remove("shake");
        },
        { once: true }
      );
    } else {
      this.elem.classList.remove("cart-icon_visible");
    }
  }

  addEventListeners() {
    document.addEventListener("scroll", () => this.updatePosition());
    window.addEventListener("resize", () => this.updatePosition());
  }

  updatePosition() {
    // ваш код ...
    if (this.elem.offsetHeight === 0) return;

    if (document.documentElement.clientWidth <= 767) {
      this.elem.style.position = "";
      this.elem.style.top = "";
      this.elem.style.right = "";
      this.elem.style.left = "";
      this.elem.style.zIndex = "";
      return;
    }

    let getDefaultPosition = () => {
      let defaultPosition =
        this.elem.getBoundingClientRect().top + window.pageYOffset;

      return function () {
        return window.pageYOffset > defaultPosition;
      };
    };

    let getDefault = getDefaultPosition;
    let deltaDefault = getDefault();

    if (deltaDefault) {
      let elemContainer = document.querySelector(".container");

      let leftPosition =
        Math.min(
          elemContainer.getBoundingClientRect().right + 20,
          document.documentElement.clientWidth - this.elem.offsetWidth - 10
        ) + "px";

      this.elem.style.position = "fixed";
      this.elem.style.top = "50px";
      this.elem.style.right = "10px";
      this.elem.style.left = leftPosition;
      this.elem.style.zIndex = 100;
    } else {
      this.elem.style.position = "";
      this.elem.style.top = "";
      this.elem.style.right = "";
      this.elem.style.left = "";
      this.elem.style.zIndex = "";
    }
  }
}
