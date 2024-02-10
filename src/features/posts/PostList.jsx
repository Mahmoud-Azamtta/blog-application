import { useSelector, useDispatch } from "react-redux";
import {
  selectAllPosts,
  getPostsStatus,
  getPostsError,
  fetchPosts,
} from "./postsSlice";
import { useEffect } from "react";
import PostExcerpt from "./PostExcerpt";

const PostsList = () => {
  const dispatch = useDispatch();

  const posts = useSelector(selectAllPosts);
  const postsStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);

  useEffect(() => {
    if (postsStatus === "idle") dispatch(fetchPosts());
  }, [postsStatus, dispatch]);

  let content;
  if (postsStatus === "loading") {
    content = <p className="text-center">Loading...</p>;
  } else if (postsStatus === "succeeded") {
    const orderedPosts = posts
      .slice() // the slice here is to make a shallow copy of the posts
      .sort((a, b) => b.date.localeCompare(a.date));
    content = orderedPosts.map((post) => (
      <PostExcerpt key={post.id} post={post} />
    ));
  } else if (postsStatus === "failed") {
    content = <p>{error}</p>;
  }

  return (
    <section className="w-full">
      <h2 className="text-5xl font-bold mt-10 mb-5 text-slate-800">Posts</h2>
      {content}
    </section>
  );
};

export default PostsList;
