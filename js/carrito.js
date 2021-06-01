const table = document.querySelector('.table');
const tbody = document.querySelector('.body');
const input = document.querySelectorAll('.input');

const pagar_total = document.querySelector('#pagar_total');
const total_precio = document.querySelector('#total_precio');
const table_contenedor = document.querySelector('.table_contenedor');

let pedidosArr = JSON.parse(sessionStorage.getItem('pedido')) || [];

//======================================
// 	Eventos
//======================================

document.addEventListener('DOMContentLoaded', () => {
    for (elemnt of input) {
        elemnt.value = 1;
    }

    mostrarProductos(pedidosArr);

})

pagar_total.addEventListener('click', () => {

    const usuario = JSON.parse(sessionStorage.getItem('usuario')) || [];

    if(usuario.length !== 0){
        const precio_fin = total_precio.textContent;
        alerta_('success', `<p class="normal">Su compra se ha realizado, total a pagar: $ <b>${precio_fin} MX</b></p>`, false, 'animate__animated animate__fadeInDown', 'animate__animated animate__fadeOutUp');
        setTimeout(() => {
            limpiartabla();
            sessionStorage.removeItem('pedido')
        }, 500);
    }else{
        alerta_('warning', '<p class="normal">Para relizar su compra <b>Primero inicie sesión</b></p>', true);
    }
});

table.addEventListener('click', (e) => {
    const btn = e.target.classList;


    if (btn.contains('mas')) {
        let contador = Number(e.target.parentElement.children[1].value);
        contador += 1;
        e.target.parentElement.children[1].value = contador
        let valorCampo = e.target.parentElement.children[1].value;
        modificarSubtotal(valorCampo, e.target)
    }

    if (btn.contains('men')) {
        let contador2 = Number(e.target.parentElement.children[1].value);
        if (contador2 > 1) {
            contador2 -= 1;
            e.target.parentElement.children[1].value = contador2
            let valorCampo = e.target.parentElement.children[1].value;
            modificarSubtotal(valorCampo, e.target)
        }
    }

    if (btn.contains('eliminar') || btn.contains('icono_eliminar')) {
        if (btn.contains('eliminar')) {

            let prod_name = e.target.parentElement.parentElement.children[0].textContent;
            alerta_pregunta(e.target.parentElement.parentElement, prod_name);

        } else {
            let prod_name = e.target.parentElement.parentElement.parentElement.children[0].textContent;
            alerta_pregunta(e.target.parentElement.parentElement.parentElement, prod_name);
        }
    }

});

//======================================
// 	Funciones
//======================================

const limpiartabla = () => {
    table_contenedor.innerHTML = `
    <div class="mensaje">
        <p>Carrito sin productos</p>
        <img src="../img/taco.png" alt="">
        <a href="../pages/panel.html">volver al menú</a>
    </div>
    `;
};

const alerta_ = (icon, title, redirigir = false, entrada = '', salida ='') => {
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

const alerta_pregunta = (elemento, prod) => {

    Swal.fire({
        title: '¿Estas seguro?',
        html: `<p>¿Estas seguro de querer eliminar "<b>${prod}</b>" del carrito?</p>`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            const pedido_storage = JSON.parse(sessionStorage.getItem('pedido')) || []
            const id = elemento.id

            pedidos_arr = pedido_storage.filter(pedido => pedido.id !== id);

            sessionStorage.setItem('pedido', JSON.stringify(pedidos_arr))
            elemento.remove();

            mostrarProductos(pedidos_arr)
        }
    })
};

const mostrarProductos = (data = []) => {
    let html = "";
    let precio_total = 0;
    if (data.length === 0) {
        limpiartabla();
    } else {

        data.forEach(({ id, platillo, precio, img }) => {
            precio_total += Number(precio)
            html += `
            <tr id="${id}">
                <td class="nombre"> ${platillo} </td>
                <td class="nombre"> <img src="${img}" width="90" /> </td>
                
                <td>
                    <div class="grupo_input">
                        <button class="mas">+</i></button>
                        <input type="tel" class="input" id="" disabled value="1">
                        <button class="men">-</i></button>
                    </div>
                </td>
                <td class="bold" data-precio="${precio}" >$ ${precio}</td>
                <td class="bold subtotal" data-subtotal="${precio}" > $ ${precio} </td>
                <td class="td_btn">
                    <button class="eliminar"><i class="icono_eliminar far fa-trash-alt"></i></button>
                </td>
            </tr>
            `
        });
    }
    total_precio.textContent = precio_total
    tbody.innerHTML = html;
};

const modificarSubtotal = (valor, campo) => {

    const precio_uni = Number(campo.parentElement.parentElement.parentElement.children[3].dataset.precio);

    campo.parentElement.parentElement.parentElement.children[4].textContent = ` $ ${valor * precio_uni}`

    campo.parentElement.parentElement.parentElement.children[4].dataset.subtotal = valor * precio_uni;

    const subtotales = document.querySelectorAll('.subtotal');

    let total = 0

    for (subtotal of subtotales) {
        total += Number(subtotal.dataset.subtotal);
    }

    total_precio.textContent = total;

};