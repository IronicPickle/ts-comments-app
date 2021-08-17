import { RouteComponentProps, Link } from "@reach/router";
import { Post } from "../../../common/apiSchemas/posts";

interface props extends RouteComponentProps {
  posts: Post[];
}

const Posts = ({ posts }: props) => {
  return (
    <ul className="posts">
      {posts.map((post) => {
        const { _id, desc, url } = post;
        return (
          <li className="pots" key={_id}>
            <Link to={`/posts/${_id}`}>
              <img alt={desc} src={url} className="img" />
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default Posts;
