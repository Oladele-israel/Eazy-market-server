import mongoose from "mongoose";
// to define the categoris in the nexted schema for product
// const category_schema = mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//       enum: ["Clothing", "Gadgets", "Phone", "Computers", "Footwares"],
//     },
//     type: [
//       {
//         type: String,
//         required: true,
//       },
//     ],
//   },
//   { _id: false }
// );
const product_Schema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "you must enter a product name"],
    },

    rating: {
      type: Number,
      default: 0,
    },

    price: {
      type: Number,
      required: [true, " you must enter a product price"],
      default: 0,
    },
    color: {
      type: String,
      required: false,
    },
    photo: {
      type: String,
    },

    size: {
      type: String,
    },
    category: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const products = mongoose.model("product", product_Schema);
export default products;
