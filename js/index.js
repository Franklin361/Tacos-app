const user = document.querySelector('#user');
const pass = document.querySelector('#pass');
const login_google = document.querySelector('#login_google');
const login_normal = document.querySelector('#login_normal');
const link = document.querySelector('#link');
const titulo = document.querySelector('#titulo');
const contenedor_login = document.querySelector('.login_contenedor');
const contenedor_registro = document.querySelector('.registro_contenedor');

//======================================
// 	EVENTOS
//======================================

contenedor_registro.style.display = "none";

login_normal.addEventListener('click', (e) => {
    e.preventDefault();

    if (errorInputs() === 0) {

        const data = {
            user: user.value,
            pass: pass.value
        }
        document.querySelector('.formulario').reset();
        alerta('success', 'Inicio de sesión correcto', 1000);

        sessionStorage.setItem('usuario',JSON.stringify(data));

        setTimeout(() => {
            window.location = "../pages/panel.html"
        }, 1000);
    }
});


login_google.addEventListener('click', (e) => {

    e.preventDefault();
    alerta('success', 'Inicio de sesión correcto');
    removeClassInput('pass')
    removeClassInput('user')
});


link.addEventListener('click', () => {

    contenedor_login.classList.remove('animate__fadeInDownBig');
    contenedor_login.classList.add('animate__fadeOutDownBig');
    contenedor_registro.classList.remove("animate__fadeOutDownBig")

    setTimeout(() => {
        contenedor_login.style.display = "none";
        contenedor_registro.style.display = "block"    
        contenedor_registro.classList.add("animate__fadeInDownBig")
    }, 1000);
    
    titulo.textContent = "Registrate ahora";
});


pass.addEventListener('focus', () => {
    removeClassInput('pass')
});

user.addEventListener('focus', () => {
    removeClassInput('user')
});

//======================================
// 	 FUNCIONES
//======================================

const alerta = (icon, title, timer = 3000) => {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    Toast.fire({
        icon,
        title
    })
};

const errorInputs = () => {

    const pass_txt = document.querySelector('.pass');
    const user_txt = document.querySelector('.user');

    let errores = 0;

    if (user.value === '') {
        user_txt.children[1].classList.add("icono_error")
        user_txt.children[0].classList.add("error_input_input")
        user_txt.classList.add("erorr_input");
        errores += 1;
    }

    if (pass.value === '') {
        pass_txt.children[1].classList.add("icono_error")
        pass_txt.children[0].classList.add("error_input_input")
        pass_txt.classList.add("erorr_input");
        errores += 1;
    }


    (errores !== 0) && alerta('error', 'Los campos son obligatorios');

    return errores;
};

const removeClassInput = (tipo) => {
    const txt = document.querySelector(`.${tipo}`);
    txt.children[1].classList.remove("icono_error")
    txt.children[0].classList.remove("error_input_input")
    txt.classList.remove("erorr_input");
};
