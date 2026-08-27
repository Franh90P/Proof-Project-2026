const inputHora = document.getElementById("horaInicio");
const checkHora = document.getElementById("horaActual");

// ACTUALIZAR HORA

function actualizarHora() {


    if (!checkHora.checked) return;

    const ahora = new Date();

    const h = String(ahora.getHours()).padStart(2, "0");
    const m = String(ahora.getMinutes()).padStart(2, "0");

    inputHora.value = `${h}:${m}`;


}

// AL CARGAR LA PÁGINA

window.onload = function () {


    actualizarHora();

    inputHora.disabled = true;

    setInterval(actualizarHora, 1000);

    cargarHistorial();


};

// CHECKBOX HORA ACTUAL

checkHora.addEventListener("change", function () {


    if (this.checked) {

        inputHora.disabled = true;
        actualizarHora();

    } else {

        inputHora.disabled = false;

    }


});

// CALCULAR

function calcular() {


    const hora = inputHora.value;
    const tiempo = Number(document.getElementById("tiempo").value);
    const cantidadTirada = Number(document.getElementById("cantidadTirada").value);
    const cantidadPedido = Number(document.getElementById("cantidadPedido").value);

    if (!hora || tiempo <= 0 || cantidadTirada <= 0 || cantidadPedido <= 0) {

        alert("Completa todos los campos.");

        return;
    }

    const tiradas = Math.ceil(cantidadPedido / cantidadTirada);

    const minutosTotales = tiradas * tiempo;

    const horas = Math.floor(minutosTotales / 60);
    const minutos = minutosTotales % 60;

    const partes = hora.split(":");

    const inicio = new Date();

    inicio.setHours(Number(partes[0]));
    inicio.setMinutes(Number(partes[1]));
    inicio.setSeconds(0);

    const fin = new Date(inicio.getTime() + minutosTotales * 60000);

    const horaFin = String(fin.getHours()).padStart(2, "0");
    const minutoFin = String(fin.getMinutes()).padStart(2, "0");

    const dias = Math.floor(minutosTotales / (24 * 60));


    // MOSTRAR RESULTADO

    document.getElementById("resultado").innerHTML = `

    <strong>Tiradas necesarias:</strong> ${tiradas}<br>

    <strong>Tiempo total:</strong> ${minutosTotales} minutos<br>

    <strong>Equivale a:</strong> ${horas} horas y ${minutos} minutos<br>

    <strong>Hora estimada de finalización:</strong> ${horaFin}:${minutoFin}
    ${dias > 0 ? ` (+${dias} día${dias > 1 ? "s" : ""})` : ""}

`;


    // GUARDAR EN HISTORIAL

    const calculo = {

        fecha: new Date().toLocaleString("es-ES"),

        horaInicio: hora,

        tiempo: tiempo,

        cantidadTirada: cantidadTirada,

        cantidadPedido: cantidadPedido,

        tiradas: tiradas,

        minutosTotales: minutosTotales,

        horas: horas,

        minutos: minutos,

        horaFin: `${horaFin}:${minutoFin}`,

        dias: dias

    };


    let historial = JSON.parse(localStorage.getItem("historial")) || [];

    historial.push(calculo);

    localStorage.setItem("historial", JSON.stringify(historial));

    cargarHistorial();


}

// CARGAR HISTORIAL

function cargarHistorial() {


    const historial = JSON.parse(localStorage.getItem("historial")) || [];

    const contenedor = document.getElementById("historial");

    if (!contenedor) return;


    if (historial.length === 0) {

        contenedor.innerHTML = "<p>No hay cálculos en el historial.</p>";

        return;

    }


    contenedor.innerHTML = "";


    historial.forEach((calculo, index) => {

        contenedor.innerHTML += `

        <div class="historial-item">

            <strong>Cálculo #${index + 1}</strong>

            <p>Fecha: ${calculo.fecha}</p>

            <p>Hora inicio: ${calculo.horaInicio}</p>

            <p>Tiempo por tirada: ${calculo.tiempo} minutos</p>

            <p>Cantidad por tirada: ${calculo.cantidadTirada}</p>

            <p>Cantidad pedido: ${calculo.cantidadPedido}</p>

            <p>Tiradas necesarias: ${calculo.tiradas}</p>

            <p>Tiempo total: ${calculo.minutosTotales} minutos</p>

            <p>Hora final: ${calculo.horaFin}</p>

            <button onclick="eliminarCalculo(${index})">
                Eliminar
            </button>

        </div>

    `;

    });


}

// ELIMINAR UN CÁLCULO

function eliminarCalculo(index) {


    let historial = JSON.parse(localStorage.getItem("historial")) || [];

    historial.splice(index, 1);

    localStorage.setItem("historial", JSON.stringify(historial));

    cargarHistorial();


}
function borrarHistorial() {


if (!confirm("¿Seguro que quieres borrar todo el historial?")) {
    return;
}

localStorage.removeItem("historial");

cargarHistorial();


}
