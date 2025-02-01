const head = document.getElementById("header");
const ham = document.querySelector('.hammenu'),
fi = document.querySelector('.ham > span:nth-of-type(1)'),
se = document.querySelector('.ham > span:nth-of-type(2)'),
th = document.querySelector('.ham > span:nth-of-type(3)');

let pos = { y: 0, y2: 0, status: true };

window.addEventListener("scroll", function () {
  pos.y = window.pageYOffset;

  //삼항연산자
  pos.status = pos.y > pos.y2 ? true : false;

  pos.y2 = pos.y;

  if (pos.status) {
    head.classList.add("active");
  } else {
    head.classList.remove("active");
  }
});

function on(){
  ham.classList.toggle('on');
  if(ham.className.includes('on')){
      fi.style.cssText = 'top: 50%; transform: rotate(45deg)';
      se.style = 'opacity: 0;';
      th.style.cssText = 'top: 50%; transform: rotate(-45deg)';
      $('.ham-drop-box').animate({ left: '0' }, 300);
  } else{
      fi.style = 'top: 0%';
      se.style = 'top: 50%';
      th.style = 'top: 100%';
      $('.ham-drop-box').animate({ left: '-100%' }, 300);
  }  
}

// 햄버거 버튼 클릭시 on함수 실행
ham.addEventListener('click',on);