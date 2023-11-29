function toggleText() {
  // ваш код...
  let button = document.querySelector(".toggle-text-button");
  let text = document.querySelector("#text");

  let onClick = (e) => {
    text.hasAttribute("hidden")
      ? text.removeAttribute("hidden")
      : text.setAttribute("hidden", true);

    e.stopPropagation();
  };

  button.addEventListener("click", onClick, false);
}
