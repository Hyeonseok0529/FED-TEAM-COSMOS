const head = document.getElementById("header");

let pos = { y: 0, y2: 0, status: true };

window.addEventListener("scroll", function () {
  pos.y = window.pageYOffset;

  //삼항연산자
  pos.status = pos.y > pos.y2 ? true : false;

  pos.y2 = pos.y;

  if (pos.status) {
    head.classList.add("active");
  } else {
    head.classList.remove("active");
  }
});
