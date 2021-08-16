import dotenv from "dotenv";
import path from "path";
import { MongoClient } from "mongodb";
import Comments from "./controllers/Comments";

const ENV = process.env.NODE_ENV || "development";
dotenv.config({
  path: path.resolve(__dirname, `../.env.${ENV}`),
});
const url = process.env.DB_URL;

export const client = new MongoClient(url!, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export const collections = {
  comments: new Comments(client),
};
