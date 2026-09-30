const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs/promises');
const path = require('path');


const pathFile = path.join(__dirname, 'db.json');
const cashe = {};

// reading the file synchronously

// app.get("/products",(req,res) => {
// const data = fs.readFileSync('db.json', 'utf-8');
// const products = JSON.parse(data);
// res.json(products);
// })

// reading the file asynchronously

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function readFile() {
    try {
    await delay(1500)
    let data = await fs.readFile(pathFile,"utf-8")
    return JSON.parse(data);
    } catch (error) {
        console.log(error)
    }

}

app.get("/products",async(req,res) => {
    try{
    let key = req.url;
    let value = cashe[key];
    if (value) {
        return res.json(value);
    }
    let products = await readFile();
    cashe[key] = products;
    res.json(products);
    } catch (error) {
        console.log(error)
    }
    
})

app.get("/products/:id",async(req,res) => {
    try{
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