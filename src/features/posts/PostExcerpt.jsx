import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectPostById } from "./postsSlice";

const PostExcerpt = ({ postId }) => {
  const post = useSelector((state) => selectPostById(state, postId));
  return (
    <article className="bg-slate-800 text-white w-full border border-gray-500 mb-3 p-5 rounded-lg">
      <h3 className="text-3xl border-b pb-2 mb-4 capitalize border-gray-500">
        {post.title}
      </h3>
      <p className="mb-3">{post.body.substring(0, 75)}...</p>
      <Link
        className="text-green-400 hover:text-green-500 active:text-green-300 visited:text-green-200 underline "
        to={`post/${post.id}`}
      >
        View Post
      </Link>
      <p className="mt-3">
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </p>
      <ReactionButtons post={post} />
    </article>
  );
};

export default PostExcerpt;
