// 커서
const cursor = document.querySelector('.cursor');
document.addEventListener("mousemove",function(e){
  const mouseX = e.clientX;
  const mouseY = e.clientY;
  cursor.style.left = mouseX + "px";
  cursor.style.top = mouseY + "px";
});