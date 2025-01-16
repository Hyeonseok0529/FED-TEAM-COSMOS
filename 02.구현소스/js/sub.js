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

$('.gallery img').click(function(){
// console.log("미리보기!")

// 1. 클릭된 박스의 이미지 읽어오기
let currImg = $(this).attr("src");/* .find(''); */
console.log(currImg)

// 2. 읽어온 내용을 서브 컨텐츠 박스에 넣기
$smenuImgbox.html(`<img src="${currImg}" alt="이미지">`);

// 3. 상세이미지 보기 박스 보이기
$gallerySmenu.fadeIn(300);
}) ///// click /////

$closeBtn.click(()=>$gallerySmenu.fadeOut(300));