import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import userRoutes from "./api/user_route.js";
import taskRoutes from "./api/task_route.js";
import connectToDb from "./db/index.js";

dotenv.config(".env");
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(morgan(":method - :url - :date - :response-time ms"));

//Routes
app.use("/", userRoutes);
app.use("/", taskRoutes);
app.use("/", (req, res) => {
  res.json({
    message: "Welcome to server",
  });
});

//connection to database and then running the server
Promise.all([connectToDb()])
  .then(() =>
    app.listen(process.env.PORT, () => console.log("Server Started..."))
  )
  .catch((error) => {
    console.error(`MongoDB Atlas Error: ${error}`);
    process.exit();
  });
