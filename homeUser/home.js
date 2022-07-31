//desloguear
const deslogBTN = document.querySelector(".deslog");
//log
const datos = document.querySelector(".datos");
//depositos
const depositosBTN = document.querySelector("#depositosBTN");
const depositarCash = document.querySelector("#depositarCash");
const sectionDepositos = document.getElementById("depositos");
const montoDeposito = document.querySelector("#montoDeposito");
//servicios
const serviciosBTN = document.querySelector("#serviciosBTN");
const sectionServicios = document.querySelector("#servicios");
const AdherirBTN = document.querySelector("#AdherirBTN");
const sacarBTN = document.querySelector("#sacarBTN");
const pagarBTN = document.querySelector("#pagarBTN");
const comprobantesBTN = document.querySelector("#comprobantesBTN");
const addServSection = document.querySelector("#addServ");
const sacarServSection = document.querySelector("#sacarServ");
const pagarServSection = document.querySelector("#pagarServ");
const comprobanteServSection = document.querySelector("#comprobantesServ");
const servContainer = document.querySelector("servContainer");
const addNuevoServicio = document.querySelector("#addNuevoServ");
const montoServicio = document.querySelector("#montoServicio");
const opcionesServicio = document.querySelector("#opcionesServicio");
//transferencias
const transferenciasBTN = document.querySelector("#transferenciasBTN");
const sectionTransferencias = document.getElementById("transferencias");
const montoTransferido = document.querySelector("#montoTransferencia");
const usuarioRecibeTransf = document.querySelector("#usuarioRecibeTransf");
const transferirBTN = document.querySelector("#transferir");

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
  for (let i in baseDeDatos) {
    if (baseDeDatos[i].email === usuarioLogueado.email) {
      let refrescar = baseDeDatos[i].saldo;
      usuarioLogueado.saldo = refrescar;
      localStorage.setItem(user, JSON.stringify(usuarioLogueado));
    }
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
  for (let i in baseDeDatos) {
    if (baseDeDatos[i].email === usuarioLogueado.email) {
      baseDeDatos[i].saldo = usuarioLogueado.saldo;
      localStorage.setItem("baseDeDatos", JSON.stringify(baseDeDatos));
    }
  }
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
  sectionServicios.classList.remove("show");
  sectionTransferencias.classList.remove("show");
});
depositarCash.addEventListener("click", (e) => {
  e.preventDefault();
  usuarioLogueado.saldo += parseInt(montoDeposito.value);
  localStorage.setItem(user, JSON.stringify(usuarioLogueado));
  for (let i in baseDeDatos) {
    if (baseDeDatos[i].email === usuarioLogueado.email) {
      baseDeDatos[i].saldo = usuarioLogueado.saldo;
      localStorage.setItem("baseDeDatos", JSON.stringify(baseDeDatos));
    }
  }
  datos.innerHTML = "";
  pintarDatos();
});
//Seccion transferencias
transferenciasBTN.addEventListener("click", (e) => {
  e.preventDefault();
  sectionTransferencias.classList.toggle("show");
  sectionDepositos.classList.remove("show");
  sectionServicios.classList.remove("show");
});

transferirBTN.addEventListener("click", (e) => {
  e.preventDefault();
  transferir();
});
function transferir() {
  let monto = montoTransferido.value;
  let usuarioRecibe = usuarioRecibeTransf.value;
  function restarSaldo() {
    usuarioLogueado.saldo -= parseInt(monto);
    localStorage.setItem(user, JSON.stringify(usuarioLogueado));
    datos.innerHTML = "";
    pintarDatos();
  }

  if (
    baseDeDatos.some((usuario) => usuario.email == usuarioRecibeTransf.value)
  ) {
    baseDeDatos.forEach((usuario) => {
      let monto = montoTransferido.value;
      if (usuario.email === usuarioRecibeTransf.value) {
        restarSaldo();
        usuario.saldo += parseInt(monto);
        localStorage.setItem("baseDeDatos", JSON.stringify(baseDeDatos));
      }
    });
  }
  montoTransferido.value = "";
  usuarioRecibeTransf.value = "";
}

//Seccion servicios
serviciosBTN.addEventListener("click", (e) => {
  e.preventDefault();
  sectionServicios.classList.toggle("show");
  sectionDepositos.classList.remove("show");
  sectionTransferencias.classList.remove("show");
});

AdherirBTN.addEventListener("click", (e) => {
  e.preventDefault();
  addServSection.classList.toggle("show");
  sacarServSection.classList.remove("show");
  pagarServSection.classList.remove("show");
  comprobanteServSection.classList.remove("show");
});
sacarBTN.addEventListener("click", (e) => {
  e.preventDefault();
  sacarServSection.classList.toggle("show");
  addServSection.classList.remove("show");
  pagarServSection.classList.remove("show");
  comprobanteServSection.classList.remove("show");
});

pagarBTN.addEventListener("click", (e) => {
  e.preventDefault();
  pagarServSection.classList.toggle("show");
  sacarServSection.classList.remove("show");
  comprobanteServSection.classList.remove("show");
  addServSection.classList.remove("show");
});

comprobantesBTN.addEventListener("click", (e) => {
  comprobanteServSection.classList.toggle("show");
  sacarServSection.classList.remove("show");
  addServSection.classList.remove("show");
  pagarServSection.classList.remove("show");
});
