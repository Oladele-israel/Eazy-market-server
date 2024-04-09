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

router.get("/all",  get_all_Products);
router.get("/:id", singleProduct);
router.post("/",  productPost);
router.put("/:id",  productUpdate);
router.delete("/delete-product:id", productDelete);

export default router;
