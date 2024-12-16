import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const getProducts = async(req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({sucess:true, data:products});
    } catch (error) {
        console.log("error in fetching products:", error.message);
        res.status(500).json({sucess:false, message:"Server Error"});
        
    }
};

export const createProduct =  async (req, res ) => {
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
};

export const updateProduct =  async (req, res) => {
    const {id} = req.params;
    
    const product = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({sucess:false, message:"Invalid product Id"});
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new:true});
        res.status(200).json({sucess:true, data:updatedProduct})
    } catch (error) {
        res.status(500).json({sucess:false, message: "Server Error"});
    }
};

export const deleteProduct = async(req, res) => {
    const {id} = req.params;
    console.log(id);

    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({sucess:true, message:"Product deleted"});
    } catch (error) {
        res.status(404).json({sucess:false, message:"Product not found"});
    }
};



