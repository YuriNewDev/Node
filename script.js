const form = document.getElementById("form");
const inputUser = document.getElementById("user");
const inputEmail = document.getElementById("email");
const inputPassword = document.getElementById("password");
const inputPasswordConfirmation = document.getElementById("passwordConfirmation");
const userRegex = /^[A-Za-z0-9]{3,15}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
const textErro = document.querySelector("#erro")

form.addEventListener("submit",(event) => {
    event.preventDefault();

    // VALIDAR USUÁRIO
    function validarUser() {
        const textErro = inputUser.nextElementSibling;
        const user = inputUser.value;
        if (!userRegex.test(user)) {
            textErro.innerText = 'Digite um usuário entre 3 e 15 caracteres, usando apenas letras e números';
            textErro.style.color = "red";
            return false;
        }
        textErro.innerText = "";  
        return true;
    }

    // VALIDAR EMAIL
    function validarEmail() {
        const textErro = inputEmail.nextElementSibling;
        const email = inputEmail.value;
        if (!emailRegex.test(email)) {
            textErro.innerText = 'Digite um E-MAIL válido';
            textErro.style.color = "red";
            return false;
        }
        textErro.innerText = "";
                    return true;
    
    }



// QUANTIDADE DE CARACTERES
function ValidarNumero() {  

    const textErro = inputPassword.nextElementSibling;
    const password = inputPassword.value;
    if (password.length < 1){
        textErro.innerText = 'A senha deve ter pelo menos 8 caracteres, incluindo letras e números';
        textErro.style.color = "red";
        return true;
    }
    textErro.innerText = "";
    return false;
}




    // VALIDAR SENHA
    function validarPassword() {
        const textErro = inputPassword.nextElementSibling;
        const password = inputPassword.value;
        if (!passwordRegex.test(password)) {
            textErro.innerText = 'A senha deve ter pelo menos 8 caracteres, incluindo letras e números';
            textErro.style.color = "red";
            return false;
        }
        textErro.innerText = "";
        return true;
    }

    // VALIDAR A CONFIRMAÇÃO DE SENHA
    function confirmarPassword() {
        const textErro = inputPasswordConfirmation.nextElementSibling;
        const password = inputPassword.value;
        const confirmPassword = inputPasswordConfirmation.value;
        if (password !== confirmPassword) {
            textErro.innerText = 'As senhas não correspondem';
            textErro.style.color = "red";
            return false;
        }
        textErro.innerText = "";
        return true;
    }


    // VALIDAÇÃO DE TODOS OS CAMPOS
    if (validarUser() && validarEmail() && validarPassword() && confirmarPassword()) {
        alert('VALIDADO');
    }
});
