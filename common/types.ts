export interface Comment {
  text: string;
  author: string;
  postId: number;

  id: string;
  createdOn: number;
  modifiedOn: number;
}

export interface GetCommentByIdBody {
  text?: string;
  author?: string;
  postId?: number;
}

export interface GetCommentByIdParams {
  commentId?: string;
}

export interface GetCommentsByPostIdParams {
  postId?: string;
}

export interface PatchCommentByIdParams {
  commentId?: string;
}

export interface PatchCommentByIdBody {
  text?: string;
}

export interface DeleteCommentByIdParams {
  commentId?: string;
}
