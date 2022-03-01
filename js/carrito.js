function cargarCarrito() {
let productos_carrito = JSON.parse(localStorage.getItem("carrito"));
let total = 0;
let contenido = "<table class=`table`>";
contenido += `<thead>
<tr>
<th scope = "col">&nbsp;</th> 
<th scope = "col">Modelo</th>
<th scope = "col">Precio</th>
</tr> 
</thead> 
<tbody>`;

for (let modelo of productos_carrito) {
    contenido += `<tr> 
    <td><img src ="img/$(modelo.imagen)"alt="$(modelo.imagen)"width = "80"></td> 
    <td>$(modelo.nombre)</td>
    <td>$(modelo.precio)</td>  
    </tr>`;
    total += modelo.precio;
    
}

contenido += `<tr>
<td>&nbsp;</td>
<td>Total</td>
<td>$(total)</td>
</tr>
</tbody>
</table>`;
document.getElementById("carrito").innerHTML = contenido;
}



// Actualizo el Contador de Productos del Carrito
actualizarContadorCarrito();