import useCommentForm from "./hooks/useCommentForm";
import { ReqStates } from "./hooks/useRequestState";

interface Props {
  postId: number;
}

export default function AddComment(props: Props) {
  const { postId } = props;
  const { reqState, text, setText, onSubmit } = useCommentForm(postId);

  return (
    <form onSubmit={onSubmit}>
      <input
        value={text}
        placeholder="A wonderful comment"
        onChange={(event) => setText(event.target.value)}
      />
      <button>Submit</button>
      {reqState.status === ReqStates.LOADING ? (
        <p>Loading</p>
      ) : reqState.status === ReqStates.ERROR ? (
        <p>{reqState.error}</p>
      ) : null}
    </form>
  );
}
