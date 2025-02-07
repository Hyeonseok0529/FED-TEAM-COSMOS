import { init3D } from "./3d.js";

window.addEventListener('load', () => {
  const popup = document.querySelector('.swiper-popup');

  // 팝업을 1초 뒤에 나타나게 함
  setTimeout(() => {
    popup.style.display = 'flex';
    popup.style.opacity = 0.5; // 팝업이 1초 동안 서서히 보이게 함
  }, 0); // 페이지 로드 직후

  // 2초 뒤에 팝업을 사라지게 함
  setTimeout(() => {
    popup.style.opacity = 0;
    setTimeout(() => {
      popup.style.display = 'none';
    }, 1000);
  }, 1500);
});

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
            <img src="${v.imgSrc}" alt="${v.imgAlt}" draggable="false" data-slide="${k}">
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

    const swiper = new Swiper(".mySwiper", {
      loop: true,
      speed: 1000,
      allowTouchMove: true,
      breakpoints: {
        1150: {
          allowTouchMove: false,
          slidesPerView: 2,
        },
      },
    });

    // 행성 이미지를 클릭했을 때 해당 슬라이드로 이동
    const planetImages = document.querySelectorAll('.planet-area img');
    planetImages.forEach(image => {
      image.addEventListener('click', (e) => {
        const clickedPlanet = e.target;
        const currentIndex = Array.from(planetImages).indexOf(clickedPlanet);

        const isPrev = currentIndex < swiper.activeIndex;
        if (isPrev) {
          swiper.slidePrev();
        } else {
          swiper.slideNext();
        }
      });
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
