import { myProducts } from "../scripts/dataservice.js";

const productBox = document.querySelector("[data-product]");
const form = document.querySelector("[data-form]");
const saveButton = document.querySelector("#button-submit");
const clearButton = document.querySelector("#button-clear");

function newElement(name, value, image, id) {
  const card = document.createElement("div");
  card.classList.add("product-box");

  card.innerHTML = `
        <img src="${image}" alt="${name}" class="product-img">
        <div class="product-info-box">
            <h1 class="product-title">${name}</h1>
        </div>
        <div class="product-info-box">
            <h1 class="product-price">$ ${value}</h1>
            <button class="product-button-delete" type="reset" width="20px" height="20px" data-id=${id}>
                <img src="assets/trash.png" alt="Icone Lixo" >
            </button>
        </div>
    `;

  productBox.appendChild(card);
  return card;
}

const render = async () => {
  try {
    const productList = await myProducts.productsList();

    productList.forEach((product) => {
      newElement(product.name, product.value, product.image, product.id);
    });
  } catch (error) {
    console.log(error);
  }
};

saveButton.addEventListener("click", async (event) => {
  const name = document.querySelector("[data-name]").value;
  const value = document.querySelector("[data-value]").value;
  const image = document.querySelector("[data-image]").value;

  try {
    const newProduct = await myProducts.createNewElement(name, value, image);

    newElement(
      newProduct.name,
      newProduct.value,
      newProduct.image,
      newProduct.id
    );
    document.querySelector("[data-name]").value = "";
    document.querySelector("[data-value]").value = "";
    document.querySelector("[data-image]").value = "";
  } catch (error) {
    console.log(error);
  }
});

productBox.addEventListener("click", async (event) => {
  if (event.target.closest(".product-button-delete")) {
    const deleteCardButton = event.target.closest(".product-button-delete");
    const id = deleteCardButton.dataset.id;
    try {
      await myProducts.deleteProduct(id);
      deleteCardButton.closest(".product-box").remove();
    } catch (error) {
      console.log(error);
    }
  }
});

clearButton.addEventListener("click", () => {
  document.querySelector("[data-name]").value = "";
  document.querySelector("[data-value]").value = "";
  document.querySelector("[data-image]").value = "";
});

render();
