import * as THREE from "https://threejs.org/build/three.module.js";
import { GLTFLoader } from 'https://cdn.skypack.dev/three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three/examples/jsm/controls/OrbitControls.js';
import { EXRLoader } from "https://threejs.org/examples/jsm/loaders/EXRLoader.js";

var container = document.getElementById("3d")
var w = window.innerWidth;
var h = window.innerHeight;


/*--------INITIAL BOILERPLATE--------*/

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



/*--------ASYNCRONOUS EXTERNAL LOADING --------*/

async function externalLoads(){
   await loadTextures();
   await loadHDRI();
   await loadModels();
}

//----LOAD TEXTURES----
var liImgC, ghImgC, asImgC, igImgC, metalRoughness, robotC, robotR;
function loadTextures(){
   const textureLoader = new THREE.TextureLoader();
   robotC = textureLoader.load("./models/robot2.png");
   robotC.flipY = false;
   robotR = textureLoader.load("./models/robot3.png");
   robotR.flipY = false;
   liImgC = textureLoader.load("./models/linkedinc.jpg");
   liImgC.flipY = false;
	ghImgC = textureLoader.load("./models/githubc.jpg");
   ghImgC.flipY = false;
   asImgC = textureLoader.load("./models/artstationc.jpg");
   asImgC.flipY = false;
	igImgC = textureLoader.load("./models/intagramc.jpg");
   igImgC.flipY = false;
   metalRoughness = textureLoader.load("./models/roughnessMetal.jpg");
}


//---LOAD AMBIENT ILUMINATION---
function loadHDRI(){
   const pmremGenerator = new THREE.PMREMGenerator( renderer );
   pmremGenerator.compileEquirectangularShader();
   new EXRLoader()
         .setDataType( THREE.UnsignedByteType )
         .load( "./models/studio.exr", function ( texture ) {

            var exrCubeRenderTarget = pmremGenerator.fromEquirectangular( texture );
            var exrBackground = exrCubeRenderTarget.texture;
            console.log(exrBackground);
            exrBackground.flipY = false;
            exrBackground.rotation = 3.14;
            scene.background = exrBackground;
            texture.dispose();
	   });
}


//---LOAD GLTF MODELS---
var robot;
var robotLoaded = false;
var cube, cubeLi, cubeGh, cubeAs, cubeIg; 
var cubesLoaded = false;
var plane;
var planeLoaded = false;
function loadModels(){

   //robot
   new GLTFLoader()
      .load("./models/robot-notext.glb",
      function ( gltf ) {
         var scale = 1;
         gltf.body = gltf.scene.children[0];
         gltf.body.name = "body";
         gltf.body.rotation.set ( 0, -1.57, 0 );
         gltf.body.scale.set(scale,scale,scale);
         gltf.body.position.set ( 0, 0, 0 );
         var robotMat = new THREE.MeshStandardMaterial({
            color: "#FFFFFF",
            map: robotC,
            metalness: 0.5,
            roughness: 0.75,
            roughnessMap: robotR,
            envMap: scene.background,
         })
         //gltf.body.material.envMap = scene.background;
         //gltf.body.material.roughness = .75;
         robot = gltf.body
         robot.material = robotMat
         scene.add( robot )
         robotLoaded = true;
      });

   //contactCube
   new GLTFLoader()
      .load("./models/contactCube.glb",
      function ( gltf ) {
         //set initial common parameters
         const size = .6
         cube = gltf.scene.children[0];
         var cubeMat = new THREE.MeshStandardMaterial({
            color: "#FFFFFF",
            metalness: 0.6,
            roughness: 0.6,
            //roughnessMap: metalRoughness,
            envMap: scene.background,
         })
         cube.material = cubeMat;
         cube.scale.set(size, size, size);
         const z = cube.position.z;
         const y = -4.2;

         //attributes for each cube
         cubeLi = cube.clone();
         cubeLi.material = cubeMat.clone()
         cubeLi.material.map = liImgC;
         console.log(cubeLi.material)
         cubeLi.position.set(-2 - ((w-300)/800), y , z)
         scene.add(cubeLi)
         
         cubeGh = cube.clone();
         cubeGh.material = cubeMat.clone()
         cubeGh.material.map = ghImgC;
         cubeGh.position.set(-.65 - ((w-300)/2000), y , z)
         scene.add(cubeGh)
         
         cubeAs = cube.clone();
         cubeAs.material = cubeMat.clone()
         cubeAs.material.map = asImgC;
         cubeAs.position.set(.65 + ((w-300)/2000), y , z)
         scene.add(cubeAs)
         
         cubeIg = cube.clone()
         cubeIg.material = cubeMat.clone()
         cubeIg.material.map = igImgC;
         cubeIg.position.set(2 + ((w-300)/800), y , z)
         scene.add(cubeIg)
         
         cubesLoaded = true;
      });

   //plane
   new GLTFLoader()
      .load("./models/plane.glb",
      function ( gltf ) {
         plane = gltf.scene.children[0]
         scene.add(plane)
         planeLoaded = true;
      });

   //background
   new GLTFLoader()
      .load("./models/scene.glb",
      function ( gltf ) {
         scene.add(gltf.scene)
   });
}
externalLoads();

/*-------- EVENTS AND INTERACTIONS --------*/

//-----track mouse from center
var mouseX = 0;
var mouseY = 0;
container.addEventListener("mousemove", function(e){
   mouseX = (e.clientX - (w/2)) / w;
   mouseY = (e.clientY - (h/2)) / h;
})




/*--------FINAL RUN --------*/
function animate(){
   //make robot follow pointer
   if(robotLoaded){
      robot.rotation.y = mouseX - 1.57;
      robot.rotation.x = mouseY;
   }
   //animate plane grid
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