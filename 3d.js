import * as THREE from "/three/build/three.module.js";
import { GLTFLoader } from "/three/examples/jsm/loaders/GLTFLoader.js";
import { EXRLoader } from "/three/examples/jsm/loaders/EXRLoader.js";
/*
import { OrbitControls } from 'https://cdn.skypack.dev/three/examples/jsm/controls/OrbitControls.js';
import * as THREE from "https://cdn.skypack.dev/three/build/three.module.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three/examples/jsm/loaders/GLTFLoader.js";
import { EXRLoader } from "https://cdn.skypack.dev/three/examples/jsm/loaders/EXRLoader.js";
*/

var container = document.getElementById("c3d")
var track = document.getElementById("track")
var w = window.innerWidth;
var h = window.innerHeight;
var load = document.getElementById("loading")
var loadCount = document.getElementById("loading-num")


/*--------INITIAL BOILERPLATE--------*/

//---CAMERA---
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
	30, //Field of View
	(w)/ (h), //Aspect Ratio
	0.1,  //Inner Frustum
	1000 //Outter Frustum
);


//---RENDERER--
const renderer = new THREE.WebGLRenderer({
   antialias: true
});
renderer.setSize(w, h);
container.appendChild( renderer.domElement );
camera.position.z = 20;

/*
var controls = new OrbitControls(camera, renderer.domElement);	
controls.update();
*/

var light = new THREE.AmbientLight( 0xDDDDDD );
scene.add(light)



/*--------ASYNCRONOUS EXTERNAL LOADING --------*/
const manager = new THREE.LoadingManager();
manager.onStart = function(item, loaded, total) {
   console.log('Loading started');
};
manager.onLoad = function ( ) {
   console.log('Loading done');
   loaded();
};
manager.onProgress = function(url, itemsLoaded, itemsTotal ) {
   var percent = 100/itemsTotal;
   percent = parseInt(percent * itemsLoaded);
   loadCount.innerHTML = `<p> ${percent}%</p>`
	console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
};


async function externalLoads(){
   await loadHDRI();  
   await loadTextures();  
   await loadModels();
   loadTextures2();
}

//----LOAD TEXTURES----
var liImgC, liImg, ghImgC, ghImg, asImgC, asImg, igImgC, igImg, metalRoughness, 
   robotC, robotR;
function loadTextures(){
   return new Promise(resolve => {
      //textures needed inmediately
      const textureLoader = new THREE.TextureLoader(manager);
      liImgC = textureLoader.load("./models/linkedinc.jpg");
      liImgC.flipY = false;
      ghImgC = textureLoader.load("./models/githubc.jpg");
      ghImgC.flipY = false;
      asImgC = textureLoader.load("./models/artstationc.jpg");
      asImgC.flipY = false;
      igImgC = textureLoader.load("./models/intagramc.jpg");
      igImgC.flipY = false;
      robotC = textureLoader.load("./models/robot2.jpg");
      robotC.flipY = false;
      robotR = textureLoader.load("./models/robot3.jpg");
      robotR.flipY = false;
      metalRoughness = textureLoader.load("./models/roughnessMetal.jpg");
      resolve('ok');
    });
}
function loadTextures2(){
   //textures that can wait
   const textureLoader2 = new THREE.TextureLoader();
   liImg = textureLoader2.load("./models/linkedin.jpg");
   liImg.flipY = false;
   ghImg = textureLoader2.load("./models/github.jpg");
   ghImg.flipY = false;
   asImg = textureLoader2.load("./models/artstation.jpg");
   asImg.flipY = false;
   igImg = textureLoader2.load("./models/instagram.jpg");
   igImg.flipY = false;
}


//---LOAD AMBIENT ILUMINATION---
var background;
function loadHDRI(){
   return new Promise(resolve => {
      const pmremGenerator = new THREE.PMREMGenerator( renderer );
      pmremGenerator.compileEquirectangularShader();
      new EXRLoader(manager)
            .setDataType( THREE.HalfFloatType )
            .load( "./models/studio.exr", function ( texture ) {
               var exrCubeRenderTarget = pmremGenerator.fromEquirectangular( texture );
               var exrBackground = exrCubeRenderTarget.texture;
               exrBackground.flipY = false;
               background = exrBackground
               texture.dispose();
               resolve('ok');
         });
    });
}


//---LOAD GLTF MODELS---
var robot;
var robotLoaded = false;
var cube, cubeLi, cubeGh, cubeAs, cubeIg; 
var plane;
var planeLoaded = false;
function loadModels(){
   return new Promise(resolve => {
      //robot
      new GLTFLoader(manager)
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
            envMap: background,
         })
         robot = gltf.body
         robot.material = robotMat
         scene.add( robot )
         robotLoaded = true;
      });

      //contactCubes
      new GLTFLoader(manager)
         .load("./models/contactCube.glb",
         function ( gltf ) {
            //set initial common parameters
            var restScale = 0;
            var restPos = restScale
            if(mobile){
               restScale = 0.05
               restPos = restScale*((h-600)/80)

            }
            const size = 0.6 - restScale;
            cube = gltf.scene.children[0];
            var cubeMat = new THREE.MeshStandardMaterial({
               color: "#FFFFFF",
               metalness: 0.6,
               roughness: 0.6,
               envMap: background,
            })
            cube.material = cubeMat;
            cube.scale.set(size, size, size);
            const z =  1;
            const y = -4;
            //attributes for each cube
            cubeLi = cube.clone();
            cubeLi.name = "cubeLi"
            cubeLi.material = cubeMat.clone()
            cubeLi.material.map = liImgC;
            cubeLi.position.set(-2 - ((w-300)/800) + (restPos*3), y , z)
            cubeLi.userData = {
               URL:"https://www.linkedin.com/in/mauromezab/",
               HTML: `</br></br><h3 class="sobre">Conecta conmigo en LinkedIn.</h3>`,
            }
            scene.add(cubeLi)
            
            cubeGh = cube.clone();
            cubeGh.name = "cubeGh"
            cubeGh.material = cubeMat.clone()
            cubeGh.material.map = ghImgC;
            cubeGh.position.set(-.65 - ((w-300)/2000) + (restPos), y , z)
            cubeGh.userData = {
               URL:"https://github.com/MauricioMeza",
               HTML: `</br></br><h3 class="sobre">Revisa mis repositiorios en Github.</h3>`,
            }
            scene.add(cubeGh)
            
            cubeAs = cube.clone();
            cubeAs.name = "cubeAs"
            cubeAs.material = cubeMat.clone()
            cubeAs.material.map = asImgC;
            cubeAs.position.set(.65 + ((w-300)/2000) - (restPos), y , z)
            cubeAs.userData = {
               URL:"https://www.artstation.com/mmezab",
               HTML: `</br></br><h3 class="sobre">Mi mejor Arte 3D en Artstation.</h3>`,
            }
            scene.add(cubeAs)
            
            cubeIg = cube.clone()
            cubeIg.name = "cubeIg"
            cubeIg.material = cubeMat.clone()
            cubeIg.material.map = igImgC;
            cubeIg.position.set(2 + ((w-300)/800) - (restPos*3), y , z)
            cubeIg.userData = {
               URL:"https://www.instagram.com/mauro_meza_3d/",
               HTML: `</br></br><h3 class="sobre">Trabajos varios de Desarrollo y 3D en Instagram.</h3>`,
            }
            scene.add(cubeIg)
            resolve('ok');
         });
         
         //grid plane
         new GLTFLoader(manager)
            .load("./models/plane.glb",
            function ( gltf ) {
               plane = gltf.scene.children[0]
               plane.position.y += 2.5;
               scene.add(plane)
               planeLoaded = true;
            });
         
         //background
         new GLTFLoader(manager)
            .load("./models/scene.glb",
            function ( gltf ) {
               scene.add(gltf.scene)
         });
         
   });
   
}

//---FINISH LOADING---
function loaded(){
   return new Promise(resolve => {
      setTimeout(() => {
         load.style.visibility = "hidden";
         load.style.opacity = 0;           
      }, 200);
      resolve('ok')     
   });
}
externalLoads();

/*-------- EVENTS AND INTERACTIONS --------*/

//---track mouse from center and normalized---
var mouseX = 0;
var mouseY = 0;
var mouseNormal = new THREE.Vector2();
track.addEventListener("mousemove", function(e){
   e.preventDefault()
   mouseX = (e.clientX - (w/2)) / w;
   mouseY = (e.clientY - (h/2)) / h;
   mouseNormal.x = ( e.clientX / w ) * 2 - 1;
   mouseNormal.y = - ( e.clientY / h ) * 2 + 1;
})

//---get mouse clicks---
track.addEventListener("click", function(e){
   e.preventDefault()
   if (highlighted || mobile){
      ray.setFromCamera( mouseNormal, camera);
      var intersect = ray.intersectObject(scene);
      if (intersect.length > 0) {
         var obj = intersect[0].object
         if(obj.userData.URL != undefined){
            window.open(obj.userData.URL)
         } 
      }
   }
})

//---resize events for responsiveness---
window.addEventListener("resize", function(e){
   w = window.innerWidth;
   h = window.innerHeight;
   renderer.setSize(w, h);
   camera.aspect = w/h;
   camera.updateProjectionMatrix();
})


//---raycasting for selection---
var ray = new THREE.Raycaster();
var highlighted = false;

//---highlight action---
var rotateleft, rotateright;
rotateleft = true;
function highlightAction(obj, img, inverted, link){
   if(!highlighted && !mobile){
      obj.material.map = img;
      highlighted = true;
      document.body.style.cursor = "pointer";
      obj.position.z = 1.5;
      title.innerHTML = obj.userData.HTML;
   }
   
   if(obj.rotation.z >= .15){
      rotateleft = false;
      rotateright = true;
   }
   if(obj.rotation.z <= -.15){
      rotateleft = true;
      rotateright = false;
   }
    
   if(rotateleft && !mobile){
      obj.rotation.z += 0.025;
   }
   if(rotateright && !mobile){
      obj.rotation.z -= 0.025;
   }
}

//---reset all highlighted actions---4
function resethighlight(){
   if(highlighted){
      cubeLi.material.map = liImgC;
      cubeGh.material.map = ghImgC;
      cubeAs.material.map = asImgC;
      cubeIg.material.map = igImgC;
      cubeLi.rotation.z = 0;
      cubeGh.rotation.z = 0;
      cubeAs.rotation.z = 0;
      cubeIg.rotation.z = 0;
      cubeLi.position.z = 1;
      cubeGh.position.z = 1;
      cubeAs.position.z = 1;
      cubeIg.position.z = 1;
      document.body.style.cursor = "default";
      title.innerHTML = defaultText;
      highlighted = false;
   }  
}

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
   //raycaster
   ray.setFromCamera( mouseNormal, camera);
   var intersect = ray.intersectObject(scene);
   if (intersect.length > 0) {
      var obj = intersect[0].object
      switch(obj.name){
         case "Plane":
            resethighlight()
            break;
         case "Plane006":
            resethighlight();
            break;
         case "cubeLi":
            highlightAction(obj, liImg)
            break;
         case "cubeGh":
            highlightAction(obj, ghImg)
            break;
         case "cubeAs":
            highlightAction(obj, asImg)
            break;
         case "cubeIg":
            highlightAction(obj, igImg)
            break;
      }
   }

   requestAnimationFrame(animate);
	renderer.render(scene, camera);
}
animate();