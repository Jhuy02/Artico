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
const artico_contact_btnmuangay = document.querySelector(
  "#artico_contact_btnmuangay"
);

artico_contact_btnmuangay.addEventListener("click", function (e) {
  e.preventDefault();
  const targetElement = document.getElementById("reason_form");
  console.log(targetElement);
  targetElement.scrollIntoView({ behavior: "smooth" });
});

async function fetchData() {
  try {
    const responseFilter = await fetch(
      "https://articolageno.okhub-tech.com/wp-json/okhub/v1/rates_cate"
    );

    const dataFilter = await responseFilter.json();
    DataFilter(dataFilter);
  } catch (error) {
    console.error("Fetch error:", error);
    dataContainer.textContent = "Failed to load data.";
  }
}
let category = false;
console.log(category);
const filterStarContainer = document.querySelector(".filter_star");
function DataFilter(data) {
  data?.rates_by_category?.forEach((item) => {
    const category = item?.category_name.replace(" ", "-");
    console.log(category);
    const itemElement = document.createElement("button");
    itemElement.textContent = `${item?.category_name}`;
    itemElement.classList.add("filter_star_btn");
    itemElement.addEventListener("click", () => {
      fetchDataShare(category); // Gọi hàm handleClick khi button được click
    });
    filterStarContainer.appendChild(itemElement);
  });
}
// originalText.replace(' ', '-');
async function fetchDataShare(category) {
  console.log(category);
  try {
    const responseCmt = await fetch(
      `https://articolageno.okhub-tech.com/wp-json/okhub/v1/rates?page=1&per_page=2&category=${
        category ? category : "5-Sao"
      }`
    );
    const dataCmt = await responseCmt.json();
    DataCmt(dataCmt);
  } catch (error) {
    console.error("Fetch error:", error);
    dataContainer.textContent = "Failed to load data.";
  }
}
function DataCmt(data) {
  const shareBoxes = document.querySelectorAll(".share_box");
  shareBoxes.forEach((shareBox) => {
    const shareComments = shareBox.querySelectorAll(".share_comment");
    const share_line_interhtml = shareBox.querySelectorAll(
      ".share_line_interhtml"
    );
    shareComments?.forEach((shareComment) => {
      shareComment.remove(); // Remove the element
    });
    share_line_interhtml?.forEach((i) => {
      i.remove(); // Remove the element
    });
  });
  data?.rates.forEach((item) => {
    const star = parseInt(item?.category_slug[0]);
    const itemElement = `<div class="share_comment">
    <img
      class="share_comment_lineLpc mbhidden"
      src="./svg/lineL.svg"
      alt=""
    />
    <img
      class="share_comment_lineLmb pchidden"
      src="./svg/lineLmb.svg"
      alt=""
    />
    <div class="share_comment_1">
    ${
      item?.question_ask?.avatar?.url
        ? `<img class="share_comment1_img" src="${item?.question_ask?.avatar?.url}" alt="${item?.question_ask?.nick_name}" />`
        : `<div class="share_comment1_noimg">${item?.question_ask?.nick_name}</div>`
    }
      <div class="share_comment1_box">
        <div class="share_comment1_box_name">${
          item?.question_ask?.full_name
        }</div>
        <div class="starRating share_comment1_box_star">
          <p>${star}</p>
        </div>
        ${item?.question_ask?.question}
        <div class="share_comment1_date">${
          item?.question_ask?.date_question
        }</div>
      </div>
    </div>
    <div class="share_comment_2">
    ${
      item?.reply_ask?.avatar_admin?.url
        ? `<img class="share_comment1_img" src="${item?.reply_ask?.avatar_admin?.url}" alt="qtv" />`
        : `<div class="share_comment1_noimg">QTV</div>`
    }
      <div class="share_comment1_box">
        <div class="share_comment1_box_nameqtv">${
          item?.reply_ask?.full_name_admin
        }</div>
        <div class="share_comment1_box_qtv">Quản trị viên</div>
        ${item?.reply_ask?.reply}
        <div class="share_comment1_date">${item?.reply_ask?.date_reply}</div>
      </div>
    </div>
  </div>
  <div class="share_line share_line_interhtml"></div>`;
    document
      .querySelector(".share_box")
      .insertAdjacentHTML("beforeend", itemElement);
    const starContainer = document.querySelectorAll(".starRating");
    for (let i = 0; i < star; i++) {
      const starImg = document.createElement("img");
      starImg.src = "./svg/star.svg";
      starImg.alt = "";
      starContainer?.forEach((i) => {
        i.appendChild(starImg);
      });
    }

    for (let i = star; i < 5; i++) {
      const starImg = document.createElement("img");
      starImg.src = "./svg/starWhite.svg";
      starImg.alt = "";
      starContainer?.forEach((i) => {
        i.appendChild(starImg);
      });
    }
  });
}
fetchDataShare(category);
fetchData();
