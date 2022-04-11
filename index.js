import * as THREE from 'three';
import {GLTFLoader,} from "three/examples/jsm/loaders/GLTFLoader";
import model from "./src/models/bricks_Shadows.gltf";


console.log('work')

const scene = new THREE.Scene();

const size = innerWidth / innerHeight;

let camera = new THREE.PerspectiveCamera(20, size, 0.01, 1000);
/*const helper = new THREE.CameraHelper(camera);
scene.add(helper);*/
camera.position.set(14, 10, 13);
camera.rotation.set(-0.6556956262415362, 0.7065774856978788, 0.4631763928482476);


let light = new THREE.PointLight(0xffffff, 1);
light.position.set(0, 2, 6);
scene.add(light)


const canvas = document.querySelector('canvas');
const renderer = new THREE.WebGLRenderer({
    antialias: false,
    canvas: canvas,
    alpha: true,
    powerPreference: 'high-performance',
});
renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
renderer.setSize(innerWidth, innerHeight);
renderer.setClearColor(0xffffff, 0);


console.log(camera.rotation)


window.addEventListener('resize', () => {
    renderer.setSize(innerWidth, innerHeight);
    camera.aspect = size;
    camera.updateProjectionMatrix();
})


const axesHELPER = new THREE.AxesHelper(10);
const clock = new THREE.Clock();

let mixer;
let loader = new GLTFLoader();
loader.load(// resource URL
    model, // called when the resource is loaded
    function (gltf) {
        console.log(gltf);

        mixer = new THREE.AnimationMixer(gltf.scene);
        const action = mixer.clipAction(gltf.animations[0]);

        setTimeout(function () {

            action.play();
        }, 500)
        scene.add(gltf.scene);

        animate();

        function animate() {
            requestAnimationFrame(animate);
            const delta = clock.getDelta();
            mixer.update(delta);
            renderer.render(scene, camera);
        }

    }, // called while loading is progressing
    function (xhr) {

        console.log((xhr.loaded / xhr.total * 100) + '% loaded');

    }, // called when loading has errors
    function (error) {

        console.log('An error happened');

    },);
/*scene.add(axesHELPER);*/





