import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import postRoutes from "./routes/posts.js";

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true })); // limit size of body to 30mb and parse json data from body of request to json object in req.body
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true })); // its a middleware and limit size of body to 30mb and parse urlencoded data from body of request to json object in req.body
app.use(cors());

app.use("/posts", postRoutes);
app.get("/", (req, res) => {
  res.send("Hello to memories api");
});

// const CONNECTION_URL =
//   "mongodb+srv://memories:memories@cluster0.mrtz3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(process.env.PORT || 5000, () =>
      console.log(
        `Server Running on Port: http://localhost:${process.env.PORT || 5000}`
      )
    )
  )
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set("useFindAndModify", false);
