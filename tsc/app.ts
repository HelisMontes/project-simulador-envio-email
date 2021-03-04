const dataForm:any = {
    email: document.querySelector('#email'),
    asunto: document.querySelector('#asunto'),
    mensaje: document.querySelector('#mensaje'),
    btnEnviar: document.querySelector('#enviar'),
    formularioEnviar: document.querySelector('#enviar-mail'),
    resetBtn: document.querySelector('#resetBtn'),
}; Object.freeze(dataForm);

let target:any;

function eventListeners() {
    // Inicio de la aplicación y deshabilitar submit
    document.addEventListener('DOMContentLoaded', inicioApp);
};

const inicioApp = () => {
    dataForm.email.addEventListener("keyup", validarCampoEmail);
    dataForm.asunto.addEventListener("keyup", validarCampoAsunto);
    dataForm.mensaje.addEventListener("keyup", validarCampoMensaje);
    dataForm.btnEnviar.addEventListener("click", enviarEmail);
    dataForm.resetBtn.addEventListener("click", resetFormulario);
};

const validarCampoEmail = ():boolean => {
    target = dataForm.email;
    const validarEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const value:string = target.value
    console.log(value)
    if(value.trim().length < 1){
        showErrors(`El campo ${target.id} esta vacio`);
    }else if(!validarEmail.test(value.toLowerCase())){
        showErrors(`El e-mail es invalido`);
    }else{
        style(true);
        return true;
    };
};

const validarCampoAsunto = ():boolean => {
    target = dataForm.asunto;
    const value:string = target.value
    if (!(value.trim().length >= 1 && value.trim().length <= 15)) {
        if (value.trim().length < 1) {
            showErrors(`El campo ${target.id} esta vacio`);
        };
        if (value.trim().length > 15) {
            showErrors(`El campo ${target.id} no debe tener mas de 15 caracteres`);
        };
    }else{
        style(true);
        return true;
    };
}

const validarCampoMensaje = ():boolean => {
    target = dataForm.mensaje;
    const value:string = target.value
    if (!(value.trim().length >= 1 && value.trim().length <= 50)){
        if (value.trim().length < 1) {
            showErrors(`El campo ${target.id} esta vacio`);
        };
        if (value.trim().length > 50) {
            showErrors(`El campo ${target.id} no debe tener mas de 50 caracteres`);
        };
    }else{
        style(true);
        return true;
    };
}

const showErrors = (message:string):void => {
    removeMessage();
    const errorHTML:any = document.createElement('p');
    errorHTML.textContent = message;
    errorHTML.classList.add('border', 'border-red-500', 'background-color-100', 'text-red-500', 'p-3', 'error');
    dataForm.formularioEnviar.appendChild(errorHTML)
    style(false)
};

const style = (isError:boolean):void => {
    if(!isError){
        target.classList.remove('border-green-500');
        target.classList.add('border', 'border-red-500');
        dataForm.btnEnviar.classList.add('cursor-not-allowed', 'opacity-50')
    }else{
        target.classList.remove('border-red-500');
        target.classList.add('border', 'border-green-500');
        dataForm.btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50');
        removeMessage();
    };
};

const removeMessage = ():void =>{
    const limpiarError = document.querySelector('p.error');
    if (limpiarError) {
        limpiarError.remove();
    };
};

const enviarEmail = (e):void => {
    e.preventDefault();
    if (validarCampoEmail() && validarCampoAsunto() && validarCampoMensaje()) {
        // Spinner al presionar Enviar
        const spinner:any = document.querySelector('#spinner');
        spinner.style.display = 'flex';

        setTimeout( () => {
            spinner.style.display = 'none';
            // Gif que envia email
            const parrafo = document.createElement('p');
            parrafo.textContent = 'Mensaje Enviado Correctamente';
            parrafo.classList.add('text-center', 'my-10', 'p-2', 'bg-green-300', 'text-white', 'font-bold', 'uppercase');
            dataForm.formularioEnviar.insertBefore(parrafo, spinner)
            setTimeout(() =>  {
                parrafo.remove(); //Eliminar el mensaje de enviado
                resetFormulario();
            }, 5000);
        }, 3000);
    };
};

const resetFormulario = () => {
    dataForm.formularioEnviar.reset();
    inicioApp();
    //Limpiar errores
    removeMessage();
    //Quitar el estilo del los campos

    const removeClass = [dataForm.email, dataForm.asunto, dataForm.mensaje];
    removeClass.map( campos =>{
        campos.classList.remove('border-red-500');
        campos.classList.remove('border-green-500');
    });
};

eventListeners();