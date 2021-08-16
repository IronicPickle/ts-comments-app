export interface Comment {
  _id: string;
  text: string;
  author: string;
  postId: number;
  replyToId?: string;

  createdOn: number;
  modifiedOn: number;
}

export interface PostComment {
  text: Comment["text"];
  author: Comment["author"];
  postId: Comment["postId"];
}

export interface GetCommentByIdParams {
  commentId: Comment["_id"];
}

export interface GetCommentsByPostIdParams {
  postId: Comment["postId"];
}

export interface PatchCommentByIdParams {
  commentId: Comment["_id"];
}

export interface PatchCommentByIdBody {
  text: Comment["text"];
}

export interface DeleteCommentByIdParams {
  commentId: Comment["_id"];
}
