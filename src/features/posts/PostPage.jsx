import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import { selectPostById } from "./postsSlice";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";

const PostPage = () => {
  const { postId } = useParams();
  const post = useSelector((state) => selectPostById(state, Number(postId)));

  if (!post) {
    return (
      <section className="flex justify-center items-center">
        <h2>Post not found!</h2>
      </section>
    );
  }

  return (
    <article>
      <h2 className="text-3xl text-slate-800 capitalize pb-1 mt-10 mb-1 font-bold">
        {post.title}
      </h2>
      <div className="bg-slate-800 text-white w-full border border-gray-500 mb-3 mt-5 p-5 rounded-lg">
        <p className="text-xl mb-5">{post.body}</p>
        <Link
          className="inline-block bg-amber-500 text-black rounded-lg px-2 py-1 font-bold hover:scale-105 active:scale-95"
          to={`/post/edit/${postId}`}
        >
          Edit Post
        </Link>
        <p className="mt-5">
          <PostAuthor userId={post.userId} />
          <TimeAgo timestamp={post.date} />
        </p>
        <ReactionButtons post={post} />
      </div>
    </article>
  );
};

export default PostPage;
