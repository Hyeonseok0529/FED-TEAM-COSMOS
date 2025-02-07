// 퀵 메뉴바 컴포넌트 - qmenu.js

// 컴포넌트

export const QmenuComp = Vue.component("qmenu-comp", {
  // 1. 템플릿
  template: `
    <!-- 퀵메뉴바 -->
    <div class="quick-menu">
        <ul>
          <li><a href="#first-area">Main</a></li>
          <li><a href="#introduction-area">Introduction</a></li>
          <li><a href="#namesake-area">Namesake</a></li>
          <li><a href="#potential-area">Potential</a></li>
          <li><a href="#structure-area">Structure</a></li>
          <li><a href="#gallery-area">Gallery</a></li>
        </ul>
        </div>

    `,
  // 2. 리턴함수 데이터
  data() {
    return {};
  },
  // 3. 메서드
  methods: {},
  // 4. 데이터셋업파트
  created() {},
  // 5. DOM 셋업파트
  mounted() {},
});
