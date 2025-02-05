import { init3D } from "./3d.js";

const main = document.querySelector(".mySwiper > .swiper-wrapper");

fetch("./js/data_main.json")
  .then((res) => res.json())
  .then((data) => {
    data.item.forEach(function (v, k) {
      main.innerHTML += `
        <div class="main-section swiper-slide">
          <div class="tbox-top">
            <span class="tit">${v.name}</span>
          </div>
          <div class="planet-area">
            <img src="${v.imgSrc}" alt="${v.imgAlt}" draggable="false"">
              <div class="click-btn-box">
                <span class="click-btn" data-modeling="${v.modeling}">Click</span>
                <span class="touch-btn" data-modeling="${v.modeling}">Touch</span>
              </div>
          </div>
          <div class="tbox-bottom">
            <div class="con-wrap">
              <div class="planet-info">
                <div class="tit">Length of Year</div>
                <div class="info">${v.days}</div>
              </div>
              <div class="planet-info">
                <div class="tit">Planet Type</div>
                <div class="info">${v.type}</div>
              </div>
            </div>
            <div class="link-btn">
              <a href="#">View More</a>
            </div>
          </div>
        </div>
      `;
    });

    new Swiper(".mySwiper", {
      loop: true,
      speed: 1000,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });

    const modalBtn = document.querySelectorAll(".click-btn, .touch-btn");
    const closeBtn = document.querySelector(".close");
    const modal = document.querySelector(".modal");

    modalBtn.forEach((item) => {
      item.onclick = () => {
        modal.classList.add("active");
        const modelingValue = item.getAttribute("data-modeling");

        init3D(modelingValue); // 클릭 시 3D 초기화 함수 호출

      };
    });

    closeBtn.onclick = () => {
      modal.classList.remove("active");
      const container = document.getElementById("threejs-container");
      container.innerHTML = ""; // 모달 닫을 때 3D 씬 초기화
    };
  });

// script.js
const container = document.querySelector(".container");
const sections = document.querySelectorAll(".section");
let currentIndex = 0;
let isScrolling = false;

// 스크롤 이벤트 핸들러
const handleScroll = (event) => {
  if (isScrolling) return;

  isScrolling = true;

  // 스크롤 방향 감지
  const delta = event.deltaY;

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
window.addEventListener("wheel", handleScroll);
