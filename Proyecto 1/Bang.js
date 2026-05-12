function jugar() {
    ponerBG();
    setTimeout(
        function() {
            window.location.assign("Personaje.html");
        },2000)
        var sfxStart = new Audio('sfx/start.m4a');
        sfxStart.play();
}

function ponerBG(){
    document.querySelector('.bg-transicion').classList.add('bg-transicion-show');
}

function quitarBG(){
    const overlay = document.querySelector('.bg-transicion');
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0)";
    overlay.style.pointerEvents = "none";
    setTimeout(
        function() {
            overlay.classList.remove('bg-transicion-show');
        },2000)
}

let personajeActual = 1;
function siguientePersonaje(){
    personajeActual++;
    if(personajeActual == 7){
        personajeActual = 1;
    }
    document.getElementById("personaje").src = "img/p"+personajeActual+".png"
    var sfxclick = new Audio('sfx/Moneda.m4a');
    sfxclick.play();
}

function anteriorPersonaje(){
    personajeActual--;
    if(personajeActual == 0){
        personajeActual = 6;
    }
    document.getElementById("personaje").src = "img/p"+personajeActual+".png"
    var sfxclick = new Audio('sfx/Moneda.m4a');
    sfxclick.play();

}


function personaje2(){
    localStorage.setItem("personaje1", personajeActual);
    localStorage.setItem("jugador1", document.getElementById("jugador1").value);

    ponerBG();
    setTimeout(
        function() {
            window.location.assign("Personaje2.html");
        },2000)
    var sfxStart = new Audio('sfx/Moneda.m4a');
    sfxStart.play();
}

function comenzarJuego(){
    localStorage.setItem("personaje2", personajeActual);
    localStorage.setItem("jugador2", document.getElementById("jugador2").value);

    ponerBG();
    setTimeout(
        function() {
            window.location.assign("Juego.html");
        },2000)
    var sfxStart = new Audio('sfx/start.m4a');
    sfxStart.play();
}

function cargarEscenario() {

  let escenario = document.getElementById("escenario");
  if (!escenario) return; 

  // Fondo aleatorio
  let bg = Math.floor(Math.random() * 3) + 1;
  escenario.style.backgroundImage = `url('img/bg${bg}.png')`;
  escenario.style.backgroundSize = "cover";
  escenario.style.backgroundPosition = "center";

  let nombre1 = localStorage.getItem("jugador1");
  let nombre2 = localStorage.getItem("jugador2");

  let personaje1 = localStorage.getItem("personaje1");
  let personaje2 = localStorage.getItem("personaje2");

  let n1 = document.getElementById("nombre1");
  let n2 = document.getElementById("nombre2");
  let p1 = document.getElementById("p1");
  let p2 = document.getElementById("p2");

  //Los nombres de los personajes
  if (n1) n1.textContent = nombre1;
  if (n2) n2.textContent = nombre2;

  if (p1 && personaje1) p1.src = "img/p" + personaje1 + ".png";
  if (p2 && personaje2) p2.src = "img/p" + personaje2 + ".png";

  //Los personajes se ven
  if (p1) p1.style.transform = "scaleX(1)";
  if (p2) p2.style.transform = "scaleX(-1)";

  listos();

  let b1 = parseInt(localStorage.getItem("bajas1") || 0);
  let b2 = parseInt(localStorage.getItem("bajas2") || 0);
  for(let i=0; i<b1; i++) document.querySelector('.vidas1').innerHTML += '<img src="img/calavera.png" class="bounceFromTop">';
  for(let i=0; i<b2; i++) document.querySelector('.vidas2').innerHTML += '<img src="img/calavera.png" class="bounceFromTop">';
}

function listos(){
    setTimeout(function() {
        document.querySelector('.msj').style.opacity = "1";
    }, 500);
}

function conteo(){
    var sfxclick = new Audio('sfx/Moneda.m4a');
    document.querySelector('.msj').style.opacity = "0";
    document.querySelector('.no3').style.opacity = "1";
    sfxclick.play();

    setTimeout(function() {
        document.querySelector('.no3').style.opacity = "0";
        document.querySelector('.no2').style.opacity = "1";
        sfxclick.play();

        setTimeout(function() {
            document.querySelector('.no2').style.opacity = "0";
            document.querySelector('.no1').style.opacity = "1";
            sfxclick.play();
            let tiempoRandom = (Math.floor(Math.random() * 3) + 1) * 500;

            setTimeout(function() {
                document.querySelector('.no1').style.opacity = "0";
                document.querySelector('.conteo').style.display = "none";
                sfxclick.play();
            }, tiempoRandom);
        }, 1000);
    }, 1000);
}

let bajas1 = 0;
let bajas2 = 0;

function disparo1(){
    document.querySelector('.right').onclick = null;
    document.querySelector('.left').onclick = null;

    let p1 = document.querySelector('#p1');
    let p2 = document.querySelector('#p2');
    
    let bajas = parseInt(localStorage.getItem("bajas2") || 0) + 1;
    localStorage.setItem("bajas2", bajas);

    p2.style.right = "-800px"; 
    p1.style.left = "15%";
    setTimeout(() => p1.style.left = "10%", 150);

    var sfxDisparo = new Audio('sfx/Pium.m4a');
    sfxDisparo.play();

    // Condición: Si aún no llega a 3, recarga. Si llega a 3, llama a finalizar.
    if(bajas < 3){
        setTimeout(() => window.location.assign("Juego.html"), 2000);
    } else {
        setTimeout(() => mostrarGanador(1), 2000); 
    }
}

function disparo2(){
    document.querySelector('.right').onclick = null;
    document.querySelector('.left').onclick = null;

    let p1 = document.querySelector('#p1');
    let p2 = document.querySelector('#p2');
    
    let bajas = parseInt(localStorage.getItem("bajas1") || 0) + 1;
    localStorage.setItem("bajas1", bajas);

    p1.style.left = "-800px"; 
    p2.style.right = "15%";
    setTimeout(() => p2.style.right = "10%", 150);

    var sfxDisparo = new Audio('sfx/Pium.m4a');
    sfxDisparo.play();

    if(bajas < 3){
        setTimeout(() => window.location.assign("Juego.html"), 2000);
    } else {
        setTimeout(() => mostrarGanador(2), 2000);
    }
}
function mostrarGanador(num) {
    // 1. Limpiar elementos innecesarios
    document.querySelector('.left').style.display = "none";
    document.querySelector('.right').style.display = "none";
    document.getElementById("nombre1").style.display = "none";
    document.getElementById("nombre2").style.display = "none";

    // 2. Identificar al ganador
    let ganadorImg = document.getElementById("p" + num);
    let nombreGanador = localStorage.getItem("jugador" + num);

    // 3. Posicionar al ganador en el centro
    ganadorImg.style.transition = "all 1s ease";
    ganadorImg.style.left = "50%";
    ganadorImg.style.bottom = "100px";
    ganadorImg.style.width = "500px";
    ganadorImg.style.transform = "scaleX(1)"; // Quitar espejo si era el P2

    // 4. Crear y mostrar el cartel
    let cartel = document.createElement("div");
    cartel.className = "cartel-ganador bounceFromTop";
    cartel.innerHTML = `<h1>¡GANADOR!</h1><h2>${nombreGanador}</h2>
                        <button class="btn-inicio" onclick="window.location.assign('Personaje.html')">VOLVER A JUGAR</button>`;
    document.body.appendChild(cartel);

    // 5. Resetear bajas para la próxima partida
    localStorage.setItem("bajas1", 0);
    localStorage.setItem("bajas2", 0);
}