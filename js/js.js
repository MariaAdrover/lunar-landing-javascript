
//ENTORNO
var g = 4.622;
var dt = 0.016683;
var timer=null;
var timerFuel=null;

//NAVE
var y = 5; // altura inicial y0=10%, debe leerse al iniciar si queremos que tenga alturas diferentes dependiendo del dispositivo
var v = 0;
var c = 100;
var a = g; //la aceleración cambia cuando se enciende el motor de a=g a a=-g (simplificado)
var vAterrizaje; //velocidad de aterrizaje
var nave=1; //Identificador de los modelos de naves
var aterrizado = false; 

//MARCADORES
var velocidad = null;
var altura = null;
var combustible = null;

//MENU
var menuVisible = false;


//al cargar por completo la página...
window.onload = function(){
	
	
	velocidad = document.getElementById("velocidad");
	altura = document.getElementById("altura");
	combustible = document.getElementById("fuel");

	
	//definición de EVENTOS
	
	//MENÚ	
	//mostrar/ocultar menú con el botón menú
    document.getElementById("showm").onclick = function () {
		if (menuVisible) {
			menuVisible = false;
			document.getElementsByClassName("menu")[0].style.display = "none";
			start();
		}else{
			document.getElementsByClassName("menu")[0].style.display = "block";
			stop();
			menuVisible = true;
		}
	}	
	//ocultar menú con botón -volver al juego- del menú
	document.getElementById("hidem").onclick = function () {
		menuVisible = false;
		document.getElementsByClassName("menu")[0].style.display = "none";		
		start();
	}	
	
	//cambiar de nave
	document.getElementById('cambiarNave').onclick = function() {
		cambiarNave();
	}	
	
	//MOTOR
	//encender/apagar el motor al hacer click en el boton POWER ON/POWER OFF
	document.getElementById('power').onclick = function () {
 	  if (a == g && aterrizado == false){
  		motorOn();
 	  } else {
  		motorOff();
 	  }
	}	
	//encender al apretar la tecla ESPACIO
	document.onkeydown = function (e){ //solo al apretar espacio NO FUNCIONA
		if (e.keyCode==32){
			motorOn();
		}
	}
	
	//apagar el motor al soltar la tecla ESPACIO
	document.onkeyup = motorOff;
	
	//Empezar a mover la nave justo después de cargar la página
	start();
}

//Definición de funciones

function cambiarNave(){
	if (nave<2){ //De momento sólo hay 2 modelos de nave
		nave++;
	}else{
		nave=1;
	}
	
	if (nave==1){
		document.getElementById('n').src='img/cohete.png';
	}else{
		document.getElementById('n').src='img/cohete2.png';
	}
}

function start(){
	//cada intervalo de tiempo mueve la nave
	timer=setInterval(function(){ moverNave(); }, dt*1000);
}

function stop(){
	
	clearInterval(timer);
	
	//Al haber aterrizado la velocidad y altura se ponen a 0
		if (y>=70){ //Sólo si ya hemos aterrizado, no cuando se despliega el menú
			velocidad.innerHTML=0;
			altura.innerHTML=0;
		}
}

function moverNave(){
	//cambiar velocidad y posicion
	v +=a*dt;
	y +=v*dt;
	
	//actualizar marcadores
	if (v<0) {  //si la velocidad es negativa pasarla a positiva en el marcador		
		velocidad.innerHTML=(-v).toFixed(1);
	}else{ 
		velocidad.innerHTML=v.toFixed(1);
	}
	altura.innerHTML=(70-y).toFixed(1);
	
	//mover hasta que top sea un 70% de la pantalla
	
	if (y<0){ //Evita que la nave se salga de la pantalla, rebotando...	
		document.getElementById("nave").style.top = "0%";
		v=-v;
	} else if(y<70&&y>=0) { 
		document.getElementById("nave").style.top = y+"%";
	} else {
		aterrizado = true;
		stop();
	}	
}

function motorOn(){
	//el motor da aceleración a la nave
	
	if (aterrizado == false && c>0){ //Al acelerar sale fuego de la nave, pero sólo si queda combustible y no hemos aterrizado
		a=-g;
		if (nave==1){
			document.getElementById("n").src = "img/coheteFuego.png"
		}else{
			document.getElementById("n").src = "img/cohete2Fuego.png"
		}
	}else{ 
		motorOff();
	}
	
	//mientras el motor esté activado gasta combustible 
	if (aterrizado == false && timerFuel==null)
	timerFuel=setInterval(function(){ actualizarFuel(); }, 10);	
}

function motorOff(){
	a=g;
	clearInterval(timerFuel);
	timerFuel=null;
	//Cambio la imagen de la nave: sin fuego
	if (nave==1){
			document.getElementById("n").src = "img/cohete.png"
		}else{
			document.getElementById("n").src = "img/cohete2.png"
		}
}

function actualizarFuel(){
	//Restamos combustible hasta que se agota
	c-=0.1;
	if (c < 0 ) c = 0;	
	combustible.style.width=c+"%";
}
