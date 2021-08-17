import axios from "axios";
import { FormEvent, useContext } from "react";
import { useState } from "react";
import { PostComment } from "../../../../common/apiSchemas/comments";
import { Body, Res } from "../../../../common/apiSchemas/utils";
import GlobalContext from "../../GlobalContext";

const useCommentForm = (postId: number) => {
  const [text, setText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { user } = useContext(GlobalContext);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSuccess(false);
    setError(null);
    const body: Body<PostComment> = {
      postId,
      text,
      author: user,
    };
    const res = await axios
      .post<Res<PostComment>>("/api/comments", body)
      .catch((err) => setError("Something went wrong"));
    if (res == null) setError("Something went wrong");
    setSuccess(res != null);
    setText("");
  };

  return { text, setText, onSubmit, error, success };
};

export default useCommentForm;
