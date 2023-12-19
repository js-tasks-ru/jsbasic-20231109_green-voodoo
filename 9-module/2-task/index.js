import Carousel from "../../6-module/3-task/index.js";
import slides from "../../6-module/3-task/slides.js";

import RibbonMenu from "../../7-module/1-task/index.js";
import categories from "../../7-module/1-task/categories.js";

import StepSlider from "../../7-module/4-task/index.js";
import ProductsGrid from "../../8-module/2-task/index.js";

import CartIcon from "../../8-module/1-task/index.js";
import Cart from "../../8-module/4-task/index.js";

export default class Main {
  constructor() {}

  async render() {
    // ... ваш код
    await this.#addCarousel();
    await this.#addRibbonMenu();
    await this.#addStepSlider();
    await this.#addCartIcon();
    await this.#addProductsGrid();
  }

  #addCarousel() {
    return new Promise((resolve) => {
      this.carousel = new Carousel(slides);
      let containerCarousel = document.body.querySelector(
        `[data-carousel-holder]`
      );
      containerCarousel.append(this.carousel.elem);
      resolve();
    });
  }
  #addRibbonMenu() {
    return new Promise((resolve) => {
      this.ribbonMenu = new RibbonMenu(categories);
      let container = document.querySelector("[data-ribbon-holder]");
      container.append(this.ribbonMenu.elem);
      resolve();
    });
  }

  #addStepSlider() {
    return new Promise((resolve) => {
      this.stepSlider = new StepSlider({
        steps: 5,
        value: 3,
      });
      let container = document.querySelector("[data-slider-holder]");
      container.append(this.stepSlider.elem);
      resolve();
    });
  }

  #addCartIcon() {
    return new Promise((resolve) => {
      this.cartIcon = new CartIcon();
      let cartIconHolder = document.querySelector("[data-cart-icon-holder]");
      cartIconHolder.append(this.cartIcon.elem);
      this.cart = new Cart(this.cartIcon);
      resolve();
    });
  }

  #addProductsGrid() {
    return new Promise((resolve) => {
      const responsePromise = fetch("products.json");

      responsePromise
        .then((response) => {
          response.json().then((json) => {
            this.products = json;
            this.productsGrid = new ProductsGrid(this.products);

            let container = document.querySelector(
              "[data-products-grid-holder]"
            );
            container.innerHTML = "";
            container.append(this.productsGrid.elem);

            this.productsGrid.updateFilter({
              noNuts: document.getElementById("nuts-checkbox").checked,
              vegeterianOnly: document.getElementById("vegeterian-checkbox")
                .checked,
              maxSpiciness: this.stepSlider.value,
              category: this.ribbonMenu.value,
            });

            this.#onCreateListeners();
          });
        })
        .catch(() => {
          console.log("error");
          return "";
        });

      resolve();
    });
  }

  #onCreateListeners() {
    document.body.addEventListener("product-add", this.#onProductAdd);

    this.stepSlider.elem.addEventListener(
      "slider-change",
      this.#onSliderChange
    );

    this.ribbonMenu.elem.addEventListener(
      "ribbon-select",
      this.#onRibbonSelect
    );

    let checkNuts = document.querySelector("#nuts-checkbox");
    checkNuts.addEventListener("change", this.#onChangeNuts);

    let checkVegetarian = document.querySelector("#vegeterian-checkbox");
    checkVegetarian.addEventListener("change", this.#onChangeVegetarians);
  }

  #onProductAdd = (e) => {
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id === e.detail) {
        this.cart.addProduct(this.products[i]);
      }
    }
  };

  #onSliderChange = (e) => {
    this.productsGrid.updateFilter({
      maxSpiciness: e.detail,
    });
  };

  #onRibbonSelect = (e) => {
    this.productsGrid.updateFilter({
      category: e.detail,
    });
  };

  #onChangeNuts = (e) => {
    this.productsGrid.updateFilter({
      noNuts: e.target.checked,
    });
  };

  #onChangeVegetarians = (e) => {
    this.productsGrid.updateFilter({
      vegeterianOnly: e.target.checked,
    });
  };
}
