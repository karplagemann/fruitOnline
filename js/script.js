let misProductosOferta = document.getElementById("misProductosOferta");
const div = document.querySelector(".detalleCarritoDiv");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const mainCont = document.querySelector(".rowContainer");
let btnSearch = document.getElementById("search-button");
let inputSearch = document.getElementById("inputSearch");

// MOSTRAR PRODUCTOS //
function mostrarProductos() {
  products.forEach((product) => {
    let card = document.createElement("article");
    card.className =
      "mx-auto d-block col-12 col-md-6 col-lg-3 mb-3 mb-lg-0 card m-3 producto";
    misProductosOferta.append(card);

    let img = document.createElement("img");
    img.className =
      "rounded mt-2 d-flex justify-content-center align-content-center img-fluid";
    img.setAttribute("src", product.img);

    let name = document.createElement("h2");
    name.className = "articuloFruta h4 mt-3 border-top pt-3";
    name.innerText = product.name;

    let price = document.createElement("div");
    price.className = "text-primary";
    price.innerHTML = `<span class="fw-bold mb-2 ">$ ${product.price.toLocaleString()} </span>x Kg`;

    let descriptionProduct = document.createElement("p");
    descriptionProduct.innerText = product.description;

    let buyButton = document.createElement("button");
    buyButton.className = "btn btn-primary btn-sm mb-2";
    buyButton.innerHTML = `
            Agregar al Carrito
        `;
    card.append(img, name, price, descriptionProduct, buyButton);

    buyButton.addEventListener("click", function () {
      // cart.push(product);
      // Acá HAY QUE CREAR un objeto Detail
      // Para evitar que se agrege un objeto nuevo, hay que preguntar si el carrito ya tiene un
      // detalle para ese producto, si ya hay un detalle, no se crea el detalle nuevo.
      const cartDetail = {
        quantity: 1,
        product: product,
      };
      cart.push(cartDetail);
      localStorage.setItem("cart", JSON.stringify(cart));
      Swal.fire("Agregaste un item al carrito!", product.name, "success");
      // alert("Agregaste " + product.name + " al carrito")
      div.innerHTML = ``;
      showCart();
    });
  });
}

mostrarProductos();

// MOSTRAR CARRITO //
let cartView = document.getElementById("showProductsCart");
let goToCart = document.getElementById("goToCart");
let carrito = document.getElementById("cartList");
const buttonCart = document.getElementById("mostrarCarrito");

let alertCart = document.createElement("p");
alertCart.setAttribute("class", "alerta");

if (!cart.lenght) {
  alertCart.innerText = `0 items`;
  div.append(alertCart);
}

function showCart() {
  alertCart.remove();

  cart.forEach((cartDetail) => {
    const divCart = document.createElement("li");
    divCart.className = "miCarrito";
    // ES BUENO PONERLE UN ID A TODO LO QUE QUIERAS RECUPERAR DESPUES
    // LOS IDs DEBEN SER ESPECIFICOS PARA CADA PRODUCTO.
    divCart.innerHTML += `
        <img src="${cartDetail.product.img}">
        <button id="btn_del_${
          cartDetail.product.id
        }" class="eliminar btn btn-danger" data-id=${
      cartDetail.product.id
    }><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
        </svg></button>
        <h5 class="col">${cartDetail.product.name}</h5>
        <form id="formulario">
                <input id="input_quant_${
                  cartDetail.product.id
                }" class="inputDeCarga" type="number" placeholder="Cuantos kg?" value=${
      cartDetail.quantity
    } />
        </form>
        <h5 id="text_price_${
          cartDetail.product.id
        }"class="fw-bold mb-2 text-primary">$${
      cartDetail.product.price * cartDetail.quantity
    }</h5>
        `;
    div.appendChild(divCart);

    let eliminarItem = document.getElementById(
      "btn_del_" + cartDetail.product.id
    );
    eliminarItem.onclick = (e) => {
      const productId = e.target.getAttribute(`data-id`);
      cart = cart.filter((element) => element.product.id !== productId);
      divCart.remove();
      div.innerHTML = ``;
      showCart();
    };

    let inputCantidad = document.getElementById(
      "input_quant_" + cartDetail.product.id
    );
    inputCantidad.onchange = (e) => {
      const textPrice = document.getElementById(
        "text_price_" + cartDetail.product.id
      );
      console.log();
      const thisDetail = cart.find(
        (element) => element.product.id === cartDetail.product.id
      );
      console.log(cart);
      thisDetail.quantity = parseInt(e.target.value);
      textPrice.innerHTML = `$${
        thisDetail.product.price * thisDetail.quantity
      }`;
    };
  });

  //PRECIO TOTAL CARRITO//
  const total = cart
    .map((cartDetail) =>
      parseInt(cartDetail.product.price * cartDetail.quantity)
    )
    .reduce(
      (cartTotalPrice, currentItemPrice) => cartTotalPrice + currentItemPrice,
      0
    );
  console.log(total);

  let totalCompra = document.createElement("h4");
  totalCompra.innerHTML = `Total del carrito <span class="text-primary">$ ${total}</span>`;
  div.append(totalCompra);

  //VACIAR CARRITO //
  let deleteCart = document.createElement("button");
  deleteCart.className = "btn btn-danger col-2 float-right";
  deleteCart.innerHTML = `Vaciar <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
  <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
  </svg> `;
  div.append(deleteCart);

  deleteCart.onclick = () => {
    cart = [];
    //vaciar localstorage
    localStorage.setItem("cart", JSON.stringify(cart));
    div.innerHTML = ``;
  };
  //CONFIRMAR COMPRA
  let confirmarCompra = document.createElement("button");
  confirmarCompra.className = "btn btn-primary mb-3";
  confirmarCompra.innerHTML = `Confirmar compra`;
  div.append(confirmarCompra);
  confirmarCompra.onclick = () => {
    cart = [];
    //vaciar localstorage
    localStorage.setItem("cart", JSON.stringify(cart));
    Swal.fire("Confirmaste tu compra", "Gracias por confiar en nosotros!","success");
  };
}

buttonCart.onclick = () => {
  div.innerHTML = ``;
  showCart();
};

//FUNCION QUE BUSCAR PRODUCTO SEGUN SU NOMBRE
const buscarNombreProducto = (name) => {
  const nombreBuscado = products.find(
    (nombreBuscado) => nombreBuscado.name.toLowerCase() === name
  );
  if (nombreBuscado) {
    console.log(nombreBuscado);
    limpiarMisProductosOferta();
    mostrarProductos([nombreBuscado]);
    return (resultadoBusqueda = nombreBuscado);
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops... ",
      text: "no lo tenemos :(",
    });
    limpiarMisProductosOferta();
    mostrarProductos(products);
  }
};

//FUNCION PARA VACIAR EL CONTENIDO DE LA SECCION MIS PRODUCTOS
function limpiarMisProductosOferta() {
  misProductosOferta.innerHTML = "";
}

btnSearch.addEventListener("click", (e) => {
  e.preventDefault();
  let resultadoBusqueda = buscarNombreProducto(inputSearch.value);
  console.log(resultadoBusqueda);
});
