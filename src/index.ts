import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import router from "./routes";

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

// Protected routes - apply authentication middleware
app.use("/api/v1", router);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});