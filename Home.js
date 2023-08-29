const numAlbumSugg = 5;

window.addEventListener("DOMContentLoaded", () => {
  creaSong();
  fetch(" https://striveschool-api.herokuapp.com/api/deezer/search?q=album")
    .then((risp) => risp.json())
    .then((albums) => {
      console.log(albums);
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
    for (let i = 0; i < numAlbumSugg; i++) {
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

      document.getElementById("tuoiFavoriti").innerHTML += `
    <div class="p-2 favoriti rounded">
      <div class="rounded overflow-hidden" style="position:relative">
        <img src="${risp.cover_big}" alt="img" width="100%" class="suggImg" onclick='window.location.assign("${url}")'/>
        <div class="listHeart"><i class="bi bi-heart-fill"></i></div>
      </div>
      <h6 class="mt-4 suggTitle">${risp.title}</h6>
      <p class="suggDescription pb-2">${risp.artist.name}</p>
  </div><br>`;
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
  const p = document.querySelector("#mainDetails p");
  try {
    const risp = await fetch(" https://striveschool-api.herokuapp.com/api/deezer/search?q=song");
    const songs = await risp.json();
    const x = Math.floor(Math.random() * songs.data.length);
    mainImg.setAttribute("src", songs.data[x].album.cover);
    h5.innerText = songs.data[x].album.title;
    h1.innerText = songs.data[x].title_short;
    h6.innerText = songs.data[x].artist.name;
    p.innerText = songs.data[x].artist.link;
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

      document.getElementById("tuoiFavoriti").innerHTML += `
    <div class="p-2 favoriti rounded">
      <div class="rounded overflow-hidden" style="position:relative">
        <img src="${risp.cover_big}" alt="img" width="100%" class="suggImg" onclick='window.location.assign("${url}")'/>
        <div class="listHeart"><i class="bi bi-heart-fill"></i></div>
      </div>
      <h6 class="mt-4 suggTitle">${risp.title}</h6>
      <p class="suggDescription pb-2">${risp.artist.name}</p>
  </div><br>`;
    }
  }
};
