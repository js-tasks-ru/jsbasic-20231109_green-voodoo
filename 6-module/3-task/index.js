import createElement from "../../assets/lib/create-element.js";

export default class Carousel {
  elem = null;
  #slides = [];

  constructor(slides) {
    this.#slides = slides || this.#slides;
    this.elem = this.#render();
    this.#initCarousel(this.#slides.length);
  }

  #render() {
    let template = "";

    for (let i = 0; i < this.#slides.length; i++) {
      template += `<div class="carousel__slide" data-id=${this.#slides[i].id}>
        <img src="/assets/images/carousel/${
          this.#slides[i].image
        }" class="carousel__img" alt="slide">
        <div class="carousel__caption">
          <span class="carousel__price">€${this.#slides[i].price.toFixed(
            2
          )}</span>
          <div class="carousel__title">${this.#slides[i].name}</div>
          <button type="button" class="carousel__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>`;
    }

    let templateAll = `<div class="carousel">
      <div class="carousel__arrow carousel__arrow_right">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </div>
      <div class="carousel__arrow carousel__arrow_left">
      <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
      </div>
      <div class="carousel__inner">
      ${template}
      </div>
     </div>;
    </div>`;

    this.elem = createElement(templateAll);

    let id;

    this.elem.addEventListener("click", (e) => {
      if (e.target.closest(".carousel__button")) {
        id =
          e.target.parentNode.parentNode.dataset.id ||
          e.target.parentNode.parentNode.parentNode.dataset.id;

        let event = new CustomEvent("product-add", {
          detail: id,
          bubbles: true,
        });
        this.elem.dispatchEvent(event);
      }
    });

    return this.elem;
  }

  #initCarousel = (countSlide) => {
    let countMove = 0;
    let offSetWidth;

    let arrowRight = this.elem.querySelector(".carousel__arrow_right");
    let arrowLeft = this.elem.querySelector(".carousel__arrow_left");
    let carouselInner = this.elem.querySelector(".carousel__inner");

    arrowLeft.style.display = "none";

    let onCarouselClick = (e) => {
      if (e.target == e.currentTarget || !e.target.closest(".carousel__arrow"))
        return;

      offSetWidth = carouselInner.offsetWidth;

      if (e.target.closest(".carousel__arrow_right")) ++countMove;
      else --countMove;

      carouselInner.style.transform =
        "translateX(-" + countMove * offSetWidth + "px)";

      if (countMove == countSlide - 1) {
        arrowRight.style.display = "none";
      } else if (countMove == 0) {
        arrowLeft.style.display = "none";
      } else {
        arrowRight.style.display = "";
        arrowLeft.style.display = "";
      }
    };

    this.elem.addEventListener("click", onCarouselClick);
  };
}
