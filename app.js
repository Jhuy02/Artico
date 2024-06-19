const reason_popup_item = document.querySelectorAll(".reason_popup_item");
const modal_elemet = document.querySelector(".modal");
reason_popup_item.forEach((item) => {
  item.addEventListener("click", function () {
    console.log("lot");
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
