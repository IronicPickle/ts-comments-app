import { Post } from "../../../common/apiSchemas/posts";
import useComments from "./hooks/useComments";
import { ReqStates } from "./hooks/useRequestState";

interface Props {
  postId: Post["_id"];
}

const Comments = ({ postId }: Props) => {
  const { reqState } = useComments(postId);

  if (reqState.status === ReqStates.IDLE) return <p>Idle</p>;
  if (reqState.status === ReqStates.LOADING) return <p>Loading</p>;
  if (reqState.status === ReqStates.ERROR) return <p>{reqState.error}</p>;
  if (reqState.data.comments.length === 0) return <p>No comments found</p>;

  return (
    <div>
      {reqState.data.comments.map((comment, i) => (
        <div key={i}>
          <p>{comment.text}</p>
          <small>by {comment.author}</small>
        </div>
      ))}
    </div>
  );
};

export default Comments;
