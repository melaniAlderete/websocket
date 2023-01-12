const socket = io("http://localhost:3000");
let arrayProductos = [];
document.getElementById("send").addEventListener("click", postProduct);

function postProduct() {
  let product = {
    title: document.getElementById("title").value,
    category: document.getElementById("category").value,
    price: document.getElementById("price").value,
    code: document.getElementById("code").value,
    stock: document.getElementById("stock").value,
  };

  socket.emit("newProduct", product);
}

function deleteProduct(id) {
  console.log(id);
  socket.emit("deleteProduct", id);
}

socket.on("products", (data) => {
  let historial = document.getElementById("history");
  historial.innerHTML = "";

  data.forEach((element) => {
    historial.innerHTML += `
                    <tr>
                    <td> ${element.title} </td>
                    <td>${element.categoria}</td>
                    <td>$ ${element.price}</td>
                    <td>${element.code}</td>
                    <td>${element.stock} Unidades</td>
                    </tr>
                    <button onclick="deleteProduct(${element.id})">Eliminar</button>
    `;
  });
});
