import { RequestHandler } from "express";
import {
  DeleteCommentById,
  GetCommentById,
  GetCommentsByPostId,
  PatchCommentById,
  PostComment,
} from "../../common/apiSchemas/comments";
import { BackendBody, BackendParams } from "../../common/apiSchemas/utils";
import { Errors } from "../lib/errors";

import { collections } from "../db/db";
const { comments } = collections;

export const postComment: RequestHandler<{}, {}, BackendBody<PostComment>> = (
  req,
  res,
  next
) => {
  const { text, author, postId } = req.body;
  if (typeof text !== "string" || text.length === 0)
    throw { message: Errors.BAD_COMMENT_BODY };
  if (typeof author !== "string") throw { message: Errors.BAD_COMMENT_AUTHOR };
  if (typeof postId !== "number") throw { message: Errors.BAD_POST_ID };

  comments
    .create({ text, author, postId })
    .then((comment) => {
      res.status(201).send({ comment });
    })
    .catch(next);
};

export const getCommentById: RequestHandler<BackendParams<GetCommentById>> = (
  req,
  res,
  next
) => {
  const { commentId } = req.params;
  if (commentId == null) throw { message: Errors.BAD_COMMENT_ID };
  comments
    .getById(commentId)
    .then((comment) => {
      res.status(200).send({ comment });
    })
    .catch(next);
};

export const getCommentsByPostId: RequestHandler<
  BackendParams<GetCommentsByPostId>
> = (req, res, next) => {
  const { postId } = req.params;
  if (postId == null) throw { message: Errors.BAD_POST_ID };
  comments
    .getByPostId(postId)
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch(next);
};

export const patchCommentById: RequestHandler<
  BackendParams<PatchCommentById>,
  {},
  BackendBody<PatchCommentById>
> = (req, res, next) => {
  const { commentId } = req.params;
  const { text } = req.body;
  if (commentId == null) throw { message: Errors.BAD_COMMENT_ID };
  if (typeof text !== "string") throw { message: Errors.BAD_COMMENT_BODY };
  comments
    .editById(commentId, { text })
    .then((comment) => {
      res.status(200).send({ comment });
    })
    .catch(next);
};

export const deleteCommentById: RequestHandler<
  BackendParams<DeleteCommentById>
> = (req, res, next) => {
  const { commentId } = req.params;
  if (commentId == null) throw { message: Errors.BAD_COMMENT_ID };
  comments
    .removeById(commentId)
    .then(() => {
      res.status(204).send();
    })
    .catch(next);
};
