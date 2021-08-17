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
  body: {
    text: Comment["text"];
    author: Comment["author"];
    postId: Comment["postId"];
  };
  res: {
    comment: Comment;
  };
}

export interface GetCommentById {
  params: {
    commentId: string;
  };
  res: {
    comment: Comment;
  };
}

export interface GetCommentsByPostId {
  params: {
    postId: string;
  };
  res: {
    comments: Comment[];
  };
}

export interface PatchCommentById {
  params: {
    commentId: string;
  };
  body: {
    text: Comment["text"];
  };
  res: {
    comment: Comment;
  };
}

export interface DeleteCommentById {
  params: {
    commentId: string;
  };
  res: undefined;
}
