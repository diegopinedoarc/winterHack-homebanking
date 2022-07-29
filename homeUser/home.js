const deslogBTN = document.querySelector(".deslog");
const datos = document.querySelector(".datos");
const depositosBTN = document.querySelector("#depositosBTN");
const depositarCash = document.querySelector("#depositarCash");
const serviciosBTN = document.querySelector("#serviciosBTN");
const transferenciasBTN = document.querySelector("#transferenciasBTN");
const sectionDepositos = document.getElementById("depositos");
const montoDeposito = document.querySelector("#montoDeposito");
const sectionTransferencias = document.querySelector("#transferencias");
const sectionServicios = document.querySelector("#servicios");
//Arrays con datos de usuarios
let baseDeDatos = [];
let usuarioLogueado = [];
//Traigo la cookie del login y la guardo en una variable
let user = getCookie(`usuario`);
function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1);
    if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
  }
  return "";
}

descargarDatos();
//Funciona para descargar los datos del local storage a traves de la cookie traida del login
function descargarDatos() {
  if (localStorage.getItem(`baseDeDatos`)) {
    baseDeDatos = JSON.parse(localStorage.getItem(`baseDeDatos`));
  }
  if (localStorage.getItem(user)) {
    usuarioLogueado = JSON.parse(localStorage.getItem(user));
  }
  pintarDatos();
}
//Funcion parap intar los datos del usuario
function pintarDatos() {
  const h2 = document.createElement("h2");
  const h3 = document.createElement("h3");
  const p = document.createElement("p");
  h2.innerHTML = `¡Hola! ${usuarioLogueado.nombre} ${usuarioLogueado.apellido}`;
  h3.innerHTML = `Tu CBU es: ${usuarioLogueado.CBU}`;
  p.innerHTML = `Tu saldo en cuenta es: $${usuarioLogueado.saldo}`;
  h3.classList.add("textoDatos");
  h2.classList.add("textoDatos");
  p.classList.add("textoDatos");
  datos.appendChild(h2);
  datos.appendChild(h3);
  datos.appendChild(p);
}

deslogBTN.addEventListener("click", desloguear);
//Funcion pora eliminar la cookie que trae al usuario y sus datos, y luego redirecciona al login
function desloguear() {
  eliminarCookie(`usuario`);
  alLogin();
}
//Funcion que elimina la cookie
function eliminarCookie(cname) {
  return (document.cookie = cname + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;");
}
//Funciona que redirecciona al login
function alLogin() {
  location.assign("../login/login.html");
}
//Seccion depositos
depositosBTN.addEventListener("click", (e) => {
  e.preventDefault();
  sectionDepositos.classList.toggle("show");
});
depositarCash.addEventListener("click", () => {
  usuarioLogueado.saldo += parseInt(montoDeposito.value);
  localStorage.setItem(user, JSON.stringify(usuarioLogueado));
  pintarDatos();
});
//Seccion transferencias
transferenciasBTN.addEventListener("click", (e) => {
  e.preventDefault();
  sectionTransferencias.classList.toggle("show");
});
