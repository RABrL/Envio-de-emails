document.addEventListener('DOMContentLoaded', function(){

    const email = {
        email: '',
        asunto: '',
        mensaje: ''
    }

    //Seleccionar los elementos de la interfaz
    const $ = selector => document.querySelector(selector)
    const inputEmail = $('#email');
    const inputAsunto = $('#asunto');
    const inputMensaje = $('#mensaje')
    const inputCC = $('#cc')
    const formulario = $('#formulario')
    const btnEnviar = $('#botones button[type="submit"]')
    const btnReiniciar= $('#botones button[type="reset"]')
    const spinner = $('#spinner')
    const alerta = $('#alerta-exito')

    inputEmail.addEventListener('input', validar);
    inputAsunto.addEventListener('input', validar);
    inputMensaje.addEventListener('input', validar);
    inputCC.addEventListener('input',(e) => {
        if(!e.target.value){
            delete email.cc
            limpiarAlerta(e.target.parentElement)
            comprobarEmail();
            return;
        }

        if(!validarEmail(e.target.value)){
            mostrarAlerta(e.target.parentElement, 'El email no es valido');
            email.cc = '';
            comprobarEmail();
            return;
        }
        
        limpiarAlerta(e.target.parentElement)
        agregarValoresEmail(e)
        comprobarEmail();
       
    });
    btnReiniciar.addEventListener('click',resetForm);
    formulario.addEventListener('submit', enviarEmail);

    function validar(e){
        if(!e.target.value){
            mostrarAlerta(e.target.parentElement,`El campo ${e.target.id} es obligatorio`)
            agregarValoresEmail(e)
            comprobarEmail();
            return;
        }
        
        if(e.target.id === 'email' && !validarEmail(e.target.value)){
            mostrarAlerta(e.target.parentElement, 'El email no es valido')
            email.email = ''
            comprobarEmail();
            return;
        }

        limpiarAlerta(e.target.parentElement);
        
        //Asignar los valores al objeto
        agregarValoresEmail(e)

        //Comprobar el objeto de email
        comprobarEmail();
    }

    function mostrarAlerta(referencia,mensaje){
        
        limpiarAlerta(referencia)

        //Generar alerta HTML
        const error = document.createElement('P');
        error.textContent = mensaje
        error.classList.add('bg-red-600','text-white','p-2', 'text-center')

        //Creo la referencia del padre al cual voy a agregar el parrafo de error
        
        referencia.appendChild(error)
    }

    function limpiarAlerta(referencia){
        //Comprueba si ya existe el parrafo de error
        const alerta = referencia.querySelector('.bg-red-600')
        if(alerta) alerta.remove()
    }

    function validarEmail(email){
        const regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g

        const resultado = regex.test(email)

        return resultado
    }

    function agregarValoresEmail(e){
        
        email[e.target.id] = e.target.value.trim().toLowerCase();//.trim() sirve para quitar los espacios seguidos de un string
    }

    function comprobarEmail(){
        if(!Object.values(email).includes('')){
            btnEnviar.classList.remove('opacity-50')
            btnEnviar.disabled = false
            
        }else{
            btnEnviar.classList.add('opacity-50')
            btnEnviar.disabled = true
        }
            
    }

    //Reiniciamos el formulario y el objeto email
    function resetForm(e){
        formulario.reset();
        Object.keys(email).forEach(x =>{
            email[x] = ''
        })
        comprobarEmail()
    }

    function enviarEmail(e){
        e.preventDefault();

        spinner.classList.remove('hidden')
        spinner.classList.add('flex')

        setTimeout(()=>{
            spinner.classList.add('hidden')
            spinner.classList.remove('flex')

            resetForm()

            //Crear una alerta
            const alertaExito = document.createElement('P')
            alertaExito.classList.add('bg-green-500','text-white','p-2','rounded-lg','mt-10','font-bold','text-sm','uppercase','text-center');

            alertaExito.textContent = 'Mensaje enviado con exito';

            alerta.appendChild(alertaExito);

            setTimeout(() =>{
                alertaExito.remove();
            },3000);

        },3500);
    }
})