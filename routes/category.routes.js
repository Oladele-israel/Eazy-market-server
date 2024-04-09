import express from "express";
import {
  createCategory,
  allCategories,
  singleCategory,
  deleteCategory,
  updateCategory,
} from "../controller/category.controller.js";
const router = express.Router();
router.post("/new-category", createCategory);
router.get("/all-categories", allCategories);
router.get("/:category", singleCategory);
router.put("/update-category/:id", updateCategory);
router.delete("/delete-categorys/:id", deleteCategory);
export default router;
