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
    scene.background = null; // 배경을 투명으로 설정
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); // ✅ alpha: true로 투명 배경 활성화
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 1000;

    // OrbitControls 설정
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;

    // 조명 추가
    const ambientLight = new THREE.AmbientLight(0x404040, 1);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5).normalize();
    scene.add(directionalLight);

    // GLTF 모델 로딩
    const loader = new GLTFLoader();
    loader.load(
        modelingSrc,
        (gltf) => {
            console.log("모델 로딩 성공");
            const model = gltf.scene;
            model.scale.set(0.8, 0.8, 0.8);
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
