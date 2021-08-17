import "./env/env";
import express from "express";
import {
  postComment,
  getCommentById,
  getCommentsByPostId,
  patchCommentById,
  deleteCommentById,
} from "./controllers/comments";
import { handle400s, handle404s, handle500s } from "./lib/errors";
import { client } from "./db/db";

const isTest = process.env.NODE_ENV === "test";

const app = express();
const startServer = async () => {
  if (!isTest) {
    await client.connect();
    console.log("Connected to the database");
  }

  app.use(express.json());

  app.post("/api/comments", postComment);
  app.get("/api/comments/:commentId", getCommentById);
  app.patch("/api/comments/:commentId", patchCommentById);
  app.delete("/api/comments/:commentId", deleteCommentById);
  app.get("/api/post/:postId/comments", getCommentsByPostId);

  app.use(handle400s);
  app.use(handle404s);
  app.use(handle500s);

  if (!isTest) {
    const port = process.env.PORT ?? 3001;
    app.listen(port, () => {
      console.log(`Listening on ${port}`);
    });
  }
};

startServer();

export default app;
