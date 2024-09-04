// backend/routes/index.js

import express from "express";
import multer from "multer";
import path from "path";
import { createProduct, getProduct, deleteProduct, patchProduct } from "../controller/index.js";

const router = express.Router();

// Use in-memory storage
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: { fileSize: 5000000 },
    fileFilter: function (req, file, cb) {
        const filetypes = /jpeg|jpg|png|gif/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error('Only images are allowed'));
    }
}).single('image');

router.post("/", upload, createProduct);
router.get("/", getProduct);
router.delete("/:id", deleteProduct);
router.patch("/:id", upload, patchProduct);

export const productRouter = router;
