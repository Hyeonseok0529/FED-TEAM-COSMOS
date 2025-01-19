// sub-js //

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
    startDelay: 2000,
  }); ////// typed /////////////
}
// typed 플러그인 적용하기!
// 1. 첫 등장 파트
setTyped(
  "#typed1",
  [
    `^1000The smallest planet in our solar system and^100\nnearest to the Sun, Mercury is only slightly ^100\nlarger than Earth's Moon.`,
  ],
  8
);
setTyped("#typed2", [`Mercury`], 40);

// 2. Introduction 파트
setTyped("#typed3", [`introduction`], 40);
setTyped(
  "#typed4",
  [
    `^1000surface temperatures : 800°F(430°C) ~ -290°F(-180°C)^100\nthe fastest planet, zipping around the Sun every^100\n88 Earth days.`,
  ],
  8
);
// 3. Namesake 파트
setTyped("#typed5", [`Namesake`], 40);
setTyped(
  "#typed6",
  [
    `^1000named for the swiftest of the ancient Roman gods.`,
  ],
  8
);
// 4. Potential for Life 파트
setTyped("#typed7", [`Potential for Life`], 40);
setTyped(
  "#typed8",
  [
    `^1000Mercury's environment is not conducive to life as we know it. \nThe temperatures and solar radiation that characterize this planet\nare most likely too extreme for organisms to adapt to.`,
  ],
  8
);
// 5. Structure 파트
setTyped("#typed9", [`Structure`], 40);
setTyped(
  "#typed10",
  [
    `^1000Mercury is the second densest planet, after Earth.\nIt has a large metallic core with a radius of about 1,289 miles (2,074 kilometers),\nabout 85% of the planet's radius. There is\nevidence that it is partly molten or liquid. \nMercury's outer shell, comparable to Earth's outer\nshell (called the mantle and crust), is only\nabout 400 kilometers (250 miles) thick.`,
  ],
  8
);

// setTyped("#typed2",[
//       `gggggggg\n gggggggggggggggg`,
//     ],100);
