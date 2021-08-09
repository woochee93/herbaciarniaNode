const itemsNews = document.querySelectorAll("div.news div.item");
const itemsWorkshop = document.querySelectorAll("div.workshop div.item");
const btnsactivator = [...document.querySelectorAll(".activator")];
const newsWrap = document.querySelector("div.news");
const workshopWrap = document.querySelector("div.workshop");
const moreButtonNews = document.querySelector(".moreArticle--news");
const moreButtonWorkshop = document.querySelector(".moreArticle--workshop");
btnsactivator.forEach((button) => {
  button.addEventListener("click", () => {
    if (!button.classList.contains("active")) {
      const srollToActive = () => {
        const topDistance = $(button).offset().top;
        window.scrollTo(0, topDistance);
      };
      window.setTimeout(srollToActive, 100); // wait to items height
    }
    if (button.id === "workshop") {
      workshopWrap.classList.toggle("active");
      itemsWorkshop.forEach((itemWorkshop) => {
        itemWorkshop.classList.toggle("active");
      });
      moreButtonWorkshop.classList.toggle("active");
    } else {
      newsWrap.classList.toggle("active");
      itemsNews.forEach((itemNews) => {
        itemNews.classList.toggle("active");
      });
      moreButtonNews.classList.toggle("active");
    }
    const activeBtn = btnsactivator.filter((activator) => {
      return activator.id === button.id;
    });
    activeBtn.forEach((item) => {
      item.classList.toggle("active");
    });
  });
});
