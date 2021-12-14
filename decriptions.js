var title = document.getElementById("title")
var pantalla = document.getElementById("pantalla")
var b1 = document.getElementById("b1")
var b2 = document.getElementById("b2")
var b3 = document.getElementById("b3")
var b4 = document.getElementById("b4")

var mobile = screen.orientation.type == 'portrait-primary' || screen.orientation.angle == 90;


const t1 = `</br>
            <h3 class="sobre">Proyectos de Desarrollo Web y Movíl
            </br>
            principalmente con Javascript, Java y Python</h3>`

const t2 =`</br>
            <h3 class="sobre">Videojuegos y Experiencias Interactivas 
            </br>
            desarrollados con Unity y C# o Javascript para la Web</h3>`

const t3 = `</br>
            <h3 class="sobre">Modelado y Animación 3D en Blender
            </br>
            modelado inorgánico de Assets para Juegos y Renders
            </h3>`

const t4 = `</br>
            <h3 class="sobre">Un poco de Información sobre mi.
            </br>
            quien soy yo, mi experiencia y CV
            </h3>`

const defaultText =`<h2 id="nome"><strong>Mauricio Meza Burbano</strong></h2>
                    <h3 class="sobre">Programador y Artista 3D </h3>
                    <h3 class="sobre">Software | Videojuegos | XR</h3>`

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
b1.addEventListener("mouseover", (e) => {changeText(e, t1, "-11.5%", "pantalla1.png")})
b2.addEventListener("mouseover", (e) => {changeText(e, t2, "-10.5%", "pantalla2.png")})
b3.addEventListener("mouseover", (e) => {changeText(e, t3, "-11.5%", "pantalla3.png")})
b4.addEventListener("mouseover", (e) => {changeText(e, t4, "-10.5%", "pantalla4.png")})


//Funcion para devolver al texto original
b1.addEventListener("mouseout", (e) => {changeText(e, defaultText, false)})
b2.addEventListener("mouseout", (e) => {changeText(e, defaultText, false)})
b3.addEventListener("mouseout", (e) => {changeText(e, defaultText, false)})
b4.addEventListener("mouseout", (e) => {changeText(e, defaultText, false)})

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
