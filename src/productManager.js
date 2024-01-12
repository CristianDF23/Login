import fs from 'fs';

export default class ProductManager {
    constructor() {
        this.products = []
        this.path = './articles.json'
    }

    async addProducts(product) {
        try {
            if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
                console.log("Complete todos los campos");
            } else {
                if (fs.existsSync(this.path)) {
                    const res = JSON.parse(await fs.promises.readFile(this.path, 'utf-8'));
                    const searchProduct = res.find((i) => i.code === product.code);
                    if (searchProduct) {
                        console.log("El código de producto ya se encuentra en la lista");
                    } else {
                        product.id = Math.floor(Math.random() * 1000000);
                        res.push(product);
                        await fs.promises.writeFile(this.path, JSON.stringify(res, null, 2), 'utf-8');
                        console.log("El producto fue agregado a la lista");
                    }
                } else {
                    product.id = Math.floor(Math.random() * 1000000);
                    this.products.push(product);
                    await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2), 'utf-8');
                    console.log("El producto fue agregado a la lista");
                }
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }

    async getProducts() {
        let res = JSON.parse(await fs.promises.readFile(this.path, 'utf-8'))
        return res
    }

    async getProductById(id) {
        let res = JSON.parse(await fs.promises.readFile(this.path, 'utf-8'))
        const searchId = res.find((elem) => {
            return elem.id == id
        })
        return searchId;
    }

    async limitQty(number) {
        let res = JSON.parse(await fs.promises.readFile(this.path, 'utf-8'))
        const limit = res.slice(0, number)
        return limit
    }

    async deleteProduct(id) {
        let res = JSON.parse(await fs.promises.readFile(this.path, 'utf-8'))
        const searchIndex = res.filter(elem => elem.id !== id)
        fs.promises.writeFile(this.path, JSON.stringify(searchIndex, null, 2), 'utf-8')
    }

    async updateProduct(id, propiedad, valor) {
        let res = JSON.parse(await fs.promises.readFile(this.path, 'utf-8'))
        const searchIndex = res.findIndex(elem => elem.id === id)
        res[searchIndex][propiedad] = valor;
        fs.promises.writeFile(this.path, JSON.stringify(res, null, 2), 'utf-8')
    }
}

// newProduct.addProducts({
//     title: "producto 1",
//     description: "computadora Acer",
//     price: 124000,
//     thumbnail: "computadoraAcer.jpg",
//     code: "C00001",
//     stock: 10
// });

// newProduct.addProducts({
//     title: "producto 2",
//     description: "computadora Asus",
//     price: 140000,
//     thumbnail: "computadoraAsus.jpg",
//     code: "C00002",
//     stock: 10
// })

// newProduct.addProducts({
//     title: "producto 3",
//     description: "computadora BGH",
//     price: 40000,
//     thumbnail: "computadoraBGH.jpg",
//     code: "C00003",
//     stock: 10
// })

// newProduct.addProducts({
//     title: "producto 4",
//     description: "computadora Lenovo",
//     price: 40000,
//     thumbnail: "computadoraLenovo.jpg",
//     code: "C00004",
//     stock: 10
// })

// newProduct.getProducts();

// newProduct.getProductById(2)

// newProduct.deleteProduct(2)

//newProduct.updateProduct(1, 'description', 'computadora Acer, 16GB RAM, 120GB SSD')
