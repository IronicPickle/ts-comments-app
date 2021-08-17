import { MongoClient } from "mongodb";
import Comments from "./models/Comments";

const url = process.env.DB_URL;

export const client = new MongoClient(url!, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export const collections = {
  comments: new Comments(client),
};
