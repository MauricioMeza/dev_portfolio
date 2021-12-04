import * as THREE from 'https://cdn.skypack.dev/three';
import { OrbitControls } from 'https://cdn.skypack.dev/three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three/examples/jsm/loaders/GLTFLoader.js';

var container = document.getElementById("3d")

//---CAMERA---
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
	75, //Field of View
	(window.innerWidth)/ (window.innerHeight), //Aspect Ratio
	0.1,  //Inner Frustum
	1000 //Outter Frustum
);


//---RENDERER--
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild( renderer.domElement );

var controls = new OrbitControls(camera, renderer.domElement);
camera.position.z = 6;	
controls.update();

var light = new THREE.AmbientLight( 0xFFFFFF );
scene.add(light)


//---CARGAR TEXTURAS PBR---
const textureLoader = new THREE.TextureLoader();
	//cargar los mapas como inputs en el PBR
	const diffuse = textureLoader.load("./models/robot2.png");
	const roughness = textureLoader.load("./models/robot3.png");

//---CARGAR ESCENA---
var robot;
new GLTFLoader()
   .load("./models/robot-smooth.glb",
   function ( gltf ) {
      var scale = 1;
      gltf.body = gltf.scene.children[0];
      gltf.body.name = "body";
      gltf.body.rotation.set ( 0, -1.57, 0 );
      gltf.body.scale.set (scale,scale,scale);
      gltf.body.position.set ( 0, 0, 0 );
      robot = gltf.body
      scene.add( robot )
   });


//---RENDERIZAR---
function animate(){
   requestAnimationFrame(animate);
   controls.update();
	renderer.render(scene, camera);
}
animate();
