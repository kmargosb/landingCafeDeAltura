const cestaContent = document.querySelector('.cesta-content');
const cantidadCarrito = document.querySelector(".bag > span");
const cantidadCesta = document.querySelector(".carrito-content > h2 > span");
const totalContent = document.querySelector('.total-content');
const cartProducts = document.querySelector('.cart-products');
const envioGratis = document.getElementById("envioGratis");
const envioUrgente = document.getElementById("envioUrgente");
const labelEnvio = document.querySelectorAll('label')
const carrito = JSON.parse(localStorage.getItem("cafes"));

let envio = 9
const envioCambio = () => {
    envioGratis.checked ? envio = "GRATIS" : envioUrgente.checked ? envio = 9 : ''

}

const actualizarCarrito = (array) => {
    if (array) {
        const cuentaTotal = array.reduce((acc, current) => acc + current.cantidad, 0)
        console.log(cuentaTotal)
        if (cuentaTotal > 0) {
            cantidadCarrito.innerText = cuentaTotal;
            cantidadCesta.innerText = cuentaTotal;
            cantidadCarrito.style.opacity = 1;
        } else {
            cestaContent.innerHTML = `<h2 class="carritoVacio"> <b>El carrito esta Vacio</b> </h2>`
            cantidadCarrito.innerText = cuentaTotal;
            cantidadCesta.innerText = cuentaTotal;
            cantidadCarrito.style.opacity = 1;
        }
    } else {
        cestaContent.innerHTML = `<h2 class="carritoVacio"> <b>El carrito esta Vacio</b> </h2>`
    }
};

const drawCarrito = (array) => {
    cartProducts.innerHTML = ''
    if (array) {
        array.forEach(producto => {
            cartProducts.innerHTML +=
                `
            <div class="producto">
                <div class="producto-cantidad">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" class="menos" viewBox="0 0 24 24" fill="none">
                        <path d="M18 12.8301H6" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    <span class="counter">${producto.cantidad}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" class="mas" viewBox="0 0 24 24" fill="none">
                        <path d="M12 6.49023V12.4902M12 12.4902V18.4902M12 12.4902H18M12 12.4902H6" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                </div>
                <img src=${producto.img_url} alt="${producto.brand}" class="imgCartCafe">
                <div class="description">
                    <p>${producto.brand}</p>
                    <p>Paquete de café, 250 gr</p>
                </div>
                <h3>${producto.price},00€</h3>
            </div>
            <div class="divisor"></div>                
        `
        });
        const menos = document.querySelectorAll('.menos')
        const mas = document.querySelectorAll('.mas')

        menos.forEach((item, i) => {
            item.addEventListener('click', () => {
                if (carrito[i].cantidad >= 2) {
                    carrito[i].cantidad--;
                    localStorage.setItem('cafes', JSON.stringify(carrito));
                    actualizarCarrito(carrito)
                    drawCarrito(carrito)
                    drawTotalCarrito(carrito)
                } else if (carrito[i].cantidad === 1) {
                    borrar(i)
                    localStorage.setItem('cafes', JSON.stringify(carrito));
                    actualizarCarrito(carrito)
                    drawCarrito(carrito)
                    drawTotalCarrito(carrito)
                }
            })
        })
        mas.forEach((item, i) => {
            item.addEventListener('click', () => {
                carrito[i].cantidad++;
                localStorage.setItem('cafes', JSON.stringify(carrito));
                actualizarCarrito(carrito)
                drawCarrito(carrito)
                drawTotalCarrito(carrito)
            })
        })
    }
};

const drawTotalCarrito = (array) => {
    totalContent.innerHTML = ''
    let subtotal = 0;
    let total = 0;
    envioCambio()

    if (array) {
        array.forEach((producto, i) => {
            subtotal += producto.cantidad * producto.price
            if (envio == 9) {
                total = subtotal + envio
                totalContent.innerHTML =
                    `
            <h3>Total del carrito</h3>
                        <div class="divisor"></div>
                        <div class="subtotal">
                            <p>SUBTOTAL</p>
                            <b>${subtotal},00€</b>
                        </div>
                        <div class="enviogratis">
                            <p>ENVÍO</p>
                            <b>${envio},00€</b>
                        </div>
                        <div class="divisor"></div>
                        <div class="totaltotal">
                            <b>TOTAL</b>
                            <div class="total90">
                                <b>${total},00€</b>
                                <p>Incluye 3,74€ de IVA</p>
                            </div>
                        </div>
                        <div>
                            <button class="btn-enviar">Ir a chekout</button>
                            <button class="newBtn">Seguir comprando</button>
                        </div>
            `
            } else {
                total = subtotal
                totalContent.innerHTML =
                    `
            <h3>Total del carrito</h3>
                        <div class="divisor"></div>
                        <div class="subtotal">
                            <p>SUBTOTAL</p>
                            <b>${subtotal},00€</b>
                        </div>
                        <div class="enviogratis">
                            <p>ENVÍO</p>
                            <b>${envio}</b>
                        </div>
                        <div class="divisor"></div>
                        <div class="totaltotal">
                            <b>TOTAL</b>
                            <div class="total90">
                                <b>${total},00€</b>
                                <p>Incluye 3,74€ de IVA</p>
                            </div>
                        </div>
                        <div>
                            <button class="btn-enviar">Ir a chekout</button>
                            <button class="newBtn">Seguir comprando</button>
                        </div>
            `
            }

        })
    }
};

const borrar = (i) => {
    carrito.splice(i, 1)
};
envioGratis.addEventListener("change", function () {
    drawTotalCarrito(carrito)
});
envioUrgente.addEventListener("change", function () {
    drawTotalCarrito(carrito)
});


drawCarrito(carrito);
drawTotalCarrito(carrito);
actualizarCarrito(carrito);