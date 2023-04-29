$(() => {

    (function main() {
        const url = new URL(location.href);
        const parametros = new URLSearchParams(url.search);
        let id = parametros.get("id");

        let producto = arrProductos.find((producto) => producto.id == id);
        if (producto) {
            mostrarProducto(producto);
        } else {
            alert("Producto no encontrado.");
        }
    })();

    function mostrarProducto(producto) {
        let contenedorDetalle = $(".detalleProducto");
        contenedorDetalle.find("img")
            .attr("src", producto.imagen)
            .attr("alt", producto.nombre)
        
        contenedorDetalle.find(".detalleProducto--nombre").text(producto.nombre); 
        contenedorDetalle.find(".detalleProducto--descripcion").text(producto.descripcion);
        contenedorDetalle.find(".detalleProducto--precio").text(producto.precio);
        
    }
    
})

