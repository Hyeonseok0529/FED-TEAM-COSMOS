// 커서
const cursor = document.querySelector('.cursor');
document.addEventListener("mousemove",function(e){
  const mouseX = e.pageX;
  const mouseY = e.pageY;
  cursor.style.left = mouseX + "px";
  cursor.style.top = mouseY + "px";
});