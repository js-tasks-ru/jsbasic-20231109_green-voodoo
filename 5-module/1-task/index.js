function hideSelf() {
  // ваш код...
  let button = document.querySelector(".hide-self-button");

  let onClick = (e) => {
    button.setAttribute("hidden", true);
    e.stopPropagation();
  };

  button.addEventListener("click", onClick, false);
}
