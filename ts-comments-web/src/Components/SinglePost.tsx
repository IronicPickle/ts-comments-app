import { useParams } from "@reach/router";
import { useState } from "react";
import { isUndefined } from "../utils";
import Comments from "./Comments";

const SinglePost = ({ posts }) => {
	const [commentsShowing, setCommentsShowing] = useState(false);
	const { post_id } = useParams();
	const pot = posts.find((post) => post.postId === +post_id);

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
				{commentsShowing && <Comments />}
			</div>
		);
	} else return <div>Sorry, no pot found!</div>;
};

export default SinglePost;
