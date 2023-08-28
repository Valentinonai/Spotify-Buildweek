const numAlbumSugg = 5;

window.addEventListener("DOMContentLoaded", () => {
  creaSong();
  fetch(" https://striveschool-api.herokuapp.com/api/deezer/search?q=albums")
    .then((risp) => risp.json())
    .then((albums) => {
      creaCards(albums);
    })
    .catch((err) => {
      console.log(err);
    });
});

const creaCards = (albums) => {
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
    suggTitle[i].innerText = data[x].title;
    suggDescription[i].innerText = data[x].artist.name;
    console.log(albums.data[x].title, albums.data[x].artist.name);
  }
  for (let i = 0; i < 6; i++) {
    const x = Math.floor(Math.random() * albums.data.length);
    playListImg[i].setAttribute("src", albums.data[x].album.cover);
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
    console.log(songs);
    const x = Math.floor(Math.random() * songs.data.length);
    console.log("prova");
    mainImg.setAttribute("src", songs.data[x].album.cover);
    h5.innerText = songs.data[x].album.title;
    h1.innerText = songs.data[x].title_short;
    h6.innerText = songs.data[x].artist.name;
    p.innerText = songs.data[x].artist.link;
  } catch (error) {
    console.log(error);
  }
};
