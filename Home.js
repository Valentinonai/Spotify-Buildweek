const numAlbumSugg = 5;
let Song = null;
let interval = null;
window.addEventListener("DOMContentLoaded", () => {
  creaSong();
  fetch(" https://striveschool-api.herokuapp.com/api/deezer/search?q=album")
    .then((risp) => risp.json())
    .then((albums) => {
      creaCards(albums);
    })
    .catch((err) => {
      console.log(err);
    });
});

const creaCards = async (albums) => {
  const localPreferiti = JSON.parse(localStorage.getItem("idAlbum"));
  const playListTitle = document.querySelectorAll(".playListTitle");
  const playListImg = document.querySelectorAll(".playListImg");
  const data = albums.data;
  if (localPreferiti) {
    let cont = 0;
    if (localPreferiti.length > 5) cont = 5;
    else cont = localPreferiti.length;
    for (let i = 0; i < cont; i++) {
      console.log(localPreferiti[i]);
      const risp = await (
        await fetch(`https://deezerdevs-deezer.p.rapidapi.com/album/${localPreferiti[i]}`, {
          method: "GET",
          headers: {
            "X-RapidAPI-Key": "be9aa8f80cmshcb87ef0073d5d4ep15813fjsn4ee3c6fb8586",
            "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
          },
        })
      ).json();
      const url = "./AlbumPage.html?albumId=" + risp.id;
      console.log(risp);
      document.getElementById("suggerimenti").innerHTML += `
      <div class="col">
      <div class="p-2 favoriti rounded">
        <div class="rounded overflow-hidden" style="position:relative">
          <img src="${risp.cover}" alt="img" width="100%" class="suggImg" onclick='window.location.assign("${url}")'/>
          <div class="listHeart"><i class="bi bi-heart-fill"></i></div>
        </div>
        <h6 class="mt-2 suggTitle">${risp.title}</h6>
        <p class="suggDescription">${risp.artist.name}</p>
      </div>
    </div>`;
    }
  }
  for (let i = 0; i < 6; i++) {
    const x = Math.floor(Math.random() * data.length);
    playListImg[i].setAttribute("src", data[x].album.cover);
    playListImg[i].addEventListener("click", () => {
      const url = "./AlbumPage.html?albumId=" + data[x].album.id;
      window.location.assign(url);
    });
    playListTitle[i].innerText = albums.data[x].title;
  }
};

const creaSong = async () => {
  const mainImg = document.querySelector("#mainImg");
  const h5 = document.querySelector("#mainDetails h5");
  const h1 = document.querySelector("#mainDetails h1");
  const h6 = document.querySelector("#mainDetails h6");
  try {
    const risp = await fetch(" https://striveschool-api.herokuapp.com/api/deezer/search?q=song");
    const songs = await risp.json();
    const x = Math.floor(Math.random() * songs.data.length);
    console.log(songs.data[x]);
    mainImg.setAttribute("src", songs.data[x].album.cover);
    mainImg.addEventListener("click", () => {
      window.location.assign("./AlbumPage.html?albumId=" + songs.data[x].album.id);
    });
    h5.innerText = songs.data[x].album.title;
    h1.innerText = songs.data[x].title_short;
    h6.innerText = songs.data[x].artist.name;
    //!Audio
    const audio = new Audio(songs.data[x].preview);
    audio.bottone_di_riferimento = document.querySelector("#mainAlbumBtn button:first-of-type");
    audio.volume = 0.3;
    audio.addEventListener("canplaythrough", (evento_load) => {
      const bottone = evento_load.target.bottone_di_riferimento;
      bottone.disabled = false;
      bottone.audio_di_riferimento = evento_load.target;
      const play = document.querySelector("#mainAlbumBtn button:first-of-type");
      console.log(play);
      if (play.classList.contains("pause")) {
        play.classList.remove("pause");
      }
      document.querySelector("#mainAlbumBtn button:first-of-type").addEventListener("click", (event) => {
        document.getElementById("pBrano").innerText = songs.data[x].album.title;
        Song = event.target.audio_di_riferimento;
        document.getElementById("imgPlayer").setAttribute("src", songs.data[x].album.cover);
        document.querySelector("#playPlayer").style = "display:none";
        document.querySelector("#pausePlayer").style = "display:block";
        event.target.audio_di_riferimento.play();
        playButton();
        document.querySelector("#playPlayer").addEventListener("click", play);
        document.querySelector("#pausePlayer").addEventListener("click", play);
        Song.addEventListener("play", () => tempoReale(Song));
      });
    });
  } catch (error) {
    console.log(error);
  }
};

const showMore = async () => {
  const localPreferiti = JSON.parse(localStorage.getItem("idAlbum"));
  const showMoreId = document.querySelector("#showMoreiD");
  showMoreId.style = "display:none";
  if (localPreferiti) {
    for (let i = 5; i < localPreferiti.length; i++) {
      const risp = await (
        await fetch(`https://deezerdevs-deezer.p.rapidapi.com/album/${localPreferiti[i]}`, {
          method: "GET",
          headers: {
            "X-RapidAPI-Key": "be9aa8f80cmshcb87ef0073d5d4ep15813fjsn4ee3c6fb8586",
            "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
          },
        })
      ).json();
      console.log(risp);
      const url = "./AlbumPage.html?albumId=" + risp.id;
      document.getElementById("suggerimenti").innerHTML += `
      <div class="col">
      <div class="p-2 favoriti rounded">
        <div class="rounded overflow-hidden" style="position:relative">
          <img src="${risp.cover}" alt="img" width="100%" class="suggImg" onclick='window.location.assign("${url}")'/>
          <div class="listHeart"><i class="bi bi-heart-fill"></i></div>
        </div>
        <h6 class="mt-2 suggTitle">${risp.title}</h6>
        <p class="suggDescription">${risp.artist.name}</p>
      </div>
    </div>`;
    }
  }
};

const avanti = () => {
  window.history.forward();
};
const indietro = () => {
  window.history.back();
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
  Song.volume = vol;
};
const playButton = () => {
  const play = document.querySelector("#mainAlbumBtn button:first-of-type");
  if (play.classList.contains("pause")) {
    play.classList.remove("pause");
    play.innerText = "Play";
    Song.pause();
    document.querySelector("#playPlayer").style = "display:block";
    document.querySelector("#pausePlayer").style = "display:none";
  } else {
    console.log("ciao");
    play.classList.add("pause");
    play.innerText = "Pause";
    Song.play();
    document.querySelector("#playPlayer").style = "display:none";
    document.querySelector("#pausePlayer").style = "display:block";
  }
};

const play = () => {
  const play = document.querySelector("#playPlayer");
  const pause = document.querySelector("#pausePlayer");
  const btn = document.querySelector("#mainAlbumBtn button:first-of-type");
  if (play.style.display === "none") {
    btn.classList.remove("pause");
    Song.pause();
    btn.innerText = "Play";
    document.querySelector("#playPlayer").style = "display:block";
    document.querySelector("#pausePlayer").style = "display:none";
    play.style = "display:block";
    pause.style = "display:none";
  } else {
    btn.classList.add("pause");
    Song.play();
    btn.innerText = "Pause";
    document.querySelector("#playPlayer").style = "display:none";
    document.querySelector("#pausePlayer").style = "display:block";
    play.style = "display:none";
    pause.style = "display:block";
  }
};
