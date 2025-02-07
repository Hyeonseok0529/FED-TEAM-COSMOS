// 커서
const cursor = document.querySelector('.cursor');
let mouseX = 0;
let mouseY = 0;
let currentX = 0;
let currentY = 0;
const speed = 0.5 // 부드러운 이동을 위한 속도

document.addEventListener("mousemove", function(e) {
  mouseX = e.pageX;
  mouseY = e.pageY;
});

function animateCursor() {
  // 마우스의 위치와 커서의 위치를 일정 비율로 가까워지게 만듦
  currentX += (mouseX - currentX) * speed;
  currentY += (mouseY - currentY) * speed;

  cursor.style.transform = `translate(${currentX}px, ${currentY}px)`;

  // requestAnimationFrame을 호출하여 반복적으로 애니메이션
  requestAnimationFrame(animateCursor);
}

animateCursor(); // 애니메이션 시작
