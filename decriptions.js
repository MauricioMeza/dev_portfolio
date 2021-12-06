var title = document.getElementById("title")
var b1 = document.getElementById("b1")
var b2 = document.getElementById("b2")
var b3 = document.getElementById("b3")
var b4 = document.getElementById("b4")

b1.addEventListener("mouseover", function(e){
    title.innerHTML = `
    </br>
    <h3 class="sobre">Proyectos de Desarrollo Web y Movíl
    </br>
    principalmente con Javascript, Java y Python</h3>    
    `
});

b2.addEventListener("mouseover", function(e){
    title.innerHTML = `
    </br>
    <h3 class="sobre">Videojuegos y Experiencias Interactivas 
    </br>
    desarrollados con Unity o Javascript para la Web</h3>    
    `
});

b3.addEventListener("mouseover", function(e){
    title.innerHTML = `
    </br>
    <h3 class="sobre">Modelado y Animación 3D en Blender
    </br>
    modelado inorgánico de Assets para Juegos y Renders
    </h3>    
    `
});

b4.addEventListener("mouseover", function(e){
    title.innerHTML = `
    </br>
    <h3 class="sobre">Un poco de Información sobre mi.
    </br>
    quien soy yo, mi experiencia y CV
    </h3>    
    `
});

var defaultText = function(){
    title.innerHTML = `
        <h2 id="nome"><strong>Mauricio Meza Burbano</strong></h2>
        <h3 class="sobre">Programador y Artista 3D </h3>
        <h3 class="sobre">Software | Juegos | XR</h3>
    `
}
b1.addEventListener("mouseout", defaultText)
b2.addEventListener("mouseout", defaultText)
b3.addEventListener("mouseout", defaultText)
b4.addEventListener("mouseout", defaultText)
