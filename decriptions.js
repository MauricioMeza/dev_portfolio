var title = document.getElementById("title")
var pantalla = document.getElementById("pantalla")
var b1 = document.getElementById("b1")
var b2 = document.getElementById("b2")
var b3 = document.getElementById("b3")
var b4 = document.getElementById("b4")
var b1en = document.getElementById("b1en")
var b2en = document.getElementById("b2en")
var b3en = document.getElementById("b3en")
var b4en = document.getElementById("b4en")

var mobile = screen.orientation.type == 'portrait-primary' || screen.orientation.angle == 90;


const t1 = `</br>
            <h3 class="sobre">Proyectos interactivos de Desarrollo Web y Movíl,
            </br>
            creados con Javascript, HTML, CSS</h3>`
const t1en =`</br>
            <h3 class="sobre">Interactive Web and Mobile Development,
            </br>
            made with Javascript, HTML, CSS.</h3>`

const t2 =`</br>
            <h3 class="sobre">Videojuegos y Experiencias Interactivas, 
            </br>
            desarrollados con Unity y C#.</h3>`
const t2en =`</br>
            <h3 class="sobre">Videogames and Interactive Experiences,
            </br>
            developed with Unity - C#.</h3>`

const t3 = `</br>
            <h3 class="sobre">Modelado y Animación 3D en Blender.
            </br>
            Modelado inorgánico de Assets para Juegos y Renders
            </h3>`
const t3en =`</br>
            <h3 class="sobre">3D Modelling and Animations in Blender,
            </br>
            inorganic models for games and renders.
            </h3>`

const t4 = `</br>
            <h3 class="sobre">Un poco de Información sobre mi.
            </br>
            quien soy yo, mi experiencia y CV
            </h3>`
const t4en =`</br>
            <h3 class="sobre">Some Information about me,
            </br>
            my experience and CV.
            </h3>`

const defaultText =`<h2 id="nome"><strong>Mauricio Meza Burbano</strong></h2>
                    <h3 class="sobre"><strong>Desarrollador con pasión por el Arte 3D</strong></h3>
                    <h3 class="sobre">Videojuegos | Software | XR | 3D</h3>`
const defaultTexten=`<h2 id="nome"><strong>Mauricio Meza</strong></h2>
                    <h3 class="sobre"><strong>Developer with a passion for 3D Art</strong></h3>
                    <h3 class="sobre">Videogames | Software | XR | 3D</h3>`

//Funcion para cambiar el texto
function changeText(e, text, percentage, img){
    e.preventDefault()
    if(!mobile){
        title.innerHTML = text;
        if(percentage){
            pantalla.src = "./models/img/" + img;
            pantalla.style.marginLeft = percentage;
            pantalla.style.opacity = 1;
            if(parseInt(percentage) == -11){
                pantalla.style.transform = "rotateY(-8deg)"
            }
            else if(parseInt(percentage) == -10){
                pantalla.style.transform = "rotateY(8deg)"
            }
        }else{
            pantalla.style.opacity = 0;
            pantalla.src = "./models/img/pantallastatic.png"
        }
    }
}
try{
    b1.addEventListener("mouseover", (e) => {changeText(e, t1, "-11.5%", "pantalla1.png")})
    b2.addEventListener("mouseover", (e) => {changeText(e, t2, "-10.5%", "pantalla2.png")})
    b3.addEventListener("mouseover", (e) => {changeText(e, t3, "-11.5%", "pantalla3.png")})
    b4.addEventListener("mouseover", (e) => {changeText(e, t4, "-10.5%", "pantalla4.png")})
    //Funcion para devolver al texto original
    b1.addEventListener("mouseout", (e) => {changeText(e, defaultText, false)})
    b2.addEventListener("mouseout", (e) => {changeText(e, defaultText, false)})
    b3.addEventListener("mouseout", (e) => {changeText(e, defaultText, false)})
    b4.addEventListener("mouseout", (e) => {changeText(e, defaultText, false)})
    var eng = false;
}catch{
    b1en.addEventListener("mouseover", (e) => {changeText(e, t1en, "-11.5%", "pantalla1.png")})
    b2en.addEventListener("mouseover", (e) => {changeText(e, t2en, "-10.5%", "pantalla2.png")})
    b3en.addEventListener("mouseover", (e) => {changeText(e, t3en, "-11.5%", "pantalla3.png")})
    b4en.addEventListener("mouseover", (e) => {changeText(e, t4en, "-10.5%", "pantalla4.png")})
    //Funcion para devolver al texto original
    b1en.addEventListener("mouseout", (e) => {changeText(e, defaultTexten, false)})
    b2en.addEventListener("mouseout", (e) => {changeText(e, defaultTexten, false)})
    b3en.addEventListener("mouseout", (e) => {changeText(e, defaultTexten, false)})
    b4en.addEventListener("mouseout", (e) => {changeText(e, defaultTexten, false)})
    var eng = true;
}



//Incializacion de Modales Bootstrap
var myModal = document.getElementById('softModal')
myModal.addEventListener('shown.bs.modal', function () {
  b1.focus()
})

//Incializacion de Tooltips Bootstrap
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})
