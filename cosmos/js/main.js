import { init3D } from "./3d.js";

window.addEventListener("load", () => {
  const popup = document.querySelector(".swiper-popup");

  // 팝업 표시 후 1초 뒤 사라지게 설정
  setTimeout(() => {
    popup.style.display = "flex";
    popup.style.opacity = 0.5;
  }, 0);

  setTimeout(() => {
    popup.style.opacity = 0;
    setTimeout(() => {
      popup.style.display = "none";
    }, 1000);
  }, 1500);
});

// Swiper 설정
const main = document.querySelector(".mySwiper > .swiper-wrapper");

fetch("./js/data_main.json")
  .then((res) => res.json())
  .then((data) => {
    data.item.forEach((v) => {
      main.innerHTML += `
        <div class="main-section swiper-slide">
          <div class="tbox-top">
            <span class="tit">${v.name}</span>
          </div>
          <div class="planet-area">
            <img src="${v.imgSrc}" alt="${v.imgAlt}" draggable="false">
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
              <a href="${v.href}">View More</a>
            </div>
          </div>
        </div>
      `;
    });

    // Swiper 초기화
    const swiper = new Swiper(".mySwiper", {
      loop: true,
      speed: 1000,
      allowTouchMove: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        1150: {
          allowTouchMove: false,
          slidesPerView: 2,
        },
      },
      on: {
        slideChange: function () {
          document.querySelectorAll(".swiper-slide").forEach((slide) => {
            slide.classList.remove("swiper-slide-active");
          });

          // 현재 중앙에 위치한 슬라이드 찾기
          let activeSlide = document.querySelector(".swiper-slide-next");
          if (activeSlide) {
            activeSlide.classList.add("swiper-slide-active");
          }
        },
      },
    });

    // 모달 이벤트 추가
    const modalBtn = document.querySelectorAll(".click-btn, .touch-btn");
    const closeBtn = document.querySelector(".close");
    const modal = document.querySelector(".modal");

    modalBtn.forEach((item) => {
      item.onclick = () => {
        modal.classList.add("active");
        const modelingValue = item.getAttribute("data-modeling");
        init3D(modelingValue);
      };
    });

    closeBtn.onclick = () => {
      modal.classList.remove("active");
      const container = document.getElementById("threejs-container");
      container.innerHTML = "";
    };
  });
