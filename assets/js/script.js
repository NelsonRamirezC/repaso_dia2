$(() => {
    (function main() {
        //IIFE
        let acumulador = "";
        arrProductos.forEach((producto) => {
            acumulador += `
            <div class="col-12 col-md-6 col-lg-4">
                    <div class="card mx-auto" style="width: 90%;">
                        <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                        <div class="card-body">
                            <h5 class="card-title">${producto.nombre}</h5>
                            <p class="card-text">${producto.descripcion}</p>
                            <a href="./detalle_producto.html?id=${producto.id}" class="my-1 btn btn-primary">Comprar</a>
                            <button class="btn-modal btn btn-success my-1" data-id="${producto.id}" data-bs-toggle="modal" data-bs-target="#modalProducto">Ver Detalle</button>
                        </div>
                    </div>
                </div>
        `;
            //<button onclick="mostrarModal('${producto.id}')" class="btn btn-success" data-id="${producto.id}" data-bs-toggle="modal" data-bs-target="#modalProducto">Modal producto</button>
        });

        $("#listadoProductos").html(acumulador);
    })();

    /*  $(".btn-modal").on("click", function (event) {
        let idProducto = event.target.dataset.id;
        cargarDatosModal(idProducto);
    }); */

    let botonesModal = document.getElementsByClassName("btn-modal");
    let arrayBotones = [...botonesModal];
    arrayBotones.forEach((boton) => {
        boton.addEventListener("click", function (event) {
            let idProducto = event.target.dataset.id;
            cargarDatosModal(idProducto);
        });
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
            /* 
            name,
            height
            weight
            types = [] => type.name
            sprites.other.official-artwork.front_shiny
            stats = [] => base_stat: puntaje
            stats = [] => stat.name: nombre del stat 
            */
            let { name, height, weight, types, sprites, stats } = pokemon;
            let objPokemon = {
                name,
                height,
                weight,
                types,
                image: sprites.other["official-artwork"].front_default,
                stats,
            };
            mostrarPokemon(objPokemon);
        })
        .catch((error) => {
            alert(error);
        });
}

function mostrarPokemon(pokemon) {
    let contenedorCard = $(".cardPokemon");
    contenedorCard.find("img").attr("src", pokemon.image);
    contenedorCard.find(".cardPokemon--title").text(pokemon.name);
    contenedorCard.find(".cardPokemon--peso").text(pokemon.weight);
    contenedorCard.find(".cardPokemon--estatura").text(pokemon.height);
    /* types = [] => type.name */

    let acumulador = "";
    pokemon.types.forEach((type) => {
        console.log(type);
        acumulador += `<li>${type.type.name}</li>`;
    });
    contenedorCard.find(".lista--tipos").html(acumulador);
}
