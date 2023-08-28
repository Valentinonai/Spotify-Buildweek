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

/*const creaCards = (albums) => {
  console.log(albums);
  const data = albums.data;
  const suggImg = document.querySelectorAll(".suggImg");
  const suggTitle = document.querySelectorAll(".suggTitle");
  const suggDescription = document.querySelectorAll(".suggDescription");
  const playListTitle = document.querySelectorAll(".playListTitle");
  const playListImg = document.querySelectorAll(".playListImg");

  for (let i = 0; i < numAlbumSugg; i++) {
    const x = Math.floor(Math.random() * data.length);
    suggImg[i].setAttribute("src", data[x].album.cover);
    suggImg[i].addEventListener("click", () => {
      const url = "./AlbumPage.html?albumId=" + data[x].album.id;
      window.location.assign(url);
    });
    console.log(data[x]);
    suggTitle[i].innerText = data[x].title_short;
    suggDescription[i].innerText = data[x].artist.name;
    console.log(albums.data[x].title, albums.data[x].artist.name);
  }
  for (let i = 0; i < 6; i++) {
    const x = Math.floor(Math.random() * albums.data.length);
    playListImg[i].setAttribute("src", albums.data[x].album.cover);
    playListTitle[i].innerText = albums.data[x].title;
  }
};*/

const creaCards = async (albums) => {
  const localPreferiti = JSON.parse(localStorage.getItem("idAlbum"));
  const playListTitle = document.querySelectorAll(".playListTitle");
  const playListImg = document.querySelectorAll(".playListImg");
  const data = albums.data;
  if (localPreferiti) {
    for (let i = 0; i < localPreferiti.length; i++) {
      const risp = await (
        await fetch(`https://striveschool-api.herokuapp.com/api/deezer/album/${localPreferiti[i]}`)
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
