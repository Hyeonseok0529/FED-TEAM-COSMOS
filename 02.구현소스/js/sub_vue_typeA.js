// 서브페이지 뷰적용 JS - sub_vue_typeA.js
// 컴포넌트 불러오기 //

import { QmenuComp } from './components/qmenu.js';
// console.log(QmenuComp);

// 기능 함수 호출 //
import { quickMenuFn } from "./sub-mercury.js";
// console.log(quickMenuFn);

/******************************* 
    메인 뷰 인스턴스 생성하기 
********************************/
new Vue({
    // 1. 대상설정
    el: '#planet-app',
    // 2. 데이터설정
    data:{},
    // 3. 메서드설정
    methods:{},
    // 4. 라이프사이클 메서드
    // 4-1. created() : 데이터생성관련코드 작성
    created(){},

    // 4-2. mounted() : DOM관련코드 작성
    mounted(){
        quickMenuFn();
    },
});