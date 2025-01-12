$(function () {
    // body태그의 첫번째에다가 header태그 생성
    $("body").prepend('<header id="header"></header>');
    $("body").append('<footer id="footer"></footer>');
    
    //id가 header인곳 안에 inc.html안에 .top-area클래스 가진 요소 부르기
    $("#header").load("inc.html .top-area", function () {
        $.getScript("./js/header.js");
        // header.js파일 적용
    });
    
    //푸터는 위와 동일
    $("#footer").load("inc.html .bottom-area", function () {
        $.getScript("./js/footer.js");
  });
});
