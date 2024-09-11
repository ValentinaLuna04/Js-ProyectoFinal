//Objetos
const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{8,40}$/,
    numero: /^\d{10,14}$/,
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
}

const campos = {
    nombre: false,
    telefono: false,
    mail: false,
}

//Variables
const form = document.getElementById("form")
const inputs = document.querySelectorAll("#form input")
const cancelarCompra = document.getElementById("cancelarCompra")


//Funcionalidades
function enviarDatos(){
    Swal.fire({
        showConfirmButton: false,
        title: "Muchas gracias por comprar en nuestra tienda!",
        text: "En breve te llegarán los detalles de tu compra a tu mail y por tu número acordaremos el envío y el pago.",
        timer: 6000,
        imageUrl: "https://i.pinimg.com/564x/32/4b/5f/324b5f47fa41d1a78f67acd073c95f9c.jpg",
        timerProgressBar: true,
        imageHeight: "250px",
        background: "#292929",
        color: "#ffffff",
    })
}

function redirigir() {
    setTimeout(() => {
        window.location.href = '../index.html';
        localStorage.clear()
    }, 6000);
}

const validarCampo = (expresion, input, campo)=>{
    if (expresion.test(input.value)) {
        document.getElementById(`grupo-${campo}`).classList.remove("grupoIncorrecto")
        document.getElementById(`grupo-${campo}`).classList.add("grupoCorrecto")
        document.querySelector(`#grupo-${campo} .warnings`).classList.remove("warningsActivas")
        campos[campo] = true

    } else {
        document.getElementById(`grupo-${campo}`).classList.remove("grupoCorrecto")
        document.getElementById(`grupo-${campo}`).classList.add("grupoIncorrecto")
        document.querySelector(`#grupo-${campo} .warnings`).classList.add("warningsActivas")
        campos[campo] = false
    }
}

const validar = (e)=>{
    switch(e.target.name){
        case "nombre":
            validarCampo(expresiones.nombre, e.target, `nombre`)
        break
        case "telefono":
            validarCampo(expresiones.numero, e.target, `telefono`)
        break
        case "mail":
            validarCampo(expresiones.correo, e.target, `mail`)
        break
    }
}

inputs.forEach((input)=>{
    input.addEventListener("keyup", validar)
    input.addEventListener("blur", validar)
})



form.addEventListener("submit", (e) =>{
    e.preventDefault()
    const metodoPago = document.getElementById("pago")
    if (campos.nombre && campos.telefono && campos.mail && metodoPago.checked) {
        form.reset()
        redirigir()
        document.querySelectorAll(".grupoCorrecto").forEach((icono)=>{
            icono.classList.remove("grupoCorrecto")
        })
        enviarDatos()
    } else {
        document.getElementById("mensajeForm").classList.add("mensajeFormActivo")
    }
    
})

function triste(){
    Swal.fire({
        showConfirmButton: false,
        title: "Bueno, vuelve pronto...",
        timer: 3000,
        imageUrl: "https://i.pinimg.com/564x/01/a8/38/01a838eddd5a4b41f3d2a488d51b945d.jpg",
        timerProgressBar: true,
        imageHeight: "250px",
        background: "#292929",
        color: "#ffffff",
    })
}

function cancelado() {
    setTimeout(() => {
        window.location.href = '../index.html';
        localStorage.clear()
    }, 3000);
}

cancelarCompra.addEventListener("click", ()=>{
    triste()
    cancelado()
})