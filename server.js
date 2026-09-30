const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');



app.get("/products",(req,res) => {
const data = fs.readFileSync('db.json', 'utf-8');
const products = JSON.parse(data);
res.json(products);
})


app.listen(port, ()=>{
    console.log("server is running")
})