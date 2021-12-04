import * as THREE from "https://threejs.org/build/three.module.js";
import { GLTFLoader } from 'https://cdn.skypack.dev/three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three/examples/jsm/controls/OrbitControls.js';
import { EXRLoader } from "https://threejs.org/examples/jsm/loaders/EXRLoader.js";

var container = document.getElementById("3d")
var w = window.innerWidth;
var h = window.innerHeight;

//---CAMERA---
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
	40, //Field of View
	(w)/ (h), //Aspect Ratio
	0.1,  //Inner Frustum
	1000 //Outter Frustum
);


//---RENDERER--
const renderer = new THREE.WebGLRenderer();
renderer.setSize(w, h);
container.appendChild( renderer.domElement );
camera.position.z = 15;


var controls = new OrbitControls(camera, renderer.domElement);	
controls.update();


var light = new THREE.AmbientLight( 0xDDDDDD );
scene.add(light)


//---CARGAR TEXTURAS PBR---
const textureLoader = new THREE.TextureLoader();
	//cargar los mapas como inputs en el PBR
	const diffuse = textureLoader.load("./models/robot1.png");
	const roughness = textureLoader.load("./models/robot3.png");

//---CARGAR ESCENA---
var robot;
var robotLoaded = false;
new GLTFLoader()
   .load("./models/robot-smooth.glb",
   function ( gltf ) {
      var scale = 1;
      gltf.body = gltf.scene.children[0];
      gltf.body.name = "body";
      gltf.body.rotation.set ( 0, -1.57, 0 );
      gltf.body.scale.set (scale,scale,scale);
      gltf.body.position.set ( 0, 0, 0 );
      gltf.body.material.envMap = scene.background;
      gltf.body.material.roughness = .75;
      robot = gltf.body
      scene.add( robot )
      robotLoaded = true;
   });
   


var plane
var planeLoaded = false;
new GLTFLoader()
   .load("./models/plane.glb",
   function ( gltf ) {
      plane = gltf.scene.children[0]
      scene.add(plane)
      planeLoaded = true;
   });

new GLTFLoader()
   .load("./models/scene.glb",
   function ( gltf ) {
      scene.add(gltf.scene)
   });

//---CARGA DE ILUMINACION AMBIENTAL---
const pmremGenerator = new THREE.PMREMGenerator( renderer );
pmremGenerator.compileEquirectangularShader();
new EXRLoader()
		.setDataType( THREE.UnsignedByteType )
		.load( "./models/studio.exr", function ( texture ) {

		   var exrCubeRenderTarget = pmremGenerator.fromEquirectangular( texture );
			var exrBackground = exrCubeRenderTarget.texture;
			scene.background = exrBackground;
			texture.dispose();
	   });


//---TRACKMOUSE---
var x = 0;
var y = 0;
container.addEventListener("mousemove", function(e){
   x = (e.clientX - (w/2)) / w;
   y = (e.clientY - (h/2)) / h;
})

//---RENDERIZAR---
function animate(){
   if(robotLoaded){
      robot.rotation.y = x - 1.57;
      robot.rotation.x = y;
   }
   if(planeLoaded){
      if(plane.position.z >= -17){
         plane.position.z -= 0.05  
      }else{
         plane.position.z = 0
      }  
   }
   requestAnimationFrame(animate);
	renderer.render(scene, camera);
}
animate();