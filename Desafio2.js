const fs = require("fs").promises;

async function readFile(path) {
  try {
    const data = await fs.readFile(path, "utf-8");
    return data == "" ? [] : JSON.parse(data);
  } catch (err) {
    return [];
    console.error(err);
  }
}

async function saveData(path, data) {
  try {
    fs.writeFile(path, data);
  } catch (err) {
    console.error(err);
  }
}

class productManager {
  constructor() {
    this.path = "./Products.json";
    this.products = [];
  }

  async loadProducts() {
    try {
      this.products = await readFile(this.path);
    } catch (err) {
      console.error(`No existe el archivo.`);
    }
  }

  generateId() {
    if (this.products.length == 0) {
      return 1;
    }
    return (
      this.products.reduce((mayor, actual) => {
        return mayor > actual ? mayor : actual;
      }).id + 1
    );
  }

  validate(title, description, price, thumbnail, code, stock) {
    return (
      this.products.find((element) => element.code == code) == undefined &&
      title != undefined &&
      description != undefined &&
      price != undefined &&
      thumbnail != undefined &&
      code != undefined &&
      stock != undefined
    );
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    if (this.validate(title, description, price, thumbnail, code, stock)) {
      this.products.push({
        id: this.generateId(),
        title: title,
        description: description,
        price: price,
        thumbnail: thumbnail,
        code: code,
        stock: stock,
      });
      saveData(this.path, JSON.stringify(this.products));
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

  updateProduct(prod) {
    this.products.find((p, index) => {
      if (p.id === prod.id) Object.assign(this.products[index], prod);
    });
  }

  deleteProduct(id) {
    this.products = this.products.filter((prod) => prod.id !== id);
    saveData(this.path, JSON.stringify(this.products));
  }
}
/* 
#############################################################
      Zona de pruebas
#############################################################
*/

const main = async () => {
  let manager = new productManager();

  await manager.loadProducts();

  await manager.addProduct(
    "Celular",
    "Moto G7",
    20000,
    "/images/motog7.jpg",
    123460,
    10
  );

  await manager.addProduct(
    "Celular",
    "Samsung J7",
    15000,
    "/images/samsungj7.png",
    123461,
    20
  );

  console.log(manager.getProducts());

  manager.updateProduct({
    id: 2,
    title: "Celular",
    description: "Samsung J7",
    price: 15000,
    thumbnail: "/images/samsungj7.png",
    code: 123461,
    stock: 50,
  });
  console.log("Modificado: \n", manager.getProductsById(2));
  manager.deleteProduct(1);
  console.log("Productos despues de la eliminacion: \n", manager.getProducts());
};

main();
