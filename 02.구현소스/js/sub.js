// sub-js //

// 나의 함수 불러오기
import myFn from "./my_function.js";

// 부드러운 스크롤 함수 불러오기
import startSS from "./smoothScroll23.js";

import planetData from "./data_sub.json" with{type:'json'};
console.log(planetData);

// 행성키 변수 : url?planet=venus
// let planetKey = location.search.split('=')[1];
let planetKey = 'mercury';
const selData = planetData[planetKey];
console.log(selData);

// 부드러운 스크롤 함수호출
startSS();

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

const rangeId = ["typed2", "typed3", "typed5", "typed7", "typed9"];

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
    startDelay: 500,

    onComplete: (self) => {
      console.log(7777, self.el.id);
      if (rangeId.includes(self.el.id)) {
        self.cursor.style.display = "none";
      }
    },
  }); ////// typed /////////////
}

const startLetterFn = {
  "first-area": () => {
    // 1. first area 파트
    setTyped(
      "#typed1",
      [
        selData.first
        // `^1000The smallest planet in our solar system and^100\nnearest to the Sun, Mercury is only slightly ^100\nlarger than Earth's Moon.`,
      ],
      4
    );
    setTyped("#typed2", [
      planetKey
      // `Mercury`
    ], 30);
  },
  "introduction-area": () => {
    // 2. Introduction 파트
    setTyped(
      "#typed3",[`introduction`], 40);
    setTyped(
      "#typed4",
      [
        selData.introduction
        // `^1000surface temperatures : 800°F(430°C) ~ -290°F(-180°C)^100\nthe fastest planet, zipping around the Sun every^100\n88 Earth days.`,
      ],
      8
    );
  },
  "namesake-area": () => {
    // 3. namesake 파트
    setTyped("#typed5", [`namesake`], 40);
    setTyped(
      "#typed6",
      [`^1000named for the swiftest of the ancient Roman gods.`],
      8
    );
  },
  "potential-area": () => {
    // 4. Potential for Life 파트
    setTyped("#typed7", [`Potential for Life`], 40);
    setTyped(
      "#typed8",
      [
        `^1000Mercury's environment is not conducive to life as we know it. \nThe temperatures and solar radiation that characterize this planet\nare most likely too extreme for organisms to adapt to.`,
      ],
      8
    );
  },
};

// 5. Structure 파트
setTyped("#typed9", [`Structure`], 40);
setTyped(
  "#typed10",
  [
    `^1000Mercury is the second densest planet, after Earth.\nIt has a large metallic core with a radius of about 1,289 miles (2,074 kilometers),\nabout 85% of the planet's radius. There is\nevidence that it is partly molten or liquid. \nMercury's outer shell, comparable to Earth's outer\nshell (called the mantle and crust), is only\nabout 400 kilometers (250 miles) thick.`,
  ],
  8
);

// 타이핑 스크롤 액션 //////////////////////////////////////////

// 1. 대상선정:
// (1) 이벤트 대상 : window
// (2) 변경 대상 : .scroll-act
const scrollAct = myFn.qsa(".scroll-act");
// 요소에 트랜지션

// console.log("대상:", scrollAct)

// 스크롤 등장요소의 위치값 담기
// ooffsetTop은 맨 위에서부터 요소의 위치값
// 배열변수에 순서대로 담는다.
const posEl = [];
scrollAct.forEach((el, idx) => (posEl[idx] = el.offsetTop));

// console.log("위치값:", posEl);

// 2. 이벤트 설정하기 //
// (1) 스크롤시 요소등장 함수호출
myFn.addEvt(window, "scroll", showEl);

// (2) 섹션에 따라 행성 이동 함수 호출 --> 추후 추가
// myFn.addEvt(window, "scroll", movePlanet);

// 기준값 만들기 : 화면 높이값을 사용(화면의 2/3)
const CRITERIA = (window.innerHeight / 3) * 2;
// console.log("기준값:", CRITERIA);

// 타이핑 애니메이션 한번만 적용하기 //
let typing = false;
// 타이핑 효과 시간상수
const TIME_TYPING = 3000;

let beforeId = [];

// 3. 함수만들기 //
// (1) 요소 등장 함수
function showEl() {
  // (1-1) 함수호출확인
  // console.log("나야나!!",window.scrollY);

  // (1-2) 타이핑 애니 한번만 적용하기
  // if (typing) return;// 함수 나가기
  // typing = true;
  scrollAct.forEach((el) => {
    // 각 등장요소의 바운딩 top값
    let bcrVal = myFn.getBCR(el);
    // console.log("등장요소 바운딩 top값은?:",bcrVal,el.getBoundingClientRect());

    // 화면의 2/3위치에서 클래스 넣기(등장)
    if (bcrVal < CRITERIA) {
      if (beforeId.includes(el.id)) return;
      beforeId.push(el.id);
      console.log(el.id);

      startLetterFn[el.id]();

      // typed 플러그인 적용하기!
      // 1. 첫 등장 파트
    }
  }); ////// forEach /////
} ////// showEl함수 //////
