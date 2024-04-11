import express from "express";
import mongoose from "mongoose";
const app = express(); //initializing the express
import productRoutes from "./routes/products.routes.js";
import userRouter from "./routes/user.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

// middleware to accept jsson
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["https://eazymart-puce.vercel.app", "http://localhost:5173"],
    credentials: true,
  })
);

//configuring the environmental variables path
dotenv.config();
//defining route,
app.use("/product", productRoutes);
app.use("/user", userRouter);
app.use("/category", categoryRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ massage: "hello from this server" });
});
//getting all the tours
const database = process.env.DB;
const port = process.env.PORT;
mongoose
  .connect(database)
  .then(() => {
    console.log("connected to database");
    app.listen(port, () => {
      console.log(`server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log("failed", error.massage);
  });
