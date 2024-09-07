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

/*const agregarEventosCarrito = () => {
    const botonesAgregar = document.getElementsByClassName("botonComprar")
    const botonesAgregarArray = Array.from(botonesAgregar)
    botonesAgregarArray.forEach(el=>{
        el.addEventListener("click", (e)=>{
            let id;
            const productoEnElCarrito = carrito.find((el, idArr) => {
                id = idArr
                return el.producto == e.target.parentElement.children[1].innerText
            })
            if(e.target.innerText === "+"){
                productoEnElCarrito.cantidad++
            }else{
                if(productoEnElCarrito.cantidad == 1){
                    carrito.splice(id, 1)
                }else{
                    productoEnElCarrito.cantidad--
                }
            }
            actualizadora()
        })
    })
}*/



function actualizadora (){
    localStorage.setItem("carrito", JSON.stringify(carrito))
    carritoDOM.innerHTML = ""
    carrito.forEach(el => {
        carritoDOM.innerHTML += `
            <div class="contenedorCarrito"> 
                <h4>${el.producto}</h4>
                <p>${el.precio}</p>
                <p>${el.cantidad  || 1}</p>
            </div>
        `
    })
    numeroCar()
    totalNum()
}

comprar.addEventListener("click", (e)=>{
    carrito = []
    actualizadora()
})

cancelar.addEventListener("click", (e)=>{
    carrito = []
    localStorage.setItem("carrito", JSON.stringify(carrito))
    carritoContainer.style.right = "-100%";
    actualizadora()
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
const agregadoraEventos = ()=>{
    const agregarBotones = document.getElementsByClassName("botonCompra")
    const arrayBotones = Array.from(agregarBotones)
    arrayBotones.forEach ((el)=>{
        el.addEventListener("click", (e)=>{
            const productoCarrito = carrito.find(el => el.producto == e.target.parentElement.children[1].innerText)
            if (!productoCarrito) {
                carrito.push({
                producto: e.target.parentElement.children[1].innerText,
                precio: e.target.parentElement.children[2].innerText,
                cantidad: 1
                })
            }else{
                productoCarrito.cantidad++
            }
            actualizadora()
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