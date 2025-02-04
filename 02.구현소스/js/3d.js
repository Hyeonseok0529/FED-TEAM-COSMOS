import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// 3D 초기화 함수
export function init3D(modelingSrc) {
    const container = document.getElementById('threejs-container');

    // 기존 씬 초기화 (재실행 시 문제 방지)
    container.innerHTML = '';

    // 씬, 카메라, 렌더러 설정
    const scene = new THREE.Scene();
    scene.background = null; // 배경 투명
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 0, 1000);

    // OrbitControls 설정
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;

    // 🌟 조명 설정 (사방에서 빛을 줌)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6); // 전체 밝기 증가
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.8);
    hemiLight.position.set(0, 10, 0);
    scene.add(hemiLight);

    const lights = [
        new THREE.DirectionalLight(0xffffff, 1),
        new THREE.DirectionalLight(0xffffff, 1),
        new THREE.DirectionalLight(0xffffff, 1),
        new THREE.DirectionalLight(0xffffff, 1)
    ];

    lights[0].position.set(5, 5, 5).normalize();   // 앞쪽 위
    lights[1].position.set(-5, 5, 5).normalize();  // 앞쪽 좌측 위
    lights[2].position.set(5, -5, -5).normalize(); // 뒤쪽 우측 아래
    lights[3].position.set(-5, -5, -5).normalize();// 뒤쪽 좌측 아래

    lights.forEach(light => scene.add(light));

    // GLTF 모델 로딩
    const loader = new GLTFLoader();
    loader.load(
        modelingSrc,
        (gltf) => {
            console.log("모델 로딩 성공");
            const model = gltf.scene;
            model.scale.set(1, 1, 1);
            scene.add(model);
        },
        (xhr) => {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        (error) => {
            console.error('모델 로딩 실패', error);
        }
    );

    // 윈도우 리사이즈 대응
    window.addEventListener('resize', () => {
        renderer.setSize(container.clientWidth, container.clientHeight);
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
    });

    // 렌더링 함수
    function render() {
        requestAnimationFrame(render);
        controls.update();
        renderer.render(scene, camera);
    }
    render();
}
