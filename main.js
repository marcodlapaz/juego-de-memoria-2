// INICIALIZACIÓN DE VARIABLES
let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 30;
let timerInicial = 30;
let tiempoRegresivoId = null;

// APUNTANDO A DOCUMENTO HTML
let mostrarMovimientos = document.getElementById("movimientos");
let mostrarAciertos = document.getElementById("aciertos");
let mostrarTiempo = document.getElementById("t-restante");

// GENERACIÓN DE NÚMEROS ALEATORIOS
let numeros = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
numeros = numeros.sort(() => { return Math.random() - 0.5 });

console.log(numeros);

// FUNCIONES
function contarTiempo() {
  tiempoRegresivoId = setInterval(() => {
    timer--;
    mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`;

    if (timer == 0) {
      clearInterval(tiempoRegresivoId);
      bloquearTarjetas();
    }
  }, 1000);
}

function bloquearTarjetas() {
  for (let i = 0; i <= 15; i++) {
    let tarjetaBloqueda = document.getElementById(i);
    tarjetaBloqueda.innerHTML = numeros[i];
    tarjetaBloqueda.disabled = true;
  }
}

// FUNCIÓN PRINCIPAL
function destapar(id) {
  if (temporizador == false) {
    contarTiempo();
    temporizador = true;
  }

  tarjetasDestapadas++;
  console.log(tarjetasDestapadas);

  if (tarjetasDestapadas == 1) {
    // MOSTRAR EL PRIMER NÚMERO
    tarjeta1 = document.getElementById(id);
    primerResultado = numeros[id];
    tarjeta1.innerHTML = primerResultado;

    // DESHABILITANDO EL PRIMER BOTÓN
    tarjeta1.disabled = true;
  } else if (tarjetasDestapadas == 2) {
    // MOSTRAR SEGUNDO NÚMERO
    tarjeta2 = document.getElementById(id);
    segundoResultado = numeros[id];
    tarjeta2.innerHTML = segundoResultado;

    // DESHABILITANDO EL SEGUNDO BOTÓN
    tarjeta2.disabled = true;

    // INCREMENTAR MOVIMIENTOS
    movimientos++;
    mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;

    if (primerResultado == segundoResultado) {
      tarjetasDestapadas = 0;

      // AUMENTAR ACIERTOS
      aciertos++;
      mostrarAciertos.innerHTML = `Aciertos ${aciertos}`;

      if (aciertos == 8) {
        clearInterval(tiempoRegresivoId);
        mostrarAciertos.innerHTML = `Aciertos ${aciertos} 😉👍`;
        mostrarTiempo.innerHTML = `Fantástico 🎉 solo demoraste ${timerInicial - timer} segundos`;
        mostrarMovimientos.innerHTML = `Movimientos: ${movimientos} 😎🤘`;
      }
    } else {
      // VOLVER A TAPAR LOS VALORES
      setTimeout(() => {
        tarjeta1.innerHTML = "";
        tarjeta2.innerHTML = "";
        tarjeta1.disabled = false;
        tarjeta2.disabled = false;
        tarjetasDestapadas = 0;
      }, 1000);
    }
  }
}