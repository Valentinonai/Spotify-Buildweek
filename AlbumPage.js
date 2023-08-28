window.addEventListener("DOMContentLoaded", () => {
  const id = new URLSearchParams(window.location.search).get("albumId");
  fetch(`https://striveschool-api.herokuapp.com/api/deezer/album/${id}`)
    .then((risp) => risp.json())
    .then((album) => {
      let cont = 0;
      console.log(album);
      console.log(album.cover);
      document.getElementById("imgAlbum").setAttribute("src", album.cover);
      document.getElementById("nomeAlbum").innerText = album.label;
      document.getElementById("titoloAlbum").innerText = album.title;
      document.getElementById("albumDetail").innerText =
        album.artist.name + " " + album.release_date + " n°" + album.nb_tracks + " brani, " + showTime(album.duration);
      document.getElementById("imgArtista").setAttribute("src", album.artist.picture);
      const like = document.getElementById("like");
      if (localStorage.getItem("idAlbum")) {
        const arrayFavoriti = JSON.parse(localStorage.getItem("idAlbum"));
        arrayFavoriti.forEach((elem) => {
          if (elem === album.id) {
            document.querySelector("#like i:first-of-type").style = "display:none";
            document.querySelector("#like i:last-of-type").style = "display:block";
            like.classList.add("like");
          }
        });
      }
      //!SALVATAGGIO PREFERITI
      like.addEventListener("click", () => {
        const arrayFavoriti = JSON.parse(localStorage.getItem("idAlbum"));
        if (like.classList.contains("like")) {
          like.classList.remove("like");
          document.querySelector("#like i:first-of-type").style = "display:block";
          document.querySelector("#like i:last-of-type").style = "display:none";
          console.log(album.id);
          if (arrayFavoriti) {
            for (let i = 0; i < arrayFavoriti.length; i++) {
              if (arrayFavoriti[i] === album.id) {
                arrayFavoriti.splice(i, 1);
                localStorage.setItem("idAlbum", JSON.stringify(arrayFavoriti));
              }
            }
          }
        } else {
          like.classList.add("like");
          document.querySelector("#like i:first-of-type").style = "display:none";
          document.querySelector("#like i:last-of-type").style = "display:block";
          if (localStorage.getItem("idAlbum")) {
            arrayFavoriti.push(album.id);
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
  let ore = parseInt(minuti / 60);
  let secondi = time % 60;
  minuti = minuti - ore * 60;
  let tempo = 0;
  if (minuti < 10) minuti = "0" + minuti.toString();
  if (secondi < 10) secondi = "0" + secondi.toString();
  if (ore < 10) ore = "0" + ore.toString();
  console.log(minuti, secondi);
  if (ore > 0) {
    tempo = `${ore}:${minuti}:${secondi}`;
  } else if (minuti > 0) {
    tempo = `${minuti}:${secondi}`;
  } else {
    tempo = `0:${secondi}`;
  }
  return tempo;
};
