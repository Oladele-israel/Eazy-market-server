import Category from "../models/category.model.js";
const allCategories = async (req, res) => {
  try {
    const Category = await Category.find({});
    res.status(200).json({
      success: true,
      message: "All Category",
      allCategories: Category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "All Category not fetched",
      error: error.message,
    });
  }
};
const singleCategory = async (req, res) => {
  try {
    const { category } = req.params;
    console.log("the Category id =>", category);
    const Category = await Category.findOne({ name: category });
    res.status(200).json({
      success: true,
      message: "Category found",
      singleCategory: Category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Category not found",
      error: error.message,
    });
  }
};
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("the Category id =>", id);
    const UpdatedCategory = await Category.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({
      success: true,
      message: "Category updated",
      UpdatedCategory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Category not updated",
      error: error.message,
    });
  }
};
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("the Category id =>", id);
    const deleteCategory = await Category.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Category deleted",
      deleteCategory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Category not deleted",
      error: error.message,
    });
  }
};
const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    console.log("the body => ", name);
    const existingCategory = await Category.findOne({
      name: name,
    }).exec();
    console.log("the cat => ", existingCategory);
    if (existingCategory) {
      return res.status(409).json({
        success: false,
        message: "Category already exists",
      });
    }
    const newCategory = await Category.create({ name });
    res.status(201).json({
      success: true,
      message: "Category created succesfully",
      newCategory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Category not created succesfully",
      error: error.message,
    });
  }
};
export {
  createCategory,
  allCategories,
  singleCategory,
  deleteCategory,
  updateCategory,
};
