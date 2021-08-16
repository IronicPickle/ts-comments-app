import express from "express";
import {
  postComment,
  getCommentById,
  getCommentsByPostId,
  patchCommentById,
  deleteCommentById,
} from "./controllers.comments";
import { handle400s, handle404s, handle500s } from "./errors";

const app = express();
app.use(express.json());

app.post("/api/comments", postComment);
app.get("/api/comments/:commentId", getCommentById);
app.patch("/api/comments/:commentId", patchCommentById);
app.delete("/api/comments/:commentId", deleteCommentById);
app.get("/api/post/:postId/comments", getCommentsByPostId);

app.use(handle400s);
app.use(handle404s);
app.use(handle500s);

export default app;
