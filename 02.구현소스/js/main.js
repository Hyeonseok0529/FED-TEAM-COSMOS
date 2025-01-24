// script.js
const container = document.querySelector('.container');
const sections = document.querySelectorAll('.section');
let currentIndex = 0;
let isScrolling = false;

// 스크롤 이벤트 핸들러
const handleScroll = (event) => {
  if (isScrolling) return;

  isScrolling = true;

  // 스크롤 방향 감지
  const delta = event.deltaY; // 음수: 위로, 양수: 아래로

  if (delta > 0 && currentIndex < sections.length - 1) {
    currentIndex++;
  } else if (delta < 0 && currentIndex > 0) {
    currentIndex--;
  }

  // 스크롤 딜레이 후 잠금 해제
  setTimeout(() => {
    isScrolling = false;
  }, 800); // 0.8초 후 잠금 해제
};

// 마우스 휠 이벤트 등록
window.addEventListener('wheel', handleScroll);
