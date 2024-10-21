const socket = io();

document
  .getElementById("productForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const productName = document.getElementById("productName").value;
    const productPrice = document.getElementById("productPrice").value;
    const product = {
      id: Date.now().toString(),
      name: productName,
      price: productPrice,
    };

    socket.emit("newProduct", product);

    this.reset();
  });

socket.on("updateProducts", (product) => {
  const productList = document.getElementById("productList");
  const li = document.createElement("li");
  li.id = `product-${product.id}`;
  li.innerHTML = `${product.name} - $${product.price} <button onclick="deleteProduct('${product.id}')">Eliminar</button>`;
  productList.appendChild(li);
});

function deleteProduct(productId) {
  socket.emit("deleteProduct", productId);

  const productElement = document.getElementById(`product-${productId}`);
  if (productElement) {
    productElement.remove();
  }
}

socket.on("removeProduct", (productId) => {
  const productElement = document.getElementById(`product-${productId}`);
  if (productElement) {
    productElement.remove();
  }
});
