class productManager {
  constructor() {
    this.products = [];
  }
  addProduct(title, description, price, thumbnail, code, stock) {
    if (
      this.products.find((element) => element.code == code) == undefined &&
      title != undefined &&
      description != undefined &&
      price != undefined &&
      thumbnail != undefined &&
      code != undefined &&
      stock != undefined
    ) {
      this.products.push({
        id: this.products.length + 1,
        title: title,
        description: description,
        price: price,
        thumbnail: thumbnail,
        code: code,
        stock: stock,
      });
    } else {
      console.log("Error. Repeated code.");
    }
  }

  getProducts() {
    return this.products;
  }

  getProductsById(id) {
    return this.products.find((element) => element.id == id) || "Not found";
  }
}
/*
Zona de pruebas

let manager = new productManager();

console.log(manager.getProducts());

manager.addProduct(
  "Celular",
  "Moto G7",
  20000,
  "/images/motog7.jpg",
  123456,
  10
);

manager.addProduct(
  "Celular",
  "Samsung J7",
  15000,
  "/images/samsungj7.png",
  123457,
  20
);

console.log(manager.getProducts());

console.log(manager.getProductsById(1));

*/
