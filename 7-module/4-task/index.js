import createElement from "../../assets/lib/create-element.js";

export default class StepSlider {
  elem = null;
  steps = 0;

  constructor({ steps, value = 0 }) {
    this.steps = steps || this.steps;
    this.value = value;
    this.elem = this.#render(this.steps, this.value);
  }

  #lengthStep = () => {
    return Math.round(this.elem.offsetWidth / (this.steps - 1));
  };

  #newPosition = (e) => {
    return Math.round(
      (e.pageX - this.elem.getBoundingClientRect().left) / this.#lengthStep(e)
    );
  };

  #newPercents = (e) => {
    return (100 / (this.steps - 1)) * this.#newPosition(e);
  };

  #onSliderClick = (e) => {
    let thumbSlider = this.elem.querySelector(".slider__thumb");
    let valueSlider = this.elem.querySelector(".slider__value");
    let progressSlider = this.elem.querySelector(".slider__progress");
    let stepsSlider = this.elem.querySelector(".slider__steps");

    thumbSlider.style.left = `${this.#newPercents(e)}%`;
    valueSlider.innerHTML = this.#newPosition(e);
    progressSlider.style.width = `${this.#newPercents(e)}%`;
    stepsSlider.children[this.value].classList.toggle(`slider__step-active`);
    stepsSlider.children[this.#newPosition(e)].classList.toggle(
      `slider__step-active`
    );

    this.value = this.#newPosition(e);

    let event = new CustomEvent("slider-change", {
      detail: this.value,
      bubbles: true,
    });
    this.elem.dispatchEvent(event);
  };

  #render(countSteps, startPosition) {
    let template = "";
    let step = Math.round(100 / (countSteps - 1));

    for (let i = 0; i < countSteps; i++) {
      i != startPosition
        ? (template += `<span></span>`)
        : (template += `<span class="slider__step-active"></span>`);
    }

    let templateAll = `<div class="slider">
       <div class="slider__thumb" style="left: ${startPosition * step}%;">
         <span class="slider__value">${startPosition}</span>
       </div>
       <div class="slider__progress" style="width: ${
         startPosition * step
       }%;"></div>
       <div class="slider__steps">
       ${template}
       </div>
     </div>`;

    this.elem = createElement(templateAll);

    this.elem.addEventListener("click", this.#onSliderClick);

    this.elem.addEventListener("dragstart", (e) => {
      e.preventDefault();
    });

    this.elem.addEventListener("pointerdown", this.#onDown);

    return this.elem;
  }

  #onDown = () => {
    this.elem.classList.add("slider_dragging");
    this.elem.addEventListener("pointermove", this.#onMove);
    this.elem.addEventListener("pointerup", this.#onUp, { once: true });
  };

  #onMove = (e) => {
    let thumbSlider = this.elem.querySelector(".slider__thumb");
    let newPercents;

    let changeX = e.pageX - this.elem.getBoundingClientRect().left;

    if (changeX < 0) {
      newPercents = 0;
    } else if (changeX > this.elem.offsetWidth) {
      newPercents = 100;
    } else {
      newPercents = Math.round(
        ((e.pageX - this.elem.getBoundingClientRect().left) /
          this.elem.offsetWidth) *
          100
      );
    }

    thumbSlider.style.left = `${newPercents}%`;

    let valueSlider = this.elem.querySelector(".slider__value");

    this.value = this.#newPosition(e);
    valueSlider.innerHTML = this.value;

    let progressSlider = this.elem.querySelector(".slider__progress");
    progressSlider.style.width = `${newPercents}%`;
  };

  #onUp = () => {
    this.elem.classList.remove("slider_dragging");
    this.elem.removeEventListener("pointermove", this.#onMove);
    let event = new CustomEvent("slider-change", {
      detail: this.value,
      bubbles: true,
    });
    this.elem.querySelector(".slider__thumb").dispatchEvent(event);
  };
}
