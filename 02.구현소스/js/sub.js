// sub-js //

// 나의 함수 불러오기
import myFn from "./my_function.js";

// 부드러운 스크롤 함수 불러오기
import startSS from "./smoothScroll23.js";

import planetData from "./data_sub.json" with{type:'json'};
// console.log(planetData);

// 행성키 변수 : url?planet=venus
// let planetKey = location.search.split('=')[1];
let planetKey = 'MERCURY';
const selData = planetData [planetKey];
console.log(selData);

// 부드러운 스크롤 함수호출
startSS();

// JSON데이터 HTML요소선택
const Introduction = document.getElementById('introduction-data');
const namesake = document.getElementById('namesake-data');
const potential = document.getElementById('potential-data');
const structure = document.getElementById('structure-data');

// 데이터 삽입
Introduction.textContent = selData.introduction
namesake.textContent = selData.namesake
potential.textContent = selData.potential
structure.textContent = selData.structure



// 갤러리 사진클릭시 원본보기//
// 이벤트 대상 : .gallery > div
// 변경대상: .smenu-contbox img
const $smenuImg = $(".smenu-contbox");
const $smenuImgbox = $(".smenu-imgbox");
const $gallerySmenu = $(".gallery-smenu");
const $closeBtn = $(".close");

// 닫기버튼 셋팅
// $(".close").click(() => $(".gallery-smenu").fadeOut());

$(".gallery img").click(function () {
  // console.log("미리보기!")

  // 1. 클릭된 박스의 이미지 읽어오기
  let currImg = $(this).attr("src"); /* .find(''); */
  console.log(currImg);

  // 2. 읽어온 내용을 서브 컨텐츠 박스에 넣기
  $smenuImgbox.html(`<img src="${currImg}" alt="이미지">`);

  // 3. 상세이미지 보기 박스 보이기
  $gallerySmenu.fadeIn(300);
}); ///// click /////

$closeBtn.click(() => $gallerySmenu.fadeOut(300));

const rangeId = ["typed2", "typed3", "typed4", "typed5","typed6", "typed7","typed8", "typed9"];

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
    selData.first
    // `^1000The smallest planet in our solar system and^100\nnearest to the Sun, Mercury is only slightly ^100\nlarger than Earth's Moon.`,
  ],
  3
);
setTyped("#typed2", [
  // planetKey
  `MERCURY`
], 15);

// 행성 이미지 이동 함수 /////////////////////////////////////////////////////

// 1. 대상선정 :
// (1) 이벤트 대상 : #typed5 , .gallery
const move = myFn.qsa(".move");
// (2) 변경대상 : .spin-box
const movePlanet = myFn.qs(".planetImg");
// console.log("변경대상",movePlanet);

// 이벤트 대상 위치값 담기
const moveEl = [];
move.forEach((el, idx) => (moveEl[idx] = el.offsetTop))
console.log("위치값!:",moveEl);

// 2. 이벤트 설정하기 //
// (1) 스크롤시 행성 움직이는 함수호출
function moving(){
  // 스크롤 위치값
  let scY = window.scrollY;
  // console.log("스크롤 위치값:",scY,movePlanet);

  if (scY > moveEl[2])
    movePlanet.style.left="37%"; // 37% 맞나? 다시 잡아야 할 듯 
  else if (scY < moveEl[1])
    movePlanet.style.left="10%";
  else if (scY > moveEl[0])
    movePlanet.style.left="60%";
}

///// showEl함수 /////

