import { useSelector, useDispatch } from "react-redux";
import {
  selectPostsIds,
  getPostsStatus,
  getPostsError,
  fetchPosts,
} from "./postsSlice";
import { useEffect } from "react";
import PostExcerpt from "./PostExcerpt";

const PostsList = () => {
  const dispatch = useDispatch();

  const postIds = useSelector(selectPostsIds);
  const postsStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);
  useEffect(() => {
    if (postsStatus === "idle") dispatch(fetchPosts());
  }, [postsStatus, dispatch]);

  let content;
  if (postsStatus === "loading") {
    content = <p className="text-center">Loading...</p>;
  } else if (postsStatus === "succeeded") {
    content = postIds.map((postId) => (
      <PostExcerpt key={postId} postId={postId} />
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
