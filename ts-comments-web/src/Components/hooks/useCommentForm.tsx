import axios, { AxiosError } from "axios";
import { useEffect } from "react";
import { FormEvent, useContext } from "react";
import { useState } from "react";
import { PostComment } from "../../../../common/apiSchemas/comments";
import { Body, Res } from "../../../../common/apiSchemas/utils";
import GlobalContext from "../../GlobalContext";
import useRequestState from "./useRequestState";

const useCommentForm = (postId: number) => {
  const { reqState, setIdle, setLoading, setSuccess, setError } =
    useRequestState<Res<PostComment>>();
  const [text, setText] = useState("");
  const { user } = useContext(GlobalContext);

  useEffect(() => {
    setText("");
  }, [reqState.status]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading();
    const body: Body<PostComment> = {
      postId,
      text,
      author: user,
    };
    axios
      .post<Res<PostComment>>("/api/comments", body)
      .then((res) => setSuccess(res.data))
      .catch((err: AxiosError) => setError(err.response?.data.msg));
  };

  return { reqState, text, setText, onSubmit };
};

export default useCommentForm;
