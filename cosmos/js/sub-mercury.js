// sub-mercury.js //

// 나의 함수 불러오기
import myFn from "./my_function.js";

// 부드러운 스크롤 함수 불러오기
import { startSS, updatePos } from "./smoothScroll23.js";

import planetData from "./data_sub.json" with{type:'json'};
// console.log(planetData);

// 행성키 변수 : url?planet=venus
// let planetKey = location.search.split('=')[1];
let planetKey = "MERCURY";
const selData = planetData[planetKey];
// console.log(selData);

// 부드러운 스크롤 함수호출
startSS();

// JSON데이터 HTML요소선택
const Introduction = document.getElementById("introduction-data");
const namesake = document.getElementById("namesake-data");
const potential = document.getElementById("potential-data");
const structure = document.getElementById("structure-data");

// 데이터 삽입
Introduction.textContent = selData.introduction;
namesake.textContent = selData.namesake;
potential.textContent = selData.potential;
structure.textContent = selData.structure;

// 갤러리 이미지 출력 //
let hCode = "";
for (let i = 1; i <= 6; i++) {
  hCode += `
    <div>
      <img src="./images/sub/mercury/${i}.jpg" alt="planet">
    </div>
  `;
} ///// for //////
// .grid에 요소출력
document.querySelector(".grid").innerHTML = hCode;

// 갤러리 사진클릭시 원본보기//
// 이벤트 대상 : .gallery > div
// 변경대상: .smenu-contbox img
const $smenuImg = $(".smenu-contbox");
const $smenuImgbox = $(".smenu-imgbox");
const $gallerySmenu = $(".gallery-smenu");
const $closeBtn = $(".close");

// 갤러리 데이터 가져오기
const galleryData = selData.gallery;

$(".gallery img").click(function () {
  // console.log("미리보기!")

  // 1. 클릭된 박스의 이미지 읽어오기
  let currImg = $(this).attr("src"); /* .find(''); */
  // console.log(currImg);

  // 이미지 파일명에서 숫자만 추출
  let imgIndex = parseInt(currImg.match(/\/(\d+)\.jpg$/)[1]) - 1;

  // 해당 인덱스의 요약제목 가져오기
  let captionText = galleryData[imgIndex] || "No description";
  console.log(captionText);

  // 2. 읽어온 내용을 서브 컨텐츠 박스에 넣기
  $smenuImgbox.html(`<img src="${currImg}" alt="이미지">`);
  $(".smenu-contbox figcaption").text(captionText);

  // 4. 상세이미지 보기 박스 보이기
  $gallerySmenu.fadeIn(300);
}); ///// click /////

// 닫기 버튼 활성화 //
$closeBtn.click(() => $gallerySmenu.fadeOut(300));

const rangeId = [
  "typed2",
  "typed3",
  "typed4",
  "typed5",
  "typed6",
  "typed7",
  "typed8",
  "typed9",
];

function setTyped(sName, sCont, spVal) {
  new Typed(sName, {
    strings: sCont,
    // ^숫자 - 대기시간(1/1000초), \n - 줄바꿈
    // 타이핑스피드
    typeSpeed: spVal,
    // 지우기스피드
    backSpeed: 0,
    // 반복여부(true/false)
    loop: false,
    startDelay: 400,

    onComplete: (self) => {
      // console.log(7777, self.el.id);
      if (rangeId.includes(self.el.id)) {
        self.cursor.style.display = "none";
      } // if //
    }, // onComplete //
  }); ////// typed /////////////
}

setTyped(
  "#typed1",
  [
    selData.first,
    // `^1000The smallest planet in our solar system and^100\nnearest to the Sun, Mercury is only slightly ^100\nlarger than Earth's Moon.`,
  ],
  3
);
setTyped(
  "#typed2",
  [
    // planetKey
    `MERCURY`,
  ],
  15
);

// 행성 이미지 이동 함수 /////////////////////////////////////////////////////

// 1. 대상선정 :
// (1) 이벤트 대상 : #typed5 , .gallery
const move = myFn.qsa(".move");
// (2) 변경대상 : .planetImg
const movePlanet = myFn.qs(".planetImg");
const quickMenu = myFn.qs(".quick-menu");
// console.log("변경대상",movePlanet);

// 이벤트 대상 위치값 담기
const moveEl = [];
// 보정수치 - 화면 높이값의 2/3
let winH = window.innerHeight / 4;
move.forEach((el, idx) => (moveEl[idx] = el.offsetTop + winH));
// console.log("위치값!:",moveEl);

// 2. 이벤트 설정하기 //
// (1) 스크롤시 행성 움직이는 함수호출
function moving() {
  let screenWidth = window.innerWidth;

  if (screenWidth < 1000) {
    movePlanet.style.left = "50%"; // 화면 중앙
    movePlanet.style.transform = "translateX(-50%)"; // 요소 중심 보정
    return; // 이동중단
  }

  // 스크롤 위치값
  let scY = window.scrollY;
  // console.log("스크롤 위치값:",scY,movePlanet);

  if (scY > moveEl[2]) movePlanet.style.left = "37%";
  else if (scY < moveEl[1]) 
    movePlanet.style.left = "10%";
  else if (scY > moveEl[0]) 
    movePlanet.style.left = "60%";
    
} ///// showEl함수 /////

// 행성중앙 보정함수
function setInitialPosition() {
  let screenWidth = window.innerWidth;

  if (screenWidth < 1000) {
    movePlanet.style.left = "50%";
    movePlanet.style.transform = "translateX(-50%)"; // 중심 보정
  } else {
    movePlanet.style.left = "10%";
    movePlanet.style.transform = "translateX(0)"; // 보정 해제
  }
}

// moving 이벤트함수 호출하기

window.addEventListener("resize", setInitialPosition);
window.addEventListener("scroll", moving);

// 퀵메뉴 기능 함수 export // 
export function quickMenuFn(){

// 퀵 메뉴 a태그 변수
const quickMenuItems = myFn.qsa(".quick-menu a");
// console.log(quickMenuItems);

// 각 메뉴 항목에 클릭 이벤트 추가
quickMenuItems.forEach((item) => {
  item.addEventListener("click", (e) => {
    e.preventDefault(); // 기본동작 방지 (스크롤 이동 방지)
    
    // 해당 id를 가진 요소를 찾음
    // const targetSection = document.getElementById(sectionId);
    const targetSection = $(e.currentTarget).attr("href");
    // console.log(targetSection);

    // 위치값
    let tgPos = $(targetSection).offset().top - winH;

    $("html,body").animate(
      {
        scrollTop: tgPos + "px",
      },
      400
    );

    // 부드러운 스크롤 위치값 업데이트
    updatePos(tgPos);

    // if(targetSection){
    //   //해당 섹션으로 부드럽게 스크롤
    //   targetSection.scrollIntoView({
    //     behavior:'smooth', // 부드러운 스크롤
    //     block: 'center' // 섹션의 시작 부분으로 스크롤
    //   }); // scrollIntoView //
    // } //// if /////
  }); // addEventListener //
});
}

// 퀵메뉴 버튼 클래스 active 반영하여 변경 //
$(document).ready(function () {
  $(".toggle-btn").click(function () {
    $(".quick-menu").toggleClass("active");

    // 버튼 텍스트 변경
    if ($(".quick-menu").hasClass("active")) {
      $(this).text("≫");
    } else {
      $(this).text("≪");
    }
  });
});

if(window.innerWidth < 1000) setInitialPosition();
