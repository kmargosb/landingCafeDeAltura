const cafeContent = document.querySelector('.cafe-content');
const cafeApi = "https://cafe-de-altura.vercel.app/api/products"
const cantidadCarrito = document.querySelector(".bag > span");
const getData = async (url) => {
    try {
        const result = await fetch(url);
        const data = await result.json();
        return data;
    } catch (error) {
        console.error("Error al obtener datos:", error);
        throw error;
    }
};
const datos = await getData(cafeApi)
const arrayCafes = datos.products.sort((a, b) => a.available && !b.available ? -1 : !a.available && b.available ? 1 : a.price - b.price)

const drawCardCafe = (array) => {
    // cafeContent.innerHTML = ""
    array.splice(0,4).forEach((product, i) => {
        cafeContent.innerHTML +=
            `
                <div class="product-card card-hover">
                    <div class="img-cafe">
                        <img src=${product.img_url} alt=${product.brand}>
                    </div>
                <div class="product-price">
                    <h3>${product.brand}</h3>
                    <p>${product.price},00 €</p>
                </div>
                <button class="añadir">Añadir</button>
                </div>
            `
    })
}
drawCardCafe(arrayCafes)

const actualizarCarrito = () => {
    const carrito = JSON.parse(localStorage.getItem("cafes"));
    // console.log(carrito)
    if (carrito) {
        const cuentaTotal = carrito.reduce((acc, current) => acc + current.cantidad, 0)

        if (cuentaTotal) {
            cantidadCarrito.innerText = cuentaTotal;
            cantidadCarrito.style.opacity = 1;
        }

    } else {
        return ''
    }


};

const agregarAlCarrito = (producto) => {
    const carrito = JSON.parse(localStorage.getItem("cafes"));
    if (!carrito) {
        const nuevoProducto = nuevoProductoCarrito(producto);
        localStorage.setItem('cafes', JSON.stringify([nuevoProducto]));
    } else {
        const indiceProducto = carrito.findIndex(cafe => cafe._id === producto._id);
        // console.log(indiceProducto);
        const nuevoCarrito = carrito;
        if (indiceProducto === -1) {
            nuevoCarrito.push(nuevoProductoCarrito(producto))
        } else {
            nuevoCarrito[indiceProducto].cantidad++;
        }
        localStorage.setItem('cafes', JSON.stringify(nuevoCarrito));
    }
    actualizarCarrito()
};

const anadirBtn = document.querySelectorAll('.añadir');
arrayCafes.forEach((cafe, i) => {
    anadirBtn[i].addEventListener('click', () => {
        agregarAlCarrito(cafe)
    })
})

const nuevoProductoCarrito = (producto) => {
    const nuevo = producto;
    nuevo.cantidad = 1;
    return nuevo
}

// MODAL
const btnModal = document.querySelectorAll('.btnModal')
const pModal = document.querySelectorAll('.pModal')
btnModal.forEach((boton, i) => {
    boton.addEventListener('click', () => {
        pModal[i].classList.toggle('hidden')
        btnModal[i].classList.toggle('flechaInvert')
    })
});

actualizarCarrito()