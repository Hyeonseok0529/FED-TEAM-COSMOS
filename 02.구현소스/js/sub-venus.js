// sub-venus.js //

// 나의 함수 불러오기
import myFn from "./my_function.js";


import planetData from "./data_sub.json" with{type:'json'};
console.log(planetData);

// 행성키 변수 : url?planet=venus
// let planetKey = location.search.split('=')[1];
let planetKey = 'VENUS';
const selData = planetData [planetKey];
console.log(selData);

if (selData) {
  document.querySelector(".desc-tit h1").textContent = selData.name.toUpperCase();;
  document.querySelector(".desc-desc p").textContent = selData.first;
}
