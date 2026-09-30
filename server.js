const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs/promises');
const path = require('path');

const pathFile = path.join(__dirname, 'db.json');

// reading the file synchronously

// app.get("/products",(req,res) => {
// const data = fs.readFileSync('db.json', 'utf-8');
// const products = JSON.parse(data);
// res.json(products);
// })

// reading the file asynchronously

async function readFile() {
    try {
    let data = await fs.readFile(pathFile,"utf-8")
    return JSON.parse(data);
    } catch (error) {
        console.log(error)
    }

}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

app.get("/products",async(req,res) => {
    let products = await readFile();
    res.json(products);
})

app.get("/products/:id",async(req,res) => {
    try{
    await delay(3500)
    let {id} = req.params
    id = Number(id)
    let products = await readFile();
    let product = products.find((item) => {return item.id === id});
    res.json(product);
    } catch (error) {
        console.log(error)
    }

})

app.listen(port, ()=>{
    console.log("server is running")
})