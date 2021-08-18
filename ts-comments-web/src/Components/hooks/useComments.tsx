import axios, { AxiosError } from "axios";
import { useEffect } from "react";
import { useState } from "react";
import {
  Comment,
  GetCommentsByPostId,
} from "../../../../common/apiSchemas/comments";
import { Post } from "../../../../common/apiSchemas/posts";
import { Res } from "../../../../common/apiSchemas/utils";
import useRequestState from "./useRequestState";

const useComments = (postId?: Post["_id"]) => {
  const { reqState, setIdle, setLoading, setSuccess, setError } =
    useRequestState<Res<GetCommentsByPostId>>();

  useEffect(() => {
    setLoading();
    const path = postId ? `/api/post/${postId}/comments` : "/api/comments";
    axios
      .get<Res<GetCommentsByPostId>>(path)
      .then((res) => setSuccess(res.data))
      .catch((err: AxiosError) => setError(err.response?.data.msg));
  }, [postId]);

  return { reqState };
};

export default useComments;
