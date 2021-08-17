import { ErrorRequestHandler } from "express";

export enum Errors {
  BAD_COMMENT_ID = "bad comment id",
  BAD_COMMENT_BODY = "bad comment body",
  BAD_COMMENT_AUTHOR = "bad comment author",
  BAD_POST_ID = "bad post id",
}

export const handle400s: ErrorRequestHandler = (err, req, res, next) => {
  switch (err.message) {
    case Errors.BAD_COMMENT_ID:
      return res.status(400).send({ msg: "Comment id is invalid" });
    case Errors.BAD_COMMENT_BODY:
      return res.status(400).send({ msg: "Comment text is invalid" });
    case Errors.BAD_COMMENT_AUTHOR:
      return res.status(400).send({ msg: "Author is invalid" });
    case Errors.BAD_POST_ID:
      return res.status(400).send({ msg: "Post id is invalid" });
    default:
      return next(err);
  }
};

export const handle404s: ErrorRequestHandler = (err, req, res, next) => {
  if (err.msg === "not found") {
    res.status(404).send({ msg: "not found" });
  } else {
    next(err);
  }
};

export const handle500s: ErrorRequestHandler = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "Server Error" });
};
