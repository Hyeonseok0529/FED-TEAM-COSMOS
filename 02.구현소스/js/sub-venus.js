// sub-venus.js //

// 나의 함수 불러오기
import myFn from "./my_function.js";


// import planetData from "./data_sub.json" with{type:'json'};
// console.log(planetData);

// 행성키 변수 : url?planet=venus
// let planetKey = location.search.split('=')[1];
// let planetKey = 'VENUS';
// const selData = planetData [planetKey];
// console.log(selData);

let planetData = null

// json 파일 경로
const jsonFilePath = "./js/data_sub.json";

// json 파일로드
fetch(jsonFilePath)
.then((response) => {
  if (!response.ok){
    throw new Error ("JSON 파일을 불러오는데 실패했습니다.")
  }
  return response.json(); // JSON 데이터를 파싱
})
.then((data) => {
  planetData = data;
  console.log("json 데이터 로드 완료:",planetData);
})
.catch((error) => {
  console.error("에러 발생:", error);
})

// 클릭 이벤트 설정
$(document).ready(function (){
  // 클릭 이벤트 설정
  $(".header-nav li a").click(function(e){
    e.preventDefault(); // 기본 동작 방지

    // 클릭한 행성의 키 가져오기
    const planetKey = $(this).data("name").toUpperCase();
    // 데이터 확인 후 업데이트
    if (planetData && planetData[planetKey]){
      const selectedPlanet = planetData[planetKey];

      // HTML 업데이트
      $(".desc-desc p").text(selectedPlanet.introduction) // 내용
    }
    else {
      console.error("해당 키에 대한 데이터를 찾을 수 없습니다.")
    }
  })
})

