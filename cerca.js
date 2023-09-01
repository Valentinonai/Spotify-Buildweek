const colori = ["#CE4321", "#223161", "#D4325E", "#408827", "#B05E22", "#CD3188"];
const titoli = ["Podcast", "Nuove uscite", "Pop", "Rock", "Dance", "Hip Hop", "Latina", "Classifiche"];
let cont = 0;
let cont1 = 0;
window.addEventListener("DOMContentLoaded", () => {
  for (let i = 0; i < 50; i++) {
    creaCopertina(i);
  }
});

const creaCopertina = (num) => {
  const esempiRicerca = document.getElementById("esempiRicerca");
  const colore = colori[cont];
  const titolo = titoli[cont];
  cont++;
  cont1++;
  if (cont === colori.length - 1) cont = 0;
  if (cont1 === titoli.length - 1) cont1 = 0;
  const col = document.createElement("div");
  const contenitore = document.createElement("div");
  col.className = "col";
  contenitore.className = "contenitore";
  contenitore.style.backgroundColor = colore;
  const img = document.createElement("img");
  img.setAttribute("src", `./assets/imgs/search/image-${num + 1}.jpg`);
  img.className = "immagine";
  const tit = document.createElement("h2");
  tit.innerText = titolo;
  tit.className = "titolo";
  contenitore.appendChild(tit);
  contenitore.appendChild(img);
  col.appendChild(contenitore);
  esempiRicerca.appendChild(col);
};

const cerca = (event) => {
  event.preventDefault();
  const x = document.getElementById("ricerca").value.replaceAll(" ", "-");
  window.location.assign("./ArtistPage.html?artistName=" + x);
};

const avanti = () => {
  window.history.forward();
};
const indietro = () => {
  window.history.back();
};
