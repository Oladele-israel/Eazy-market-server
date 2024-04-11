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

router.get("/all", get_all_Products);
router.get("/:id", checkAndRenewToken, singleProduct);
router.post("/", checkAndRenewToken, productPost);
router.put("/:id", productUpdate);
router.delete("/:id", checkAndRenewToken, productDelete);

export default router;
