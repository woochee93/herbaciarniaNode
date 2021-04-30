// -------------------------------------SCROLLER

const btn = document.querySelector("button.scrollToTop");

const divHamburger = document.querySelector("div.hamburger");
const listHamburger = [...document.querySelectorAll("div.hamburger ul li")];
const scrollTop = () => {
  window.scrollTo(0, 0);
};

window.addEventListener("scroll", () => {
  if (window.scrollY > 800) {
    btn.style.opacity = 1;
    btn.addEventListener("click", scrollTop);
    btn.style.cursor = "pointer";
    btn.style.zIndex = 1;
    divHamburger.classList.add("active");
  } else {
    btn.removeEventListener("click", scrollTop);
    btn.style.opacity = 0;
    btn.style.zIndex = -1;
    btn.style.cursor = "unset";
    divHamburger.classList.remove("active");
    listHamburger.forEach((item) => {
      item.classList.remove("active");
    });
  }
});
// --------------------scrollEfect-----------------------
const items = [
  ".col-sm-12.passion",
  ".row.gallery",
  ".services_section",
  ".client_section",
  ".contact_section",
  ".contact_section_2",
];

let ratio = 2;
if (window.innerHeight > window.innerWidth) {
  ratio = 80;
} else {
  ratio = 2;
}

$(document).on("scroll", function () {
  items.forEach((item) => {
    const height = $(item).height();
    const topDistance = $(item).offset().top;
    if (
      $(document).scrollTop() >
      topDistance + height / ratio - $(window).height()
    ) {
      $(item).addClass("active");
    }
    if ($(document).scrollTop() < 100) {
      $(item).removeClass("active");
    }
  });
});

const btnHamburger = document.querySelector(
  "div.hamburger ul li:first-of-type"
);
const listHamburger2 = document.querySelector("div.hamburger ul");
btnHamburger.addEventListener("click", () => {
  listHamburger2.classList.toggle("active");
});
// duu
