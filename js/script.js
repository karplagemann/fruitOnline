

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

    //filtro el carrito creando un nuevo array que NO contenga el elemento con el id que indique
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
document.addEventListener("keyup", e=>{

  if (e.target.matches("#SearchFruta")){

      if (e.key ==="Escape")e.target.value = ""

      document.querySelectorAll(".articuloFruta").forEach(fruta =>{

          fruta.textContent.toLowerCase().includes(e.target.value.toLowerCase())
            ?fruta.classList.remove("filtro")
            :fruta.classList.add("filtro")
      })

  }


})

//BUSCADOR DE FRUTAS 



// // FILTRAR PRODUCTOS //
// let buscador = document.getElementById("inputSearch");
// let filtrar = document.getElementById("filtrar");

// function filtrarPorCat() {
//   let verTodo = document.createElement("button");
//   verTodo.innerText = "Ver Todo";
//   showProducts.append(verTodo);
//   const filteredProducts = products.filter(
//     (product) => product.category === buscador.value
//   );
//   console.log(filteredProducts);

//   filteredProducts.forEach((filter) => {
//     let cardFilter = document.createElement("div");
//     misProductosOferta.append(cardFilter);
//     let imgFilter = document.createElement("img");
//     imgFilter.setAttribute("src", filter.img);
//     let nameFilter = document.createElement("h3");
//     nameFilter.innerText = filter.name;
//     let priceFilter = document.createElement("p");
//     priceFilter.innerText = filter.price;
//     let buyButtonFilter = document.createElement("button");
//     buyButtonFilter.innerText = "Agregar al carrito";
//     cardFilter.append(imgFilter, nameFilter, priceFilter, buyButtonFilter);
//   });

//   verTodo.onclick = () => {
//     misProductosOferta.innerHTML = ``;
//     mostrarProductos();
//   };
// }

// buscador.onchange = () => {
//     misProductosOferta.innerHTML = ``;
//   filtrarPorCat();
// };

// filtrar.onclick = () => {
//     misProductosOferta.innerHTML = ``;
//   filtrarPorCat();
// };

// // //TERMINAR COMPRA

// // function terminarCompra() {
// //     class Usuario {
// //         constructor(nombre, direccion, mail) {
// //             this.nombre = nombre,
// //                 this.direccion = direccion,
// //                 this.mail = mail
// //         }
// //     }
// //     let nombre = document.getElementById("nombre")
// //     let direccion = document.getElementById("direccion")
// //     let mail = document.getElementById("email")
// //     let usuarioCompra = new Usuario(nombre.value, direccion.value, mail.value)
// //     console.log(usuarioCompra)
// //     console.log(cart)
// // }

// // let terminarPedido = document.getElementById("terminarPedido")

// // terminarPedido.onclick = (e) => {
// //     e.preventDefault()
// //     terminarCompra()
// // }

// {
//   /* <article id="producto1" class="col-12 col-md-6 col-lg-3 mb-3 mb-lg-0">
//                 <div class="card">
//                     <div class="border-bottom d-flex justify-content-center align-content-center">
//                         <img class="card-img-top  w-50 pt-2 pb-2"   src="${element.img}">
//                     </div>
//                 <div class="card-body">
//                     <div class="badge bg-primary text-wrap fw-normal text-uppercase mb-2">
//                         OFERTA DEL MES
//                     </div>
//                     <div class="text-decoration-line-through small">$ ${element.price}</div>
//                     <div class="fw-bold mb-2">$ ${element.price} <span class="text-success small fst-italic fw-normal" >50% OFF</span></div>
//                     <h5 class="card-title h6 fw-bold text-black opacity-75">${element.name}</h5>
//                     <div class="card-text">
//                     ${element.description}</div>
//                 </div>
//                 <button type="submit" class="btn btn-dark btn-sm btnAgregarAlCarrito">Agregar al Carrito</button>
//                 </div>
//     </article>

//                 <img src="${element.img}">
//         <h3>${element.name}</h3>
//         <h3>$${element.price}</h3>
//         <button class="eliminar btn btn-danger" data-id=${element.id}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
//             <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
//         </svg></button> */
// }
