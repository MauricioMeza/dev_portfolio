var title = document.getElementById("title")
var pantalla = document.getElementById("pantalla")
var b1 = document.getElementById("b1")
var b2 = document.getElementById("b2")
var b3 = document.getElementById("b3")
var b4 = document.getElementById("b4")

const t1 = `</br>
            <h3 class="sobre">Proyectos de Desarrollo Web y Movíl
            </br>
            principalmente con Javascript, Java y Python</h3>`

const t2 =`</br>
            <h3 class="sobre">Videojuegos y Experiencias Interactivas 
            </br>
            desarrollados con Unity o Javascript para la Web</h3>`

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
                    <h3 class="sobre">Software | Juegos | XR</h3>`


//Funcion para cambiar el texto
function changeText(e, text, percentage, img){
    e.preventDefault()
    title.innerHTML = text;
    if(percentage){
        pantalla.style.opacity = 1;
        pantalla.style.marginLeft = percentage;
        pantalla.src = "./models/" + img;
    }else{
        pantalla.style.opacity = 0;
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