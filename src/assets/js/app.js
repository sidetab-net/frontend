const backToTopBtn = document.querySelector('.back-to-top');
window.addEventListener("scroll", () => {
     if (window.pageYOffset > 400) {
          backToTopBtn.style.display = "grid";
     } else {
          backToTopBtn.style.display = "none";
     }
});
