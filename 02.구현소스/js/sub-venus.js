// sub-venus.js //

// 나의 함수 불러오기
import myFn from "./my_function.js";

// 부드러운 스크롤 함수 불러오기
import {startSS, updatePos} from "./smoothScroll23.js";


import planetData from "./data_sub.json" with{type:'json'};
// console.log(planetData);

export default function initFn(){


// 행성키 변수 : url?planet=venus
// let planetKey = location.search.split('=')[1];

// 현재 URL의 쿼리 문자열에서 planet 값 추출
let urlParams = new URLSearchParams(window.location.search);
let planetKey = urlParams.get("planet") || "VENUS"; // 기본값은 venus
const selData = planetData [planetKey];


//행성 키값 : 페이지 타이틀 //
document.title = planetKey

// 행성 키값에 따라 이미지 변경 //
let planetImg = myFn.qs(".planetImg");
if(planetImg){
  planetImg.src=`./images/sub/${planetKey.toLowerCase()}/${planetKey.toLowerCase()}.png`;
} // if //
// 지구, 화성인 경우 scale 1로 설정
if (planetKey === "EARTH" || planetKey === "MARS" || planetKey === "SATURN" || planetKey === "URANUS" || planetKey === "NEPTUNE") {
  planetImg.style.height = "500px";
} // if //
if (planetKey === "JUPITER" || planetKey === "VENUS"){
  planetImg.style.height = "400px"; 
}


// Default 상태 출력 //
if (selData) {
  document.querySelector(".desc-tit h1").textContent = selData.name.toUpperCase();
  document.querySelector("h2").textContent = "GALLERY OF "+selData.name.toUpperCase();
  document.querySelector(".desc-desc p").textContent = selData.first;
}

// 퀵메뉴 a 태그 변수 //
const quickMenuItems = document.querySelectorAll('.quick-menu a');
quickMenuItems.forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault(); //기본동작 방지 (스크롤이동)
    
    // 모든 메뉴에서 active 클래스 제거
    quickMenuItems.forEach(menu => menu.classList.remove('active'));

    // 클릭한 메뉴에 active 클래스 추가
    item.classList.add('active');

    // 클릭된 메뉴의 id를 가져옴
    const sectionId = e.target.getAttribute('href').substring(1);
    // 'gallery' 메뉴를 제외한 경우, 최상단으로 스크롤
    if(sectionId !== 'gallery-area'){
      // 최상단으로 스크롤 
      window.scrollTo({
        top: 0,
        behavior:'smooth'
      }) // scrollTo //
    } // if // 
    
    // 각 영역에 맞는 데이터를 설정
    if (selData) {
       // 트랜지션을 위해 먼저 클래스를 제거하고, 잠시 후에 다시 추가하여 애니메이션 효과를 주기
       const titleElement = document.querySelector(".desc-tit h1");
       const descElement = document.querySelector(".desc-desc p");
      //  console.log(sectionId);
       // 현재 활성화된 클래스 제거
       titleElement.classList.remove('show');
       descElement.classList.remove('show');
       
       
       let newSectionId = sectionId.replace('-area','');
      //  console.log(sectionId);
 
       // 트랜지션 효과를 위해 잠시 대기 후 새로운 내용으로 업데이트
       setTimeout(() => {
         switch (newSectionId) {
           case 'first':
             titleElement.textContent = selData.name.toUpperCase();
             descElement.textContent = selData.first;
             break;
           case 'introduction':
             titleElement.textContent = "Introduction".toUpperCase();
             descElement.textContent = selData.introduction;
             break;
           case 'namesake':
             titleElement.textContent = "Namesake".toUpperCase();
             descElement.textContent = selData.namesake;
             break;
           case 'potential':
             titleElement.textContent = "Potential".toUpperCase();
             descElement.textContent = selData.potential;
             break;
           case 'structure':
             titleElement.textContent = "Structure".toUpperCase();
             descElement.textContent = selData.structure;
             break;
           default:
             break;
         }
 
         // 트랜지션 효과를 주기 위해 클래스 추가
         titleElement.classList.add('show');
         descElement.classList.add('show');
       }, 100); // 텍스트 변경 후 약간의 딜레이를 두고 트랜지션 시작
     }
  })
})

// gallery 퀵 메뉴 클릭시 해당 섹션으로 이동 // 
myFn.qs(".quick-menu a[href='#gallery-area']").addEventListener("click",(e) => {
  e.preventDefault(); // 기본 동작 방지

  // .gallery-tit 할당
  const galleryTitle = myFn.qs(".gallery-tit");
  // console.log(galleryTitle)

  $('html,body').animate({
    scrollTop: $(galleryTitle).offset().top + "px"
  },400)
}); // click //



// 행성이름으로 grid img 출력 //
const planetName = myFn.qs("h1").textContent.trim().toLowerCase();

let hCode = "";
for (let i = 1; i <= 6; i++) {
  hCode += `
          <div>
            <img src="./images/sub/${planetName}/${i}.jpg" alt="${planetName}">
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
    let imgIndex = parseInt(currImg.match(/\/(\d+)\.jpg$/)[1]) -1;

  
    // 해당 인덱스의 요약제목 가져오기
    let captionText = galleryData[imgIndex] || "No description";
    // console.log(captionText);

      // 2. 읽어온 내용을 서브 컨텐츠 박스에 넣기
  $smenuImgbox.html(`<img src="${currImg}" alt="이미지">`);
  $(".smenu-contbox figcaption").text(captionText);


  // 3. 상세이미지 보기 박스 보이기
  $gallerySmenu.fadeIn(300);
}); ///// click /////

// 닫기 버튼 활성화 //
$closeBtn.click(() => $gallerySmenu.fadeOut(300));

// 행성 페이드 아웃 - 인 //
$(window).scroll(function(){
  // 현재 스크롤 위치
  let scrollTop = $(window).scrollTop();

  // #first-area 위치값
  let firstAreaTop = $("#first-area").offset().top;
  let firstAreaBottom = firstAreaTop + $("#first-area").outerHeight();

  // 위치값 조절
  let offset =  400;

  // .planetImg 요소 선택
  let $planetImg = $(".planetImg");

  // 현재 스크롤 first-area를 벗어나면 페이드아웃, 안에 있으면 페이드 인
  // fadeIn,fadeOut은 뚝뚝 끊기는 현상이 있어서 Opacity,animate로 수정해봄.
  if(scrollTop > firstAreaBottom - offset) {
    $planetImg.stop().animate({opacity:0},300);
  } else {
    $planetImg.stop().animate({opacity:1},300);
  }
})

// 퀵메뉴 호출버튼 // 
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


} /////////// initFn ////////////////////////