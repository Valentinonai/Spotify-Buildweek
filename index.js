document.addEventListener("DOMContentLoaded", function () {
  const dropdownIcon = document.querySelector(".dropdown-icon");
  const dropdownContent = document.querySelector(".dropdown-content");

  dropdownIcon.addEventListener("click", function () {
    if (dropdownContent.style.display === "block" || !dropdownContent.style.display) {
      dropdownContent.style.display = "none";
    } else {
      dropdownContent.style.display = "block";
    }
  });

  window.addEventListener("click", function (event) {
    if (!event.target.closest(".sidebar")) {
      dropdownContent.style.display = "none";
    }
  });
});
