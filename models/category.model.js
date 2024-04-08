import mongoose from "mongoose";
const CategorySchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter the category name"],
    unique: true,
  },
  //   for further studies u can add tags to the category
});
const Category = mongoose.model("Category", CategorySchema);
export default Category;
