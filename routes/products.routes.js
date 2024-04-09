import {
  get_all_Products,
  productDelete,
  productPost,
  productUpdate,
  singleProduct,
} from "../controller/products.controller.js";
import express from "express";
import { checkAndRenewToken } from "../middleware/validatoken.js";
import products from "../models/products.model.js";
const router = express.Router();

router.get("/allProducts", checkAndRenewToken, get_all_Products);
router.get("/:id", singleProduct);
router.post("/create-product", checkAndRenewToken, productPost);
router.put("/update-product:id", checkAndRenewToken, productUpdate);
router.delete("/delete-product:id", checkAndRenewToken, productDelete);

export default router;
