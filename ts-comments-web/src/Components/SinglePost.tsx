import { RouteComponentProps, useParams } from "@reach/router";
import { useState } from "react";
import { Post } from "../../../common/apiSchemas/posts";
import { isUndefined } from "../utils";
import AddComment from "./AddComment";
import Comments from "./Comments";

interface Props extends RouteComponentProps {
  posts: Post[];
}

const SinglePost = ({ posts }: Props) => {
  const [commentsShowing, setCommentsShowing] = useState(false);
  const params = useParams();
  const postId = parseInt(params.postId);
  if (isNaN(postId)) return null;
  const pot = posts.find((post) => post._id === +postId);

  if (!isUndefined(pot)) {
    return (
      <div className="singlePotCard">
        <img alt={pot.desc} src={pot.url} className="singlePot" />
        <button
          className="button"
          onClick={() => setCommentsShowing(!commentsShowing)}
        >
          {commentsShowing ? "Hide" : "See"} Comments
        </button>
        {commentsShowing && <Comments postId={postId} />}
        <AddComment postId={postId} />
      </div>
    );
  } else return <div>Sorry, no pot found!</div>;
};

export default SinglePost;
