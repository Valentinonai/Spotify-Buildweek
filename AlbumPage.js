let audioPlaying = null;
let interval = 0;
const arrayCanzoni = [];
let canzone = null;
const arrayPlayList = JSON.parse(localStorage.getItem("playList")) ? JSON.parse(localStorage.getItem("playList")) : [];
let idToAdd = 0;
const Canzone = {
  id: null,
  titolo: null,
};
window.addEventListener("DOMContentLoaded", () => {
  if (arrayPlayList) {
    arrayPlayList.forEach((elem) => {
      const tuoiPreferiti = document.getElementById("tuoiPreferiti");
      tuoiPreferiti.innerHTML += `<div class="d-flex justify-content-between align-items-center px-1 py-2"><p class="m-0" onclick="showList(event)" data-bs-toggle="modal" data-bs-target="#ModalList">${elem}</p><div onclick="eliminaPlayList(event)"><i class="bi bi-trash" ></i></div></div>`;
    });
  }
  const id = new URLSearchParams(window.location.search).get("albumId");
  fetch(`https://deezerdevs-deezer.p.rapidapi.com/album/${id}`, {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "be9aa8f80cmshcb87ef0073d5d4ep15813fjsn4ee3c6fb8586",
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
    },
  })
    .then((risp) => risp.json())
    .then((album) => {
      let cont = 0;
      document.getElementById("imgAlbum").setAttribute("src", album.cover);
      document.getElementById("nomeAlbum").innerText = album.label;
      document.getElementById("titoloAlbum").innerText = album.title;
      document.getElementById("albumDetail").innerText =
        album.artist.name + " " + album.release_date + " n°" + album.nb_tracks + " brani, " + showTime(album.duration);
      document.getElementById("albumDetail").addEventListener("click", () => {
        window.location.assign("./ArtistPage.html?artistName=" + album.artist.name);
      });
      document.getElementById("albumDetail").style = "cursor:pointer";
      document.getElementById("imgArtista").setAttribute("src", album.artist.picture);
      const like = document.getElementById("like");
      if (localStorage.getItem("idAlbum")) {
        const arrayFavoriti = JSON.parse(localStorage.getItem("idAlbum"));
        arrayFavoriti.forEach((elem) => {
          if (elem === album.id) {
            document.querySelector("#like i:first-of-type").style = "display:none";
            document.querySelector("#like i:last-of-type").style = "display:block";
            document.querySelector("#playerLike i:first-of-type").style = "display:none";
            document.querySelector("#playerLike i:last-of-type").style = "display:block";
            like.classList.add("like");
            document.querySelector("#playerLike i:last-of-type").classList.add("like");
          }
        });
      }
      document.getElementById("imgPlayer").setAttribute("src", album.cover);
      document.getElementById("pBrano").innerText = "";
      document.getElementById("pArtista").innerText = album.artist.name;
      //!SALVATAGGIO PREFERITI
      like.addEventListener("click", () => {
        const arrayFavoriti = JSON.parse(localStorage.getItem("idAlbum"));
        if (like.classList.contains("like")) {
          like.classList.remove("like");
          document.querySelector("#playerLike i:last-of-type").classList.remove("like");
          document.querySelector("#like i:first-of-type").style = "display:block";
          document.querySelector("#like i:last-of-type").style = "display:none";
          document.querySelector("#playerLike i:first-of-type").style = "display:block";
          document.querySelector("#playerLike i:last-of-type").style = "display:none";
          if (arrayFavoriti) {
            for (let i = 0; i < arrayFavoriti.length; i++) {
              if (arrayFavoriti[i] === album.id) {
                arrayFavoriti.splice(i, 1);
                localStorage.setItem("idAlbum", JSON.stringify(arrayFavoriti));
              }
            }
          }
        } else {
          console.log(album);
          like.classList.add("like");
          document.querySelector("#like i:first-of-type").style = "display:none";
          document.querySelector("#like i:last-of-type").style = "display:block";
          document.querySelector("#playerLike i:first-of-type").style = "display:none";
          document.querySelector("#playerLike i:last-of-type").style = "display:block";
          document.querySelector("#playerLike i:last-of-type").classList.add("like");
          if (localStorage.getItem("idAlbum")) {
            arrayFavoriti.push(album.id);
            console.log(album);
            localStorage.setItem("idAlbum", JSON.stringify(arrayFavoriti));
          } else {
            const arrayFavoriti = [];
            arrayFavoriti.push(album.id);
            localStorage.setItem("idAlbum", JSON.stringify(arrayFavoriti));
          }
        }
      });
      //!--------------------------
      album.tracks.data.forEach((element) => {
        const numeroCanzone = document.createElement("div");
        const titoloCanzone = document.createElement("div");
        const addToPlaylist = document.getElementById("addToPlayList");
        const numeroRiproduzioni = document.createElement("div");
        const durata = document.createElement("div");
        const x = document.createElement("div");
        x.innerHTML = `<i class="bi bi-plus"></i>`;
        x.addEventListener("click", () => addToPlayList(element.id, element.title_short));
        x.className = "add";
        x.setAttribute("data-bs-toggle", "modal");
        x.setAttribute("data-bs-target", "#Modal");
        x.setAttribute("data-bs-whatever", "@mdo");
        x.style = "cursor:pointer";
        numeroCanzone.innerText = cont + 1;
        titoloCanzone.innerText = element.title_short;
        titoloCanzone.style = "cursor:pointer";
        if (element.preview) {
          const audio = new Audio(element.preview);
          audio.bottone_di_riferimento = titoloCanzone;
          audio.volume = 0.3;
          arrayCanzoni.push(audio);
          audio.addEventListener("canplaythrough", (evento_load) => {
            const bottone = evento_load.target.bottone_di_riferimento;
            bottone.disabled = false;
            bottone.audio_di_riferimento = evento_load.target;
            titoloCanzone.addEventListener("click", (event) => {
              if (audioPlaying !== null) {
                audio.volume = document.getElementById("volume").value;
                console.dir(audioPlaying);
                audioPlaying.pause();
                audioPlaying.bottone_di_riferimento.audio_di_riferimento.currentTime = 0;
                document.documentElement.style.setProperty("--scroll", `${0}%`);
                clearInterval(interval);
              }
              document.getElementById("pBrano").innerText = element.title_short;
              canzone = element.title_short;
              console.log(element.title);
              document.querySelector("#btnPlay").classList.add("pause");
              document.querySelector("#btnPlay i:first-of-type").style = "display:none";
              document.querySelector("#btnPlay i:last-of-type").style = "display:block";
              document.querySelector("#playPlayer").style = "display:none";
              document.querySelector("#pausePlayer").style = "display:block";
              event.currentTarget.audio_di_riferimento.play();
              audioPlaying = event.target.audio_di_riferimento;
              document.querySelector("#btnPlay").addEventListener("click", playButton);
              document.querySelector("#playPlayer").addEventListener("click", play);
              document.querySelector("#pausePlayer").addEventListener("click", play);
              audioPlaying.addEventListener("play", () => tempoReale(audioPlaying));
              const download = document.getElementById("download");
              download.setAttribute("href", element.preview);
              download.setAttribute("download", "song");
            });
          });
        }
        numeroRiproduzioni.innerText = element.rank;
        durata.innerText = showTime(element.duration);
        cont++;
        document.getElementById("numeroCanzone").appendChild(numeroCanzone);
        document.getElementById("addToPlayList").appendChild(x);
        document.getElementById("titoloCanzone").appendChild(titoloCanzone);
        document.getElementById("numeroRiproduzioni").appendChild(numeroRiproduzioni);
        document.getElementById("durata").appendChild(durata);
        document.getElementById("prevTrack").addEventListener("click", prevSong);
        document.getElementById("nextTrack").addEventListener("click", nextSong);
      });
    })
    .catch((err) => console.log(err));
});

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

const avanti = () => {
  window.history.forward();
};
const indietro = () => {
  window.history.back();
};

const playButton = () => {
  const btn = document.getElementById("btnPlay");
  if (btn.classList.contains("pause")) {
    btn.classList.remove("pause");
    audioPlaying.pause();
    document.querySelector("#btnPlay i:first-of-type").style = "display:block";
    document.querySelector("#btnPlay i:last-of-type").style = "display:none";
    document.querySelector("#playPlayer").style = "display:block";
    document.querySelector("#pausePlayer").style = "display:none";
  } else {
    btn.classList.add("pause");
    audioPlaying.play();
    document.querySelector("#btnPlay i:first-of-type").style = "display:none";
    document.querySelector("#btnPlay i:last-of-type").style = "display:block";
    document.querySelector("#playPlayer").style = "display:none";
    document.querySelector("#pausePlayer").style = "display:block";
  }
};

const play = () => {
  const play = document.querySelector("#playPlayer");
  const pause = document.querySelector("#pausePlayer");
  const btn = document.getElementById("btnPlay");
  if (play.style.display === "none") {
    btn.classList.remove("pause");
    audioPlaying.pause();
    document.querySelector("#btnPlay i:first-of-type").style = "display:block";
    document.querySelector("#btnPlay i:last-of-type").style = "display:none";
    document.querySelector("#playPlayer").style = "display:block";
    document.querySelector("#pausePlayer").style = "display:none";
    play.style = "display:block";
    pause.style = "display:none";
  } else {
    btn.classList.add("pause");
    audioPlaying.play();
    document.querySelector("#btnPlay i:first-of-type").style = "display:none";
    document.querySelector("#btnPlay i:last-of-type").style = "display:block";
    document.querySelector("#playPlayer").style = "display:none";
    document.querySelector("#pausePlayer").style = "display:block";
    play.style = "display:none";
    pause.style = "display:block";
  }
};

const tempoReale = (element) => {
  clearInterval(interval);
  const tAttuale = document.getElementById("tempoAttuale");
  interval = setInterval(() => {
    const x = (100 * element.currentTime) / element.duration;
    document.documentElement.style.setProperty("--scroll", `${x}%`);
  }, 1);
};

const volume = (event) => {
  const vol = parseFloat(event.target.value).toFixed(3);
  audioPlaying.volume = vol;
};

const prevSong = () => {
  for (let i = 0; i < arrayCanzoni.length; i++) {
    if (arrayCanzoni[i].bottone_di_riferimento.innerText === canzone && i > 0) {
      arrayCanzoni[i - 1].volume = document.getElementById("volume").value;

      audioPlaying.pause();
      audioPlaying.bottone_di_riferimento.audio_di_riferimento.currentTime = 0;
      document.documentElement.style.setProperty("--scroll", `${0}%`);
      clearInterval(interval);
      audioPlaying = arrayCanzoni[i - 1];
      document.getElementById("pBrano").innerText = audioPlaying.bottone_di_riferimento.innerText;
      canzone = audioPlaying.bottone_di_riferimento.innerText;
      document.querySelector("#btnPlay").classList.add("pause");
      document.querySelector("#btnPlay i:first-of-type").style = "display:none";
      document.querySelector("#btnPlay i:last-of-type").style = "display:block";
      document.querySelector("#playPlayer").style = "display:none";
      document.querySelector("#pausePlayer").style = "display:block";
      audioPlaying.bottone_di_riferimento.audio_di_riferimento.play();
      document.querySelector("#btnPlay").addEventListener("click", playButton);
      document.querySelector("#playPlayer").addEventListener("click", play);
      document.querySelector("#pausePlayer").addEventListener("click", play);
      audioPlaying.addEventListener("play", () => tempoReale(audioPlaying));
    }
  }
};

const nextSong = () => {
  let appoggio = null;
  for (let i = 0; i < arrayCanzoni.length; i++) {
    if (arrayCanzoni[i].bottone_di_riferimento.innerText === canzone && i < arrayCanzoni.length) {
      arrayCanzoni[i + 1].volume = document.getElementById("volume").value;
      audioPlaying.pause();
      audioPlaying.bottone_di_riferimento.audio_di_riferimento.currentTime = 0;
      document.documentElement.style.setProperty("--scroll", `${0}%`);
      clearInterval(interval);
      audioPlaying = arrayCanzoni[i + 1];
      console.dir(audioPlaying);
      document.getElementById("pBrano").innerText = audioPlaying.bottone_di_riferimento.innerText;
      appoggio = audioPlaying.bottone_di_riferimento.innerText;
      document.querySelector("#btnPlay").classList.add("pause");
      document.querySelector("#btnPlay i:first-of-type").style = "display:none";
      document.querySelector("#btnPlay i:last-of-type").style = "display:block";
      document.querySelector("#playPlayer").style = "display:none";
      document.querySelector("#pausePlayer").style = "display:block";
      audioPlaying.bottone_di_riferimento.audio_di_riferimento.play();
      document.querySelector("#btnPlay").addEventListener("click", playButton);
      document.querySelector("#playPlayer").addEventListener("click", play);
      document.querySelector("#pausePlayer").addEventListener("click", play);
      audioPlaying.addEventListener("play", () => tempoReale(audioPlaying));
    }
  }
  canzone = appoggio;
};
const generaPreferiti = (event) => {
  event.preventDefault();
  const nomePlaylist = document.querySelector("form input").value;
  console.log(nomePlaylist);
  if (nomePlaylist !== "playlist") {
    const tuoiPreferiti = document.getElementById("tuoiPreferiti");
    tuoiPreferiti.innerHTML += `<div class="d-flex justify-content-between align-items-center px-1 py-2"><p class="m-0" onclick="showList(event)" data-bs-toggle="modal" data-bs-target="#ModalList">${nomePlaylist}</p><div onclick="eliminaPlayList(event)"><i class="bi bi-trash" ></i></div></div>`;
    arrayPlayList.push(nomePlaylist);
    localStorage.setItem("playList", JSON.stringify(arrayPlayList));
    document.querySelector("form input").value = "";
  } else {
    alert("nome non valido");
  }
};

const eliminaPlayList = (event) => {
  const index = arrayPlayList.indexOf(event.currentTarget.parentElement.children[0].innerText);
  console.log(index);
  arrayPlayList.splice(index, 1);
  localStorage.removeItem(event.currentTarget.parentElement.children[0].innerText);
  localStorage.setItem("playList", JSON.stringify(arrayPlayList));
  event.currentTarget.parentElement.remove();
  localStorage.removeItem(index);
};

const addToPlayList = (id, titolo) => {
  const select = document.getElementById("listaPlayList");
  select.innerHTML = "";
  arrayPlayList.forEach((elem) => {
    select.innerHTML += `<option>${elem}</option>`;
  });
  Canzone.id = id;
  Canzone.titolo = titolo;
};

const add = (event, id) => {
  event.preventDefault();
  console.dir(event);
  const value = event.target[0].value;
  console.log(id, value);
  const app = JSON.parse(localStorage.getItem(value)) ? JSON.parse(localStorage.getItem(value)) : [];
  app.push(Canzone);
  localStorage.setItem(value, JSON.stringify(app));
};

const showList = async (event) => {
  const array = JSON.parse(localStorage.getItem(event.target.innerText));
  document.getElementById("ModalLabelList").innerText = event.target.innerText;
  const list = document.getElementById("listGroup");
  list.innerHTML = "";
  for (let i = 0; i < array.length; i++) {
    const risp = await (
      await fetch(`https://deezerdevs-deezer.p.rapidapi.com/track/${array[i].id}`, {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": "be9aa8f80cmshcb87ef0073d5d4ep15813fjsn4ee3c6fb8586",
          "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
        },
      })
    ).json();
    list.innerHTML += `<li class="list-group-item d-flex justify-content-between align-items-center" style="background-color: transparent"><p>${risp.title} </p><div onclick="eliminaCanzone(event)"><i class="bi bi-trash"></i></div></li>`;
  }
};

const eliminaCanzone = (event) => {
  console.dir(event.currentTarget.parentElement.parentElement.parentElement.parentElement.children[0].innerText);
  const index = event.currentTarget.parentElement.parentElement.parentElement.parentElement.children[0].innerText;
  const elem = JSON.parse(localStorage.getItem(index));
  console.log(elem, index, event.currentTarget.parentElement.children[0].innerText);
  for (let i = 0; i < elem.length; i++) {
    if (elem[i].titolo === event.currentTarget.parentElement.children[0].innerText) elem.splice(i, 1);
  }
  localStorage.setItem(index, JSON.stringify(elem));
  event.currentTarget.parentElement.remove();
};
