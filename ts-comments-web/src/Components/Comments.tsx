import { Post } from "../../../common/apiSchemas/posts";
import useComments from "./hooks/useComments";

interface Props {
  postId: Post["_id"];
}

const Comments = ({ postId }: Props) => {
  const { comments, error } = useComments(postId);

  if (comments.length === 0) return <p>No comments found</p>;
  if (error != null) return <p>An error occurred</p>;

  return (
    <div>
      {comments.map((comment, i) => (
        <div key={i}>
          <p>{comment.text}</p>
          <small>by {comment.author}</small>
        </div>
      ))}
    </div>
  );
};

export default Comments;
