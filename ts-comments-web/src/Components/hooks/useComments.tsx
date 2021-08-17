import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import {
  Comment,
  GetCommentsByPostId,
} from "../../../../common/apiSchemas/comments";
import { Post } from "../../../../common/apiSchemas/posts";
import { Res } from "../../../../common/apiSchemas/utils";

const useComments = (postId?: Post["_id"]) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getComments = async () => {
      const path = postId ? `/api/post/${postId}/comments` : "/api/comments";
      const res = await axios
        .get<Res<GetCommentsByPostId>>(path)
        .catch((err) => setError("Something went wrong"));
      if (res == null) return setError("Something went wrong");
      setComments(res.data.comments);
    };
    getComments();
  }, [postId]);

  return { comments, error };
};

export default useComments;
