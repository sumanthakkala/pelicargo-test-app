import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import imagesRoutes from "./routes/images";
import cors from "cors";

dotenv.config();

const app: Express = express();
app.use(bodyParser.json());
app.use(cors());
app.use("/api/image", imagesRoutes);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
