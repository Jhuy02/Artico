const reason_popup_item = document.querySelectorAll(".reason_popup_item");
const modal_elemet = document.querySelector(".modal");
const close = document.querySelector(".modal_close svg");
const nav_menu_icon_menu = document.getElementById("nav_menu_icon_menu");
const nav_menu_icon_X = document.getElementById("nav_menu_icon_X");
reason_popup_item.forEach((item) => {
  item.addEventListener("click", function () {
    modal_elemet.style.display = "flex";
  });
});
let lastScrollTop = 0;
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", function () {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  if (scrollTop > lastScrollTop) {
    // Cuộn xuống
    navbar.style.transform = "translateY(-110%)"; // Chiều cao của navbar
  } else {
    // Cuộn lên
    navbar.style.transform = "translateY(0%)";
  }
  lastScrollTop = scrollTop;
});

modal_elemet.addEventListener("click", function (event) {
  if (!event.target.closest(".modal_container")) {
    modal_elemet.style.display = "none";
  }
});
close.addEventListener("click", function () {
  modal_elemet.style.display = "none";
});
const modal_navmenufixed = document.querySelector(".modal_navmenufixed");
nav_menu_icon_menu.addEventListener("click", function () {
  modal_navmenufixed.style.transform = "translateX(0%)";
  nav_menu_icon_menu.style.display = "none";
  nav_menu_icon_X.style.display = "block";
  navbar.style.transform = "translateY(0%)";
  document.querySelector("body").style.overflow = "hidden";
});
nav_menu_icon_X.addEventListener("click", function () {
  modal_navmenufixed.style.transform = "translateX(100%)";
  nav_menu_icon_menu.style.display = "block";
  nav_menu_icon_X.style.display = "none";
  document.querySelector("body").style.overflow = "auto";
});
