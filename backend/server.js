import express from 'express';
import { connectDB } from './config/db.js';
import Product from './models/product.model.js';

const app = express();

app.use(express.json());

app.post("/api/products", async (req, res ) => {
    const product = req.body;

    if (!product.name || !product.price || !product.image) {
        return res.return(400).json({sucess:false, message:"Please provide all fileds"});
    }

    const newProduct = new Product(product)

    try {
        await newProduct.save();
        res.status(201).json({sucess:true, data:newProduct});
        console.log(req.body);
        
        
    } catch (error) {
        console.log("Erorr in create product:", error.message);
        res.status(500).json({sucess:false, message:"Server Error"});
    }
});


app.delete("/api/products/:id", async(req, res) => {
    const {id} = req.params;
    console.log(id);

    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({sucess:true, message:"Product deleted"});
    } catch (error) {
        res.status(404).json({sucess:false, message:"Product not found"});
    }
})

app.listen(5000 , () => {
    connectDB();
    console.log("Server started at http://localhost:5000");
});










