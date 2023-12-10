const cafeContent = document.querySelector('.cafe-content');
const cantidadCarrito = document.querySelector(".bag > span");
const cafeApi = "https://cafe-de-altura.vercel.app/api/products"

// Fetch
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
//ordenar el array de productos por price y available
const arrayCafes = datos.products.sort((a, b) => {
    if (a.available && !b.available) {
        return -1;
    } else if (!a.available && b.available) {
        return 1;
    } else {
        return a.price - b.price;
    }
})

// Pintar productos
const drawCardCafe = (array) => {
    // cafeContent.innerHTML = ""
    array.forEach((product, i) => {
        const { available, brand, img_url, price, id } = product
        if (available) {
            cafeContent.innerHTML +=
                `
                <div class="product-card card-hover">
                    <div class="img-cafe">
                        <img src=${img_url} alt=${brand}>
                    </div>
                <div class="product-price">
                    <h3>${brand}</h3>
                    <p>${price},00 €</p>
                </div>
                <button class="añadir">Añadir</button>
                </div>
            `
        } else{
            cafeContent.innerHTML +=
                `
                <div class="product-card agotado">
                    <div class="img-cafe">
                        <img src=${img_url} alt=${brand}>
                    </div>
                <div class="product-price">
                    <h3>${brand}</h3>
                    <p>${price},00 €</p>
                </div>
                <button class="añadir">Añadir</button>
                </div>
            `
        }
    })
}
drawCardCafe(arrayCafes)

// Funcion a botones de anadir
const anadirBtn = document.querySelectorAll('.añadir');
arrayCafes.forEach((cafe, i) => {
    anadirBtn[i].addEventListener('click', () => {
        if (cafe.available){
            agregarAlCarrito(cafe)
        }
    })
})

//cantidad en carrito
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

// Funcion agregar producto
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

// Parte de la funcion agregar productos
const nuevoProductoCarrito = (producto) => {
    const nuevo = producto;
    nuevo.cantidad = 1;
    return nuevo
}

actualizarCarrito()
