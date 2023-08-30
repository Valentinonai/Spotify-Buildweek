const url = "https://deezerdevs-deezer.p.rapidapi.com/artist/";
const url1 = "https://deezerdevs-deezer.p.rapidapi.com/search?q=";
const urlProva = "https://api.deezer.com/artist/";
const artistName = new URLSearchParams(window.location.search).get("artistName");
window.onload = async () => {
  const respArtista = await fetch(url + artistName, {
    headers: {
      "X-RapidAPI-Key": "97bfe8c64dmsh1d550482516eb97p178bd4jsn8289c987dce8",
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
    },
  });
  const artistaSelezionato = await respArtista.json();
  console.log(artistaSelezionato);

  const { name, picture, nb_fan, id, picture_xl, tracklist } = artistaSelezionato;
  console.log(name, picture, nb_fan, id, picture_xl, tracklist);
  const divArtistaVerificato = document.getElementById("artistaVerificato");
  console.log(divArtistaVerificato);
  divArtistaVerificato.innerHTML = ` <p>Artista Verificato</p>
  <h1 id="nomeArtista">${name}</h1>
  <p id="ascoltatoriMensili">${nb_fan} ascoltatori mensili</p>`;
  const divHeader = document.getElementById("header");
  divHeader.style.backgroundImage = "url(" + picture_xl + ")";
  const prova = url1 + artistName;
  console.log(prova);
  const RespAlbumArtista = await fetch(urlProva + id);
  const albums = await RespAlbumArtista.json();
  console.log(albums);
  // const album = albums.data;
  // console.log(album);
  // const divBraniArtista = document.getElementById("braniArtista");
  // console.log(divBraniArtista);
  // album.forEach((song) => {
  //   const divBranoSingolo = document.createElement("div");
  //   divBranoSingolo.classList.add("d-flex");
  //   divBraniArtista.classList.add("flex-column");
  //   divBranoSingolo.innerHTML = `<p id="numeroBrano">N</p>
  //        <img class="mx-2" style="object-fit: cover; width: 40px; height: 40px" id="imgBranoPopolare" src="${song.album.cover}" alt="" />
  //        <p id="titoloBranoPopolare">${song.title}</p>
  //        <p id="ascoltiBranoPopolare" class="infoBrano">${song.rank}</p>
  //        <p id="durataBranoPopolare" class="infoBrano">${song.duration}</p>`;
  //   divBraniArtista.appendChild(divBranoSingolo);
  // });
};
