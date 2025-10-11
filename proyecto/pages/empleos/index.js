document.querySelector(".results-box")?.addEventListener("click", (event) => {
  const target = event.target;

  if (target.tagName == "BUTTON") {
    target.innerText = "¡Aplicado!";
    target.classList.add("applied");
    target.disabled = true;
  }
});
