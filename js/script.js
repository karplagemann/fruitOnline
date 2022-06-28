// DOM
// SALUDO A MI USUARIO

// let nombre = prompt("cual es tu nombre?");
// while (nombre == "") {
//     nombre = prompt("cual es tu nombre, no dejes vacio!?");
// }
// const saludar = (nombre) => {
//   alert(`Hola ${nombre}! Como estas?`);
// };
// saludar(nombre);

let misProductosOferta = document.getElementById("misProductosOferta");
const div = document.querySelector(".div");

let cart = [];
const mainCont = document.querySelector(".rowContainer");

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
    price.innerHTML = `<span class="fw-bold mb-2 ">$ ${product.price} </span>x Kg`;
  

    let descriptionProduct = document.createElement("p");
    descriptionProduct.innerText = product.description;

    let buyButton = document.createElement("button");
    buyButton.className = "btn btn-primary btn-sm mb-2";
    buyButton.innerHTML = `
            Agregar al Carrito
        `;
    card.append(img, name, price, descriptionProduct, buyButton);

    buyButton.addEventListener("click", function () {
      cart.push(product);
      alert("Agregaste " + product.name + " al carrito")
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


  cart.forEach((element) => {
    const divCart = document.createElement("li");
    divCart.className = "miCarrito";
    divCart.innerHTML += `
        <img src="${element.img}">
        <button class="eliminar btn btn-danger" data-id=${element.id}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
        </svg></button>
        <h5 class="col">${element.name}</h5>
        <form id="formulario">
                <input id="cantidadInput" class="inputDeCarga" type="number" placeholder="Cuantos kg?" />
        </form>
        <h5 class="fw-bold mb-2 text-primary">$${element.price}</h5>
        `;
    div.appendChild(divCart);
  });

  let eliminarItem = document.querySelector(".eliminar");
  eliminarItem.onclick = (e) => {
    const productId = e.target.getAttribute(`data-id`);
    cart = cart.filter((producto) => producto.id !== productId);
    div.innerHTML = ``;
    showCart()
  };

  //PRECIO TOTAL CARRITO//
  const total = cart
    .map((item) => parseInt(item.price))
    .reduce(
      (cartTotalPrice, currentItemPrice) => cartTotalPrice + currentItemPrice,
      0
    );
  console.log(total);

  let totalCompra = document.createElement("h4");
  totalCompra.innerHTML = `Total del carrito <span class="text-primary">$ ${total}</span>`
  div.append(totalCompra);

  //VACIAR CARRITO //
  let deleteCart = document.createElement("button");
  deleteCart.className ="btn btn-danger col-2 float-right"
  deleteCart.innerHTML = `Eliminar Carrito <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
  <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
  </svg> `;
  div.append(deleteCart);

  deleteCart.onclick = () => {
    cart = [];
    div.innerHTML = ``;
  };
}

buttonCart.onclick = () => {
  div.innerHTML = ``;
  showCart();
};


//BUSCADOR DE FRUTAS 
// document.addEventListener("keyup", e=>{

//   if (e.target.matches("#SearchFruta")){

//       // if (e.key ==="Escape")e.target.value = ""

//       // document.querySelectorAll(".articuloFruta").forEach(fruta =>{

//       //     fruta.textContent.toLowerCase().includes(e.target.value.toLowerCase())
//       //       ?fruta.classList.remove("filtro")
//       //       :fruta.classList.add("filtro")
//       // })

//       alert("es el buscador")

//   }


// })

// const inputKeyUp = (ID) => {
//     let input = document.getElementById(ID);
//     input.onkeyup = (e) => { console.log(e.target.value + '  inputKeyUp') }
// }

// inputKeyUp ('SearchFruta')

// CARRITO CONTADOR



let alertCart1 = document.createElement("p");
alertCart1.setAttribute("class", "alerta");

if (!cart.lenght) {
  alertCart1.innerText = `0 items`;
  cartCounter.append(alertCart1);
}
