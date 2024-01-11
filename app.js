const express = require('express')

const ProductManager = require('./productManager')

const product = new ProductManager()

// product.addProducts({
//     title: "producto 1",
//     description: "computadora Acer",
//     price: 124000,
//     thumbnail: "computadoraAcer.jpg",
//     code: "C00001",
//     stock: 10
// });

// product.addProducts({
//     title: "producto 2",
//     description: "computadora Asus",
//     price: 140000,
//     thumbnail: "computadoraAsus.jpg",
//     code: "C00002",
//     stock: 10
// })

// product.addProducts({
//     title: "producto 3",
//     description: "computadora BGH",
//     price: 40000,
//     thumbnail: "computadoraBGH.jpg",
//     code: "C00003",
//     stock: 10
// })

// product.addProducts({
//     title: "producto 4",
//     description: "computadora Lenovo",
//     price: 40000,
//     thumbnail: "computadoraLenovo.jpg",
//     code: "C00004",
//     stock: 10
// })

const app = express()

app.get('/', (req, res) => {
    res.send(`<h1 style ='color: blue'>Bienvenidos a CastleSport</h1>`)
})

app.get('/products', async (req, res) => {
    let limit = req.query.limit
    if (!limit) {
        let allProducts = await product.getProducts()
        res.send(allProducts)
    } else {
        let limitProd = await product.limitQty(limit)
        res.send(limitProd)
    }

})

app.get('/products/:pid', async (req, res) => {
    let pids = req.params.pid
    let prodById = await product.getProductById(parseInt(pids))
    res.send(prodById)
})



const PORT = 8080

app.listen(PORT, () => {
    console.log('Server run on port ', PORT);
})


