const socket = io();

const titleInput = document.getElementById("title");
const categoryInput = document.getElementById("category");
const priceInput = document.getElementById("price");
const codeInput = document.getElementById("code");
const stockInput = document.getElementById("stock");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const newProduct = {
    title: titleInput.value,
    category: categoryInput.value,
    price: priceInput.value,
    code: codeInput.value,
    stock: stockInput.value
  };

  socket.emit("products", newProduct);
  titleInput.value = "";
  categoryInput.value = ""; 
  priceInput.value = "";
  codeInput.value = "";
  stockInput.value = "";
});

socket.on("products", (data) => {
  const products = data
    .map((prod) => {
      return `title: ${prod.title}, category: ${prod.category}, price: ${prod.price}, code: ${prod.code}, stock: ${prod.stock}`;
    })
    .join("<br>");
  document.querySelector("tr").innerHTML = products;
});
