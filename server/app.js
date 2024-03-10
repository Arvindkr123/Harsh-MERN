import express from "express";
import cors from "cors";
import connectDB from "./db/db.js";
import { PORT } from "./config/config.js";
import userRoutes from "./routes/user.routes.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/users", userRoutes);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log("listening on PORT 8080");
    });
  })
  .catch((err) => {
    console.log(err);
  });
