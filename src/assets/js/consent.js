(function () {
  var CHIAVE = "spazioxme-cookie-consenso";
  var banner = document.getElementById("cookie-banner");
  var accetta = document.getElementById("cookie-accetta");
  var rifiuta = document.getElementById("cookie-rifiuta");

  function stato() {
    try {
      return localStorage.getItem(CHIAVE);
    } catch (e) {
      return null;
    }
  }

  function salva(valore) {
    try {
      localStorage.setItem(CHIAVE, valore);
    } catch (e) {}
  }

  function mostraBanner() {
    if (banner) banner.hidden = false;
  }

  function nascondiBanner() {
    if (banner) banner.hidden = true;
  }

  // Carica la mappa consent-aware (pagina Contatti)
  function caricaMappa() {
    var mappa = document.getElementById("mappa");
    if (!mappa) return;
    var src = mappa.getAttribute("data-mappa-src");
    if (!src) return;
    mappa.classList.remove("mappa-placeholder");
    mappa.classList.add("mappa-embed");
    mappa.innerHTML =
      '<iframe src="' +
      src +
      '" title="Mappa della posizione di SpazioxMe" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>';
  }

  function accettaTutto() {
    salva("accettato");
    nascondiBanner();
    caricaMappa();
  }

  function rifiutaTutto() {
    salva("rifiutato");
    nascondiBanner();
  }

  // Init consenso
  var s = stato();
  if (s === "accettato") {
    caricaMappa();
  } else if (s !== "rifiutato") {
    mostraBanner();
  }

  if (accetta) accetta.addEventListener("click", accettaTutto);
  if (rifiuta) rifiuta.addEventListener("click", rifiutaTutto);

  // Bottone "Carica la mappa" nel placeholder: carica e memorizza il consenso
  var caricaBtn = document.getElementById("carica-mappa");
  if (caricaBtn) {
    caricaBtn.addEventListener("click", function () {
      salva("accettato");
      nascondiBanner();
      caricaMappa();
    });
  }
})();
