//Variables Finalizar
const names = document.getElementById("name")
const tel = document.getElementById("tel")
const mail = document.getElementById("mail")
const form = document.getElementById("form")
const parrafo = document.getElementById("warning")

form.addEventListener("submit", (e)=>{
    e.preventDefault()
    let warnings = ""
    let entrar = false
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/
    if(names.value.length <6){
        warnings += `El nombre no es valido <br>`
        entrar = true
    }
    if(!regexEmail.test(mail.value)){
        warnings += `El email no es valido <br>`
        entrar = true
    }
    if(tel.value.length < 8){
        warnings += `La contraseña no es valida <br>`
        entrar = true
    }

    if(entrar){
        parrafo.innerHTML = warnings
    }else{
        parrafo.innerHTML = "Enviado"
    }
})