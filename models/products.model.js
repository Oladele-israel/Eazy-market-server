import mongoose from "mongoose";
const product_Schema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "you must enter a product name"],
    },

    rating: {
      type: Number,
      default: 0,
      required: true,
    },

    price: {
      type: Number,
      required: [true, " you must enter a product price"],
      default: 0,
    },
    color: {
      type: String,
    },
    photo: {
      type: String,
      required: true,
    },

    size: {
      type: String,
    },
    category: {
      type: String,
      required: true["please enter category"],
    },
  },
  {
    timestamps: true,
  }
);

const products = mongoose.model("product", product_Schema);
export default products;

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
