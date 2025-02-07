import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// 3D 초기화 함수
export function init3D(modelingSrc) {
  const container = document.getElementById("threejs-container");

  // 기존 씬 초기화 (재실행 시 문제 방지)
  container.innerHTML = "";

  // 씬, 카메라, 렌더러 설정
  const scene = new THREE.Scene();
  scene.background = null; // 배경을 투명으로 설정
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  const camera = new THREE.PerspectiveCamera(
    75,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  camera.position.z = 1000;

  // OrbitControls 설정
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.25;

  /// 조명 설정 (사방)
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambientLight);

  const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.6);
  hemiLight.position.set(0, 10, 0);
  scene.add(hemiLight);

  const lights = [
    new THREE.DirectionalLight(0xffffff, 0.8),
    new THREE.DirectionalLight(0xffffff, 0.8),
    new THREE.DirectionalLight(0xffffff, 0.8),
    new THREE.DirectionalLight(0xffffff, 0.8),
  ];

  lights[0].position.set(5, 5, 5).normalize(); // 앞쪽 위
  lights[1].position.set(-5, 5, 5).normalize(); // 앞쪽 좌측 위
  lights[2].position.set(5, -5, -5).normalize(); // 뒤쪽 우측 아래
  lights[3].position.set(-5, -5, -5).normalize(); // 뒤쪽 좌측 아래

  lights.forEach((light) => scene.add(light));

  // GLTF 모델 로딩
  const loader = new GLTFLoader();
  let model;
  let isAutoRotating = true; // 자동 회전 상태를 추적하는 플래그

  loader.load(
    modelingSrc,
    (gltf) => {
      console.log("모델 로딩 성공");
      model = gltf.scene;
      model.scale.set(1, 1, 1);
      scene.add(model);

      // 모델을 자동으로 회전하게 하기
      function animateRotation() {
        if (isAutoRotating) {
          model.rotation.y += 0.002;
        }
        requestAnimationFrame(animateRotation);
        renderer.render(scene, camera);
      }

      animateRotation(); // 회전 애니메이션 시작
    },
    // (xhr) => {
    //   console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    // },
    // (error) => {
    //   console.error("모델 로딩 실패", error);
    // }
  );

  // 윈도우 리사이즈 대응
  window.addEventListener("resize", () => {
    renderer.setSize(container.clientWidth, container.clientHeight);
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
  });

  // 마우스 클릭/터치 시작 시 자동 회전 멈추기
  controls.addEventListener("start", () => {
    isAutoRotating = false; // 사용자가 조작을 시작하면 자동 회전 멈춤
  });

  controls.addEventListener("end", () => {
    isAutoRotating = true; // 사용자가 조작을 끝내면 자동 회전 재개
  });

  // 렌더링 함수
  function render() {
    requestAnimationFrame(render);
    controls.update();
    renderer.render(scene, camera);
  }
  render();
}
