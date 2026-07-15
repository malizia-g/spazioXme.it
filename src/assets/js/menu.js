(function () {
  var toggle = document.getElementById("menu-toggle");
  var menu = document.getElementById("menu-principale");
  if (!toggle || !menu) return;

  function chiudi() {
    menu.classList.remove("is-aperto");
    toggle.setAttribute("aria-expanded", "false");
  }

  function apri() {
    menu.classList.add("is-aperto");
    toggle.setAttribute("aria-expanded", "true");
  }

  toggle.addEventListener("click", function () {
    var aperto = menu.classList.contains("is-aperto");
    if (aperto) {
      chiudi();
    } else {
      apri();
    }
  });

  document.addEventListener("keydown", function (evento) {
    if (evento.key === "Escape" && menu.classList.contains("is-aperto")) {
      chiudi();
      toggle.focus();
    }
  });

  document.addEventListener("click", function (evento) {
    if (
      menu.classList.contains("is-aperto") &&
      !menu.contains(evento.target) &&
      !toggle.contains(evento.target)
    ) {
      chiudi();
    }
  });
})();
