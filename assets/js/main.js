
(function(){
  const path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".site-nav a[data-page]").forEach(function(link){
    if(link.getAttribute("data-page") === path){
      link.classList.add("active");
    }
  });

  const year = document.querySelector("[data-year]");
  if(year) year.textContent = new Date().getFullYear();

  const img = document.querySelector(".portrait");
  const mono = document.querySelector(".monogram");
  if(img && mono){
    img.addEventListener("error", function(){
      img.style.display = "none";
      mono.style.display = "flex";
    });
  }
})();
