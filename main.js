//Variables
const URL = "./productos.json"
const productos = document.getElementById("productos")
const carritoDOM = document.getElementById("carrito")
const comprar = document.getElementById("comprar")
const cancelar = document.getElementById("cancelar")
const total = document.getElementById("totalCar")
const cuentaCar = document.getElementById("cuentaCar")
const imgCar = document.getElementById("imgCar")
const closeButton = document.getElementById("closeButton")
const carritoContainer = document.getElementById("carritoContainer")
const input = document.getElementById("inputSearch")
let carrito = JSON.parse(localStorage.getItem("carrito")) || []


//Carrito
function actualizadora (){
    localStorage.setItem("carrito", JSON.stringify(carrito))
    carritoDOM.innerHTML = ""
    carrito.forEach(el => {
        carritoDOM.innerHTML += `
            <div class="contenedorCarrito"> 
                <h4>${el.producto}</h4>
                <p>${el.precio}</p>
                <button class="sumar">+</button>
                <p>${el.cantidad}</p>
                <button class="restar">-</button>
            </div>
        `
    })
    numeroCar()
    totalNum()
}

function redirigir() {
    window.location.href = './finalizar.html';
}

function nadaEnCarrito(){
    Swal.fire({
        showConfirmButton: false,
        title: "Debes tener algo en el carrito para eso.",
        timer: 3000,
        imageUrl: "https://i.pinimg.com/564x/b1/29/c3/b129c3c44135603f0ef80f8a99dc78e1.jpg",
        timerProgressBar: true,
        imageHeight: "250px",
        background: "#292929",
        color: "#ffffff",
    })
}


comprar.addEventListener("click", (e)=>{
    const cuenta = carrito.reduce((acc, el) => {
        return acc + el.cantidad 
    },0)
    if ( cuenta === 0) {
        nadaEnCarrito();
    } else {
        redirigir()
    }
})

function triste(){
    Swal.fire({
        showConfirmButton: false,
        title: "Bueno, vuelve pronto...",
        timer: 3000,
        imageUrl: "https://i.pinimg.com/564x/a4/33/07/a433074ce20d1323398c51f555f4cdb8.jpg",
        timerProgressBar: true,
        imageHeight: "250px",
        background: "#292929",
        color: "#ffffff",
    })
}

cancelar.addEventListener("click", (e)=>{
    const cuenta = carrito.reduce((acc, el) => {
        return acc + el.cantidad 
    },0)
    if (cuenta === 0) {
        nadaEnCarrito()
    } else {
        carrito = []
        localStorage.setItem("carrito", JSON.stringify(carrito))
        carritoContainer.style.right = "-100%";
        actualizadora()
        triste()
    }
    
    
})

const numeroCar = ()=>{
    const cuenta = carrito.reduce((acc, el) => {
        return acc + el.cantidad 
    },0)
    cuentaCar.innerText = cuenta
}

const totalNum = ()=>{
    const totalNumero = carrito.reduce((acc, el) => {
        return acc + el.precio * el.cantidad
    },0)
    total.innerText = "Precio total: $" + totalNumero
}

imgCar.addEventListener("click", (e)=>{
    carritoContainer.style.right = 0;
    carritoContainer.style.top = "30%";
    carritoContainer.style.transition = "right 2s ease"
})

closeButton.addEventListener("click", ()=>{
    carritoContainer.style.right = "-100%";
    carritoContainer.style.transition = "right 2s ease"
})

//Cards
function alert(){
    Swal.fire({
        showConfirmButton: false,
        toast: true,
        title: "Agregaste un producto al carrito!",
        timer: 2000,
        position: "bottom-end",
        imageUrl: "https://i.pinimg.com/564x/5c/0c/57/5c0c575e3f7f3bad4ad6449c22078fd9.jpg",
        width: "250px",
        imageHeight: "170px",
        background: "#292929",
        color: "#ffffff",
    })
}

const agregadoraEventos = ()=>{
    const agregarBotones = document.getElementsByClassName("botonCompra")
    const arrayBotones = Array.from(agregarBotones)
    arrayBotones.forEach ((el)=>{
        el.addEventListener("click", (e)=>{
            const productoNombre = e.target.parentElement.children[1].innerText
            const precioRaw =  e.target.parentElement.children[2].innerText
            const precioProducto = parseFloat(precioRaw.replace("$", "").trim())
            const productoCarrito = carrito.find(el => el.producto === productoNombre)
            if (!productoCarrito) {
                carrito.push({
                producto: e.target.parentElement.children[1].innerText,
                precio: precioProducto,
                cantidad: 1
                })
            }else{
                productoCarrito.cantidad++
            }
            actualizadora()
            alert()
        })
    })
}

const creadorCards = (image, nombre, precio) =>{
    productos.innerHTML += `
        <div class="contenedorCard"> 
            <img src="${image}" alt="">
            <h3>${nombre}</h3>
            <p>$${precio}</p>
            <button class="botonCompra">Comprar</button>
        </div>
    `
    agregadoraEventos()
}

const llamadoraDeProductos = async ()=>{
    let resp = await fetch(URL)
    let data = await resp.json()

    data.forEach(el => {
        creadorCards(el.image, el.nombre, el.precio)
    });

    input.addEventListener("input", (e)=>{
        const arrayInput = data.filter(el => {
            return el.nombre.toLowerCase().includes(e.target.value.toLowerCase())
        })
        creadorCards(arrayInput)
    })
}

llamadoraDeProductos()

document.addEventListener("DOMContentLoaded", (e)=>{
    actualizadora()
})

const sincronizarStorage = ()=>{
    localStorage.setItem("carrito", JSON.stringify(carrito))
}