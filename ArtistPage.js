const url = "https://deezerdevs-deezer.p.rapidapi.com/artist/";
const url1 = "https://striveschool-api.herokuapp.com/api/deezer/artist/";
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

  const { name, picture, nb_fan, id, picture_xl, picture_small } = artistaSelezionato;
  console.log(name, picture, nb_fan, id, picture_xl, picture_small);
  const divArtistaVerificato = document.getElementById("artistaVerificato");
  console.log(divArtistaVerificato);
  divArtistaVerificato.innerHTML = ` <i class="bi bi-patch-check-fill"> <p>Artista Verificato</p></div>
  <h1 id="nomeArtista">${name}</h1>
  <p id="ascoltatoriMensili">${nb_fan} ascoltatori mensili</p>`;
  const divHeader = document.getElementById("header");
  divHeader.style.backgroundImage = "url(" + picture_xl + ")";

  const RespAlbumArtista = await fetch(url1 + id + "/top?limit=10");
  const albums = await RespAlbumArtista.json();
  console.log(albums);
  const album = albums.data;
  console.log(album);
  //////////////////////////////////////////////////////////

  const showTime = (time) => {
    let minuti = parseInt(time / 60);
    let ore = parseInt(minuti / 60);
    let secondi = time % 60;
    minuti = minuti - ore * 60;
    let tempo = 0;
    if (minuti < 10) minuti = "0" + minuti.toString();
    if (secondi < 10) secondi = "0" + secondi.toString();
    if (ore < 10) ore = "0" + ore.toString();
    if (ore > 0) {
      tempo = `${ore}:${minuti}:${secondi}`;
    } else if (minuti > 0) {
      tempo = `${minuti}:${secondi}`;
    } else {
      tempo = `0:${secondi}`;
    }
    return tempo;
  };
  ////////////////////////////////////////////////////////////
  const divBraniArtista = document.getElementById("braniArtista");
  console.log(divBraniArtista);
  let cont = 0;
  if (album.length > 5) cont = 5;
  else cont = album.length;
  for (let i = 0; i < cont; i++) {
    const divBranoSingolo = document.createElement("div");
    divBranoSingolo.classList.add("d-flex");
    divBranoSingolo.classList.add("justify-content-between");
    divBraniArtista.classList.add("flex-column");
    divBraniArtista.classList.add("flex-grow-1");
    divBraniArtista.classList.add("gap-3");
    console.log(album.length);
    divBranoSingolo.innerHTML = ` <div class="d-flex w-50"> <p id="numeroBrano">${i + 1}</p>
          <img class="px-1" style="object-fit: cover; width: 40px; height: 40px; align-self:center" " id="imgBranoPopolare" src="${
            album[i].album.cover
          }" alt="" />
          <p class="m-0 align-self-center"  id="titoloBranoPopolare">${album[i].title}</p> </div>
          <p  class="m-0 align-self-center w-25"  id="ascoltiBranoPopolare" class="infoBrano">${album[i].rank}</p>
          <p class="m-0 align-self-center w-25" id="durataBranoPopolare" class="infoBrano">${album[i].duration}</p>`;
    divBraniArtista.appendChild(divBranoSingolo);
  }
  const divBraniLiked = document.getElementById("braniLiked");
  divBraniLiked.innerHTML = `<div><img width="50px" src="${picture_small}" alt="" /></div>
  <div>
    <h6 id="braniLiked">Hai messo Mi piace a 11 brani</h6>
    <p id="bandLiked">di ${name}</p>
  </div>`;
  ///////////////////////////////////////////////////////////////////////////////////////////
  const visualizzaAltro = document.getElementById("visualizzaAltro");
  console.log(visualizzaAltro);
  visualizzaAltro.addEventListener("click", async function () {
    visualizzaAltro.classList.add("hideDiv");
    divBraniArtista.classList.add("hideDiv");
    const RespAlbumArtista = await fetch(url1 + artistName, {
      headers: {
        "X-RapidAPI-Key": "97bfe8c64dmsh1d550482516eb97p178bd4jsn8289c987dce8",
        "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
      },
    });
    const albumsCompleto = await RespAlbumArtista.json();
    console.log(albumsCompleto);
    const { name, picture, nb_fan, id, picture_xl, picture_small } = albumsCompleto;
    console.log(name, picture, nb_fan, id, picture_xl, picture_small);
    const RespAlbums = await fetch(url1 + id + "/top?limit=15");
    const albums = await RespAlbums.json();
    console.log(albums.data);
    const divBraniArtistaAll = document.getElementById("braniArtistaAll");
    console.log(divBraniArtistaAll);

    /////////////////////////////////////////////////////////////////////////////

    let cont = 15;
    for (let i = 0; i < cont; i++) {
      let divBranoSingolo = document.createElement("div");
      divBranoSingolo.classList.add("d-flex");
      divBranoSingolo.classList.add("justify-content-between");
      divBraniArtistaAll.classList.add("flex-column");
      divBraniArtistaAll.classList.add("flex-grow-1");
      divBraniArtistaAll.classList.add("gap-3");
      console.log(albums.data.length);
      divBranoSingolo.innerHTML = ` <div class="d-flex w-50"> <p id="numeroBrano">${i + 1}</p>
             <img class="px-1" style="object-fit: cover; width: 40px; height: 40px; align-self:center" " id="imgBranoPopolare" src="${
               albums.data[i].album.cover
             }" alt="" />
             <p class="m-0 align-self-center"  id="titoloBranoPopolare">${albums.data[i].title}</p> </div>
             <p  class="m-0 align-self-center w-25"  id="ascoltiBranoPopolare" class="infoBrano">${
               albums.data[i].rank
             }</p>
             <p class="m-0 align-self-center w-25" id="durataBranoPopolare" class="infoBrano">${
               albums.data[i].duration
             }</p>`;
      divBraniArtistaAll.appendChild(divBranoSingolo);
    }
    const divBraniLiked = document.getElementById("braniLiked");
    divBraniLiked.innerHTML = `<div><img width="50px" src="${picture_small}" alt="" /></div>
     <div>
       <h6 id="braniLiked">Hai messo Mi piace a 11 brani</h6>
       <p id="bandLiked">di ${name}</p>
     </div>`;
  });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
