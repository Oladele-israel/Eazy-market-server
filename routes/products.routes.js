import {
  get_all_Products,
  productDelete,
  productPost,
  productUpdate,
  singleProduct,
} from "../controller/products.controller.js";
import express from "express";
import products from "../models/products.model.js";
const router = express.Router();

router.get("/", get_all_Products);
router.get("/:id", singleProduct);
router.post("/", productPost);
router.put("/:id", productUpdate);
router.delete("/:id", productDelete);

export default router;
