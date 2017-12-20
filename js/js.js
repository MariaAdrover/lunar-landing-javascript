
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
var nave=1; //Identificador de los modelos de naves
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
		document.getElementsByClassName("menu")[0].style.display = "block";
		stop();
	}
	//ocultar menú móvil
	document.getElementById("hidem").onclick = function () {
		document.getElementsByClassName("menu")[0].style.display = "none";
		
		/*Al apretar volver al juego la nave ya no funciona
		document.onkeydown = motorOn;
	    document.onkeyup = motorOff;*/
		
		start();
	}
	
	//Cambiar de nave
	document.getElementById('cambiarNave').onclick = function() {
		cambiarNave();
	}
	
	//encender/apagar el motor al hacer click en la pantalla
	/*document.onclick = function () {
 	  if (a==g){
  		motorOn();
 	  } else {
  		motorOff();
 	  }
	}*/
	//encender/apagar al apretar/soltar una tecla
	
	/*document.onkeydown = function (e){ //solo al apretar espacio NO FUNCIONA
		if (e.keyCode==32){
			motorOn();
		}else{motorOff();}
	}*/
	
	/*document.onkeydown = function(){ NO FUNCIONA
		var e=event.keyCode;
		if (e==32){
			motorOn();
		}else{motorOff();}
	}*/
	
	document.onkeydown = motorOn;
	document.onkeyup = motorOff;
	
	//Empezar a mover la nave justo después de cargar la página
	start();
}

//Definición de funciones

function cambiarNave(){
	if (nave<2){
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
	
	//Con estas dos lineas, al volver del menu la nave sigue funcionando
	document.onkeydown = motorOn;
	document.onkeyup = motorOff;
}

function stop(){
	
	clearInterval(timer);
	
	//Si pulso sobre la pantalla la imagen del cohete aterrizado se mantiene sin fuego
	document.onclick = function(){
		if (nave==1){
			document.getElementById("n").src = "img/cohete.png"
		}else{
			document.getElementById("n").src = "img/cohete2.png"
		}		
	}
	
	//Si pulso una tecla la imagen del cohete aterrizado se mantiene sin fuego
	document.onkeydown = function(){
		if (nave==1){
			document.getElementById("n").src = "img/cohete.png"
		}else{
			document.getElementById("n").src = "img/cohete2.png"
		}
	}
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
	/*if (y<70){ 
		document.getElementById("nave").style.top = y+"%"; 
	} else { 
		stop();
	}*/
	
	if (y<0){ //Evita que la nave se salga de la pantalla, rebotando...	
		document.getElementById("nave").style.top = "0%";
		v=-v;
	} else if(y<70&&y>=0) { 
		document.getElementById("nave").style.top = y+"%";
	} else { 
		stop();
	}
	
}
function motorOn(){
	//el motor da aceleración a la nave
	
	//a=-g;
	if (c>0){ //Al acelerar sale fuego de la nave, pero sólo si queda combustible
		a=-g;
		if (nave==1){
			document.getElementById("n").src = "img/coheteFuego.png"
		}else{
			document.getElementById("n").src = "img/cohete2Fuego.png"
		}
	}else{ //Si no queda combustible el motor se apaga
		motorOff();
	}
	//Cambio la imagen de la nave: con fuego
	
	//mientras el motor esté activado gasta combustible
	if (timerFuel==null)
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
	//combustible.innerHTML=c;
	combustible.style.width=c+"%";
}
