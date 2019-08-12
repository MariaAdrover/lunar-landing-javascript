
//ENTORNO
var g = 1.622;
var dt = 0.016683;
var timer=null;
var timerFuel=null;
//NAVE
var y = 10; // altura inicial y0=10%, debe leerse al iniciar si queremos que tenga alturas diferentes dependiendo del dispositivo
var v = 0;
var c = 100;
var a = g; //la aceleración cambia cuando se enciende el motor de a=g a a=-g (simplificado)
//MARCADORES
var velocidad = null;
var altura = null;
var combustible = null;

//al cargar por completo la página...
window.onload = function(){
	
	velocidad = document.getElementById("velocidad");
	altura = document.getElementById("altura");
	combustible = document.getElementById("fuel");

	
	//definición de eventos
	//mostrar menú móvil
    	document.getElementById("showm").onclick = function () {
		document.getElementsByClassName("c")[0].style.display = "block";
		stop();
	}
	//ocultar menú móvil
	document.getElementById("hidem").onclick = function () {
		document.getElementsByClassName("c")[0].style.display = "none";
		start();
	}
	//encender/apagar el motor al hacer click en la pantalla
	document.onclick = function () {
 	  if (a==g){
  		motorOn();
 	  } else {
  		motorOff();
 	  }
	}
	//encender/apagar al apretar/soltar una tecla
	document.onkeydown = motorOn;
	document.onkeyup = motorOff;
	
	//Empezar a mover la nave justo después de cargar la página
	start();
}

//Definición de funciones
function start(){
	//cada intervalo de tiempo mueve la nave
	timer=setInterval(function(){ moverNave(); }, dt*1000);
}

function stop(){
	
	clearInterval(timer);
	
	//Si pulso sobre la pantalla la imagen del cohete aterrizado se mantiene sin fuego
	document.onclick = function(){
		document.getElementById("n").src = "img/cohete.png"
	}
	//Si pulso una tecla la imagen del cohete aterrizado se mantiene sin fuego
	document.onkeydown = function(){
		document.getElementById("n").src = "img/cohete.png"
	}
	//Al haber aterrizado la velocidad y altura se ponen a 0
	velocidad.innerHTML=0;
	altura.innerHTML=0;	
}

function moverNave(){
	//cambiar velocidad y posicion
	v +=a*dt;
	y +=v*dt;
	//actualizar marcadores
	velocidad.innerHTML=v.toFixed(1);
	altura.innerHTML=(70-y).toFixed(1);
	
	//mover hasta que top sea un 70% de la pantalla
	if (y<70){ 
		document.getElementById("nave").style.top = y+"%"; 
	} else { 
		stop();
	}
}
function motorOn(){
	//el motor da aceleración a la nave
	a=-g;
	//Cambio la imagen de la nave: con fuego
	document.getElementById("n").src = "img/coheteFuego.png"
	//mientras el motor esté activado gasta combustible
	if (timerFuel==null)
	timerFuel=setInterval(function(){ actualizarFuel(); }, 10);	
}
function motorOff(){
	a=g;
	clearInterval(timerFuel);
	timerFuel=null;
	//Cambio la imagen de la nave: sin fuego
	document.getElementById("n").src = "img/cohete.png"
}
function actualizarFuel(){
	//Restamos combustible hasta que se agota
	c-=0.1;
	if (c < 0 ) c = 0;
	//combustible.innerHTML=c;
	combustible.style.width=c+"%";
}
