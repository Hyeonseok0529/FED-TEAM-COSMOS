// sub-venus.js //

// 나의 함수 불러오기
import myFn from "./my_function.js";


import planetData from "./data_sub.json" with{type:'json'};
console.log(planetData);

// 행성키 변수 : url?planet=venus
// let planetKey = location.search.split('=')[1];

// 키값 Venus // 
let planetKey = 'VENUS';
const selData = planetData [planetKey];
console.log(selData);
// 행성 이미지 변수 //
let planetImg = myFn.qs(".planetImg");
if(planetImg){
  planetImg.src=`./images/sub/${planetKey}/${planetKey}.png`;
}

// Default 상태 출력 //
if (selData) {
  document.querySelector(".desc-tit h1").textContent = selData.name.toUpperCase();
  document.querySelector(".desc-desc p").textContent = selData.first;
}

// 퀵메뉴 a 태그 변수 //
const quickMenuItems = document.querySelectorAll('.quick-menu a');
// console.log(quickMenuItems);

quickMenuItems.forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault(); //기본동작 방지 (스크롤이동)

    // 클릭된 메뉴의 id를 가져옴
    const sectionId = e.target.getAttribute('href').substring(1);
    
    // 각 영역에 맞는 데이터를 설정
    if (selData) {
       // 트랜지션을 위해 먼저 클래스를 제거하고, 잠시 후에 다시 추가하여 애니메이션 효과를 주기
       const titleElement = document.querySelector(".desc-tit h1");
       const descElement = document.querySelector(".desc-desc p");
 
       // 현재 활성화된 클래스 제거
       titleElement.classList.remove('show');
       descElement.classList.remove('show');
 
       // 트랜지션 효과를 위해 잠시 대기 후 새로운 내용으로 업데이트
       setTimeout(() => {
         switch (sectionId) {
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