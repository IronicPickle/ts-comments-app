import { RequestHandler } from "express";
import {
  DeleteCommentByIdParams,
  GetCommentByIdBody,
  GetCommentByIdParams,
  GetCommentsByPostIdParams,
  PatchCommentByIdBody,
  PatchCommentByIdParams,
} from "../common/types";
import { Errors } from "./errors";
import {
  addComment,
  fetchComment,
  fetchCommentsByPostId,
  editComment,
  removeCommentById,
} from "./models.comments";

export const postComment: RequestHandler<{}, {}, GetCommentByIdBody> = (
  req,
  res,
  next
) => {
  const { text, author, postId } = req.body;
  if (typeof text !== "string") throw { message: Errors.BAD_COMMENT_BODY };
  if (typeof author !== "string") throw { message: Errors.BAD_COMMENT_AUTHOR };
  if (typeof postId !== "number") throw { message: Errors.BAD_POST_ID };
  addComment({ text, author, postId })
    .then((comment) => {
      res.status(201).send({ comment });
    })
    .catch(next);
};

export const getCommentById: RequestHandler<GetCommentByIdParams> = (
  req,
  res,
  next
) => {
  const { commentId } = req.params;
  if (commentId == null) throw { message: Errors.BAD_COMMENT_ID };
  fetchComment(commentId)
    .then((comment) => {
      res.status(200).send({ comment });
    })
    .catch(next);
};

export const getCommentsByPostId: RequestHandler<GetCommentsByPostIdParams> = (
  req,
  res,
  next
) => {
  const { postId } = req.params;
  if (postId == null) throw { message: Errors.BAD_POST_ID };
  fetchCommentsByPostId(postId)
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch(next);
};

export const patchCommentById: RequestHandler<
  PatchCommentByIdParams,
  {},
  PatchCommentByIdBody
> = (req, res, next) => {
  const { commentId } = req.params;
  const { text } = req.body;
  if (commentId == null) throw { message: Errors.BAD_COMMENT_ID };
  if (typeof text !== "string") throw { message: Errors.BAD_COMMENT_BODY };
  editComment(commentId, { text })
    .then((comment) => {
      res.status(200).send({ comment });
    })
    .catch(next);
};

export const deleteCommentById: RequestHandler<DeleteCommentByIdParams> = (
  req,
  res,
  next
) => {
  const { commentId } = req.params;
  if (commentId == null) throw { message: Errors.BAD_COMMENT_ID };
  removeCommentById(commentId)
    .then(() => {
      res.status(204).send();
    })
    .catch(next);
};
