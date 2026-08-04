
const inputHora=document.getElementById("horaInicio");
const checkHora=document.getElementById("horaActual");

function actualizarHora(){

    if(!checkHora.checked) return;

    const ahora=new Date();

    const h=String(ahora.getHours()).padStart(2,"0");
    const m=String(ahora.getMinutes()).padStart(2,"0");

    inputHora.value=`${h}:${m}`;
}

window.onload=function(){

    actualizarHora();

    inputHora.disabled=true;

    setInterval(actualizarHora,1000);

}

checkHora.addEventListener("change",function(){

    if(this.checked){

        inputHora.disabled=true;
        actualizarHora();

    }else{

        inputHora.disabled=false;

    }

});

function calcular(){

    const hora=inputHora.value;
    const tiempo=Number(document.getElementById("tiempo").value);
    const cantidadTirada=Number(document.getElementById("cantidadTirada").value);
    const cantidadPedido=Number(document.getElementById("cantidadPedido").value);

    if(!hora || tiempo<=0 || cantidadTirada<=0 || cantidadPedido<=0){

        alert("Completa todos los campos.");

        return;

    }

    const tiradas=Math.ceil(cantidadPedido/cantidadTirada);

    const minutosTotales=tiradas*tiempo;

    const horas=Math.floor(minutosTotales/60);
    const minutos=minutosTotales%60;

    const partes=hora.split(":");

    const inicio=new Date();

    inicio.setHours(Number(partes[0]));
    inicio.setMinutes(Number(partes[1]));
    inicio.setSeconds(0);

    const fin=new Date(inicio.getTime()+minutosTotales*60000);

    const horaFin=String(fin.getHours()).padStart(2,"0");
    const minutoFin=String(fin.getMinutes()).padStart(2,"0");

    const dias=Math.floor(minutosTotales/(24*60));

    document.getElementById("resultado").innerHTML=`

        <strong>Tiradas necesarias:</strong> ${tiradas}<br>

        <strong>Tiempo total:</strong> ${minutosTotales} minutos<br>

        <strong>Equivale a:</strong> ${horas} horas y ${minutos} minutos<br>

        <strong>Hora estimada de finalización:</strong> ${horaFin}:${minutoFin}
        ${dias>0?` (+${dias} día${dias>1?"s":""})`:""}

    `;

}
