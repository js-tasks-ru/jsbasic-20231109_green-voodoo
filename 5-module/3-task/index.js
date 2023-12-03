function initCarousel() {
  // ваш код...
  let arrowRight = document.querySelector(".carousel__arrow_right");
  let arrowLeft = document.querySelector(".carousel__arrow_left");
  let carouselInner = document.querySelector(".carousel__inner");
  let carousel = document.querySelector(".carousel");

  let offSetWidth = carouselInner.offsetWidth;

  const countSlide = 4;
  let countMove = 0;

  arrowLeft.style.display = "none";

  let onCarouselClick = (e) => {
    if (
      e.target == e.currentTarget ||
      !(
        e.target.classList.contains("carousel__arrow") ||
        e.target.parentNode.classList.contains("carousel__arrow")
      )
    )
      return;

    if (
      e.target.classList.contains("carousel__arrow_right") ||
      e.target.parentNode.classList.contains("carousel__arrow_right")
    )
      ++countMove;
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

    e.stopPropagation();
  };

  carousel.addEventListener("click", onCarouselClick);
}
