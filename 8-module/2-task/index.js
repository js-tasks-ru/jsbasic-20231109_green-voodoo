import createElement from "../../assets/lib/create-element.js";
import ProductCard from "../../6-module/2-task/index.js";

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.elem = this.#render();
  }

  updateFilter(filters) {
    this.elem.firstElementChild.innerHTML = "";

    for (let key in filters) {
      this.filters[key] = filters[key];
    }

    this.#addProductCards();
  }

  #isShow(product, filters) {
    if (product.nuts && filters.noNuts && filters.noNuts === true) return false;
    if (
      (!product.vegeterian || product.vegeterian === false) &&
      filters.vegeterianOnly &&
      filters.vegeterianOnly === true
    )
      return false;
    if (
      product.spiciness &&
      filters.maxSpiciness &&
      filters.maxSpiciness < product.spiciness
    )
      return false;
    if (
      product.category &&
      filters.category &&
      filters.category !== product.category
    )
      return false;

    return true;
  }

  #addProductCards() {
    let grid = this.elem.querySelector(".products-grid__inner");

    for (let i = 0; i < this.products.length; i++) {
      if (this.#isShow(this.products[i], this.filters)) {
        grid.appendChild(new ProductCard(this.products[i]).elem);
      }
    }
  }

  #render() {
    let template = `<div class="products-grid">
    <div class="products-grid__inner">
    </div>
    </div>`;

    this.elem = createElement(template);

    this.#addProductCards();

    return this.elem;
  }
}
