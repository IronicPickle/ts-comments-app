import useCommentForm from "./hooks/useCommentForm";

interface Props {
  postId: number;
}

export default function AddComment(props: Props) {
  const { postId } = props;
  const { text, setText, onSubmit, error, success } = useCommentForm(postId);

  return (
    <form onSubmit={onSubmit}>
      <input
        value={text}
        placeholder="A wonderful comment"
        onChange={(event) => setText(event.target.value)}
      />
      <button>Submit</button>
      {error && <p>{error}</p>}
      {success && <p>Submitted!</p>}
    </form>
  );
}
