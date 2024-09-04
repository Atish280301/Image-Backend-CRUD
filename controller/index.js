import { Product } from "../models/index.js";
// Adding console logs for debugging
export const createProduct = async (req, res) => {
    try {
        const { name } = req.body;
        const imageBuffer = req.file ? req.file.buffer : null;

        console.log("Received data:", { name, imageBuffer });

        if (!name || !imageBuffer) {
            console.log("Validation failed");
            return res.status(400).json({ message: "Name and image are required" });
        }

        const newProduct = new Product({
            name,
            image: imageBuffer
        });
        await newProduct.save();

        res.status(201).json(newProduct);
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};



export const getProduct = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);

        if (product) {
            res.status(200).json({ message: "Product deleted successfully" });
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

export const patchProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const imageBuffer = req.file ? req.file.buffer : null;

        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        product.name = name || product.name;

        if (imageBuffer) {
            product.image = imageBuffer;
        }

        await product.save();

        res.status(200).json(product);
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
