const galleryItems = document.querySelectorAll(".gallery_wrapper__element");
const coverItems = document.querySelectorAll(".gallery_wrapper__element-cover");
const backgroundItems = document.querySelectorAll(
  ".gallery_wrapper__element-background"
);

coverItems.forEach((galleryItem, index) => {
  galleryItem.addEventListener("mouseover", () => {
    galleryItems[index].style.transform = "scale(1.2)";
    backgroundItems[index].style.transform = "scale(1.4)";
    backgroundItems[index].style.transition = "10s linear";
  });
  galleryItem.addEventListener("mouseout", () => {
    galleryItems[index].style.transform = "scale(1.1)";
    backgroundItems[index].style.transform = "scale(1)";
    backgroundItems[index].style.transition = "0.4s linear";
  });
});
