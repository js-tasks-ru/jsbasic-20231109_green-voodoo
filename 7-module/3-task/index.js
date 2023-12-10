import createElement from "../../assets/lib/create-element.js";

export default class StepSlider {
  elem = null;
  steps = 0;

  constructor({ steps, value = 0 }) {
    this.steps = steps || this.steps;
    this.value = value;
    this.elem = this.#render(this.steps, this.value);
  }

  #onSliderClick = (e) => {
    let thumbSlider = this.elem.querySelector(".slider__thumb");
    let valueSlider = this.elem.querySelector(".slider__value");
    let progressSlider = this.elem.querySelector(".slider__progress");
    let stepsSlider = this.elem.querySelector(".slider__steps");

    let clickPositionX = Math.round(
      e.pageX - this.elem.getBoundingClientRect().left
    );

    if (clickPositionX < 0) clickPositionX = 0;

    let lengthStep = Math.round(this.elem.offsetWidth / (this.steps - 1));

    let newPosition = Math.round(clickPositionX / lengthStep);

    let newPercents = (100 / (this.steps - 1)) * newPosition;

    thumbSlider.style.left = `${newPercents}%`;
    valueSlider.innerHTML = newPosition;
    progressSlider.style.width = `${newPercents}%`;
    stepsSlider.children[this.value].classList.toggle(`slider__step-active`);
    stepsSlider.children[newPosition].classList.toggle(`slider__step-active`);

    this.value = newPosition;

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

    return this.elem;
  }
}
