window.addEventListener("DOMContentLoaded", () => {});
const generaPreferiti = () => {
  const input = document.getElementById("inputPreferiti").value;
  const pref = document.getElementById("tuoiPreferiti");
  pref.innerHTML = `<div class="d-flex justify-content-between align-items-center"><h6>${input}<h6><span class="text-danger"><i class="bi bi-trash"></i></span> </div>`;
};
