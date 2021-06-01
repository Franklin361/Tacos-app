const menu_main = document.querySelector('.menu_main');
const elementos = document.querySelectorAll('.btn_agregar');
let pedidos_arr = JSON.parse(sessionStorage.getItem('pedido')) || [];

document.addEventListener('DOMContentLoaded', () => {

    const storage = JSON.parse(sessionStorage.getItem('pedido')) || [];

    for (const element of elementos) {
        element.disabled = false
       
        storage.forEach(btn => {
            if (btn.id === element.parentElement.id) {
                element.classList.add('btn_presionado')
                element.textContent = "Quitar del pedido"
            }

        });

    }

});

menu_main.addEventListener('click', (e) => {

    const user = JSON.parse(sessionStorage.getItem('usuario')) || [];
    console.log(user.length)

    if(user.length === 0 && e.target.classList.contains("btn_agregar")){
        alerta_m('warning', '<p class="normal">Para relizar su compra <b>Primero inicie sesión</b></p>', true)
        return;
    }

    if (e.target.classList.contains('btn_agregar') && !e.target.disabled ) {

        const textoBtn = e.target.textContent;

        if (textoBtn !== "Quitar del pedido") {

            const element = window.getComputedStyle(e.target.parentElement.parentElement.children[1]);
            const prop = element.getPropertyValue('background-image');

            e.target.classList.add('btn_presionado')
            e.target.textContent = "Quitar del pedido"

            const pedido = {
                id: e.target.parentElement.id,
                platillo: e.target.parentElement.children[0].textContent,
                precio: e.target.parentElement.children[2].dataset.precio,
                img: prop.substring(5, prop.length - 2),
            }

            pedidos_arr.push(pedido);

            sessionStorage.setItem('pedido', JSON.stringify(pedidos_arr))

        } else {

            const pedido_storage = JSON.parse(sessionStorage.getItem('pedido')) || []
            const id = e.target.parentElement.id

            pedidos_arr = pedido_storage.filter(pedido => pedido.id !== id);
            sessionStorage.setItem('pedido', JSON.stringify(pedidos_arr))

            e.target.classList.remove('btn_presionado')
            e.target.textContent = "Agregar al pedido"
        }

    }

});


const alerta_m = (icon, title, redirigir = false, entrada = '', salida ='') => {
    Swal.fire({
        icon,
        title,
        showClass: {
            popup: entrada
        },
        hideClass: {
            popup: salida
        },
        confirmButtonText: 'Entendido'
    }).then((result) =>{
        if (result.isConfirmed && redirigir){
            window.location="../index.html"
        }
    })
};