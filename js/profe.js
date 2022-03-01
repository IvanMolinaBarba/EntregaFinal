const modelos = [{ id: 1, nombre: "Charizard", imagen: "Charizard_(Base_Set_TCG).png", precio: "3.000" },
{ id: 2, nombre: "Blastoise", imagen: "Blastoise_(Base_Set_TCG).png", precio: "2.000" },
{ id: 3, nombre: "Venasaur", imagen: "Venusaur_(Base_Set_2_TCG).jpg", precio: "1.000" },
{ id: 4, nombre: "Pikachu", imagen: "Raichu_(Base_Set_TCG).png", precio: "5.000" },
{ id: 5, nombre: "Mewtwo", imagen: "Mewtwo_(Base_Set_TCG).png", precio: "6.000" },
{ id: 6, nombre: "Clefairy", imagen: "Clefairy_(Base_Set_TCG).png", precio: "7.000" },
{ id: 7, nombre: "Machamp", imagen: "Machamp_(Base_Set_TCG).png", precio: "8.000" },
{ id: 8, nombre: "Dragonair", imagen: "Dragonair_(Base_Set_TCG).png", precio: "1.500" }];

class Auto {
  constructor(modelo) {
    this.nombre = modelo.nombre;
    this.imagen = modelo.imagen;
    this.precio = modelo.precio;
  }
}

function guardarModelos(modelos) {
  localStorage.setItem("modelos", JSON.stringify(modelos));
}

function cargarModelos() {
  return JSON.parse(localStorage.getItem("modelos"));
}


function borrarModelos() {
  localStorage.clear();

}

borrarModelos();
guardarModelos(modelos);
let modelos_cargados = cargarModelos();
let contenido = "";

for (let modelo_cargado of modelos_cargados) {
  let auto = new Auto(modelo_cargado);
  contenido += "<div class='col-md-4 py-3'>";
  contenido += "<div class='card'>";
  contenido += "<h5 class='card-title p-3 text-success text-uppercase fw-bold'>" + auto.nombre + "</h5>";
  contenido += "<img src='img/" + auto.imagen + "'class='card-img-top' alt='" + auto.nombre + "'>";
  contenido += "<div class='card-body'>";
  contenido += "<div class='row mb-2'>";
  contenido += "<div class='col-md-6 text-primary text-uppercase fw-bold'><span>PRECIO CONTADO</span></div>";
  contenido += "<div class='col-md-6 text-primary text-uppercase fw-bold text-end'><span>$" + auto.precio + "</span></div>";
  contenido += "</div>";
  contenido += "<div class='p-3 mb-2 bg-light text-dark text-center'>Dejanos tus datos que te contactaremos.</div>"
  contenido += "<div class='d-grid gap-2 mb-2'><a href='#' class='botton btn btn-primary'>Comprar</a></div>";
  contenido += "</div>";
  contenido += "</div>";
  contenido += "</div>";

}



let pagina_modelos = document.getElementById("modelos");
pagina_modelos.innerHTML = contenido;

function actualizarContadorCarrito() {
  let total = 0;
  if (localStorage.getItem("total_carrito")) {
    total = localStorage.getItem("total_carrito");
  }
  
  let contador_carrito = document.getElementById("datos_carrito");
  contador_carrito.innerHTML = "<a href='carrito.html'>" + total + " Producto(s)</a>";
}

actualizarContadorCarrito();

function buscarProducto(id) {
  let modelos = cargarModelos();
  return modelos.find(x => x.id == id);
}

function cargarCarrito() {
  if (localStorage.getItem("carrito")) {
    return JSON.parse(localStorage.getItem("carrito"));
  }

  return [];
}

function agregarAlCarrito(id) {
  let modelo = buscarProducto(id);
  let modelos = cargarCarrito();
  modelos.push(modelo);
  localStorage.setItem("carrito", JSON.stringify(modelos));
  console.log(modelos);
  localStorage.setItem("total_carrito", modelos.length);
  actualizarContadorCarrito();
}

function eliminarCarrito() {
  localStorage.removeItem("carrito");
  localStorage.removeItem("total_carrito");
  console.log("Se eliminó el carrito");
  actualizarContadorCarrito();
}

document.getElementById("eliminar_carrito").addEventListener("click", eliminarCarrito);



$(".botton").click(function (e) {
e.preventDefault
//no funciona el id
agregarAlCarrito(modelos.id);


});

$("#buscar").click(function (e) {
  buscartitulo();
});

function buscartitulo() {
  $.ajax({
    method: "GET",
    url: "https://pokeapi.co/api/v2/pokemon/?limit=151",
    success: function (data) {
      let items= data.results;
      console.log(items);
      // $("#resultado").html(result);
    },
    error: function (status) {
      $("#resultado").html("No hay pokemones");
    }
  });
}

