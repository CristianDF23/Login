import  express  from 'express'
import ProductManager from './productManager.js'

const product = new ProductManager()

const app = express()

app.get('/', (req, res) => {
    res.send(`<h1 style ='color: blue'>Bienvenidos</h1>`)
})

app.get('/products', async (req, res) => {
    let { limit } = req.query
    let limitProd = await product.limitQty(limit)
    res.send(limitProd)
})

app.get('/products/:pid', async (req, res) => {
    let { pid } = req.params
    let prodById = await product.getProductById(pid)
    res.send(prodById)
})

const PORT = 8080

app.listen(PORT, () => {
    console.log('Server run on port ', PORT);
})


