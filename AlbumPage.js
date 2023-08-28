window.addEventListener("DOMContentLoaded", () => {
  const id = new URLSearchParams(window.location.search).get("albumId");
  fetch(`https://striveschool-api.herokuapp.com/api/deezer/album/${id}`)
    .then((risp) => risp.json())
    .then((album) => {
      let cont = 0;
      console.log(album);
      console.log(album.cover);
      document.getElementById("imgAlbum").setAttribute("src", album.cover);
      album.tracks.data.forEach((element) => {
        const numeroCanzone = document.createElement("div");
        const titoloCanzone = document.createElement("div");
        const numeroRiproduzioni = document.createElement("div");
        const durata = document.createElement("div");
        numeroCanzone.innerText = cont + 1;
        titoloCanzone.innerText = element.title_short;
        numeroRiproduzioni.innerText = element.rank;
        durata.innerText = showTime(element.duration);
        cont++;
        document.getElementById("numeroCanzone").appendChild(numeroCanzone);
        document.getElementById("titoloCanzone").appendChild(titoloCanzone);
        document.getElementById("numeroRiproduzioni").appendChild(numeroRiproduzioni);
        document.getElementById("durata").appendChild(durata);
      });
    })
    .catch((err) => console.log(err));
});

const showTime = (time) => {
  let minuti = parseInt(time / 60);
  const ore = parseInt(minuti / 60);
  const secondi = time % 60;
  minuti = minuti - ore * 60;
  console.log(ore, minuti, secondi);
  let tempo = 0;
  if (ore > 0) {
    tempo = `${ore} h  ${minuti} m  ${secondi} s`;
  } else if (minuti > 0) {
    tempo = `${minuti} m  ${secondi} s`;
  } else {
    tempo = `${secondi} s`;
  }
  return tempo;
};
