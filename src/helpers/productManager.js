import fs from "fs";

class ProductManager {
  constructor(path) {
    this.path = path;
    fs.existsSync(this.path)
      ? (this.products = JSON.parse(fs.readFileSync(this.path, "utf-8")))
      : (this.products = []);
  }

  async addProduct(product) {
    this.products.length === 0
      ? (product["id"] = 1)
      : (product["id"] = this.products[this.products.length - 1]["id"] + 1);

    this.products.push(product);
    await fs.promises.writeFile(
      this.path,
      JSON.stringify(this.products, null, "\t")
    );
    return true;
  }

  getProducts = () => {
    return this.products;
  };

  getElementById = (id) => {
    let product = this.products.find((el) => el.id === id);
    return product;
  };

  async updateProduct(id, input, newValue) {
    let i = this.products.findI((element) => element.id === id);
    let validInput;
    i === -1
      ? false
      : (inputValido = Object.keys(this.products[i]).some(
          (el) => el === input
        ));

    if (input === "id" || !validInput) {
      return false;
    } else {
      this.products[i][input] = newValue;
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(this.products, null, "\t")
      );
      return true;
    }
  }

  async deleteProduct(id) {
    let encontrado = this.products.some((el) => el.id === id);
    if (encontrado) {
      this.products = this.products.filter((el) => el.id !== id);
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(this.products, null, "\t")
      );
      return true;
    } else {
      return false;
    }
  }
}

export default new ProductManager("../Products.json");
