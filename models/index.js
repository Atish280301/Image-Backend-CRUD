import mongoose from "mongoose";
const ProductSchema = new mongoose.Schema({
    name: {type: String, required: true},
    image: { type: Buffer, required: true }
});
export const Product = mongoose.model("Product",ProductSchema);

