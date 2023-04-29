$(() => {
    (function main() {
        let acumulador = "";
        arrProductos.forEach((producto) => {
            acumulador += `
            <div class="col-12 col-md-6 col-lg-4">
                    <div class="card mx-auto" style="width: 90%;">
                        <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                        <div class="card-body">
                            <h5 class="card-title">${producto.nombre}</h5>
                            <p class="card-text">${producto.descripcion}</p>
                            <a href="./detalle_producto.html?id=${producto.id}" class="btn btn-primary">Ver detalle</a>
                            <button class="btn-modal btn btn-success" data-id="${producto.id}" data-bs-toggle="modal" data-bs-target="#modalProducto">Modal producto</button>
                        </div>
                    </div>
                </div>
        `;
            //<button onclick="mostrarModal('${producto.id}')" class="btn btn-success" data-id="${producto.id}" data-bs-toggle="modal" data-bs-target="#modalProducto">Modal producto</button>
        });

        $("#listadoProductos").html(acumulador);
    })();

    $(".btn-modal").on("click", function (event) {
        let idProducto = event.target.dataset.id;
        cargarDatosModal(idProducto);
    });

    /*  window.mostrarModal = function(id) {
        console.log(id);
    }
 */

    $("#busquedaPokemones").on("submit", function (event) {
        event.preventDefault();
        let pokemon = $("#pokemonName").val();
        obtenerPokemon(pokemon);
    });
});

function cargarDatosModal(id) {
    let producto = arrProductos.find((producto) => producto.id == id);

    if (producto) {
        $("#modalProductoLabel").text(producto.nombre);
        $("#modalProducto .modal-body-descripcion").text(producto.descripcion);
        $("#modalProducto .modal-body-img")
            .attr("src", producto.imagen)
            .attr("alt", producto.nombre);
    } else {
        alert("Producto no encontrado.");
    }
}

function obtenerPokemon(nombrePokemon = 1) {
    let url = "https://pokeapi.co/api/v2/pokemon/" + nombrePokemon;

    fetch(url)
        .then((response) => {
            if (response.status == 200) {
                return response.json();
            } else {
                throw new Error("Pokémon no encontrado.");
            }
        })
        .then((pokemon) => {
            console.log(pokemon);
        })
        .catch((error) => {
            alert(error);
        });
}
