const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
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
    let data = await fs.readFile(pathFile,"utf-8")
    return JSON.parse(data);

}


app.get("/products",async(req,res) => {
    let products = await readFile();
    res.json(products);
})


app.listen(port, ()=>{
    console.log("server is running")
})